"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { SupportedLocale } from "@/site.config";
import { calculateQuoteTotal, parseMoneyInput, type DemoClient, type DemoQuote, type QuoteLineItem } from "./model";
import { formatDemoMoney } from "./format-money";
import styles from "./flowdesk.module.css";

type ItemDraft = { id: string; description: string; quantity: string; price: string };
const newItem = (): ItemDraft => ({ id: crypto.randomUUID(), description: "", quantity: "1", price: "" });

export function QuoteEditor({ quote, clients, locale, onSubmit, onCancel }: { quote: DemoQuote; clients: DemoClient[]; locale: SupportedLocale; onSubmit: (quote: DemoQuote) => boolean; onCancel: () => void }) {
  const t = useTranslations("demos.flowdesk");
  const [title, setTitle] = useState(quote.title);
  const [clientId, setClientId] = useState(quote.clientId);
  const [items, setItems] = useState<ItemDraft[]>(() => quote.items.length ? quote.items.map(item => ({ id: item.id, description: item.description, quantity: String(item.quantity), price: `${Math.floor(item.unitPriceCents / 100)}.${String(item.unitPriceCents % 100).padStart(2, "0")}` })) : [newItem()]);
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    element?.showModal();
    element?.querySelector("input")?.focus();
    return () => { element?.close(); opener?.focus(); };
  }, []);

  // Both live preview and submission use the domain parser and total validator.
  let parsed: QuoteLineItem[] | null = null;
  let total: number | null = null;
  try {
    parsed = items.map(item => {
      const cents = parseMoneyInput(item.price);
      if (cents === null) throw new Error("Invalid amount");
      return { id: item.id, description: item.description.trim(), quantity: Number(item.quantity), unitPriceCents: cents };
    });
    total = calculateQuoteTotal(parsed);
  } catch { parsed = null; }

  function updateItem(id: string, field: keyof Omit<ItemDraft, "id">, value: string) {
    setItems(current => current.map(item => item.id === id ? { ...item, [field]: value } : item));
  }

  return <dialog ref={dialog} className={`${styles.dialog} ${styles.quoteDialog}`} aria-labelledby="quote-editor-title" onCancel={event => { event.preventDefault(); onCancel(); }}>
    <form noValidate onSubmit={event => {
      event.preventDefault();
      if (!title.trim() || !parsed?.length || parsed.some(item => !item.description) || !event.currentTarget.checkValidity()) { setError(true); return; }
      if (!onSubmit({ ...quote, title: title.trim(), clientId, items: parsed })) setError(true);
    }}>
      <div className={styles.dialogHeader}><div><p className={styles.eyebrow}>{t("localOnly")}</p><h2 id="quote-editor-title">{quote.title ? t("editQuote") : t("newQuote")}</h2></div><button type="button" className={styles.close} aria-label={t("cancel")} onClick={onCancel}>×</button></div>
      <div className={styles.fields}><label>{t("quoteTitle")}<input required maxLength={160} value={title} onChange={event => setTitle(event.target.value)} /></label><label>{t("client")}<select aria-label={t("client")} value={clientId} onChange={event => setClientId(event.target.value)}>{clients.map(client => <option key={client.id} value={client.id}>{client.name} · {client.company}</option>)}</select></label></div>
      <div className={styles.itemsHeading}><h3>{t("items")}</h3><span>{t("currency", { currency: locale === "pt-BR" ? "BRL" : "USD" })}</span></div>
      <p id="money-help" className={styles.formNote}>{t("moneyHelp")}</p>
      <div className={styles.items}>{items.map((item, index) => <fieldset key={item.id} className={styles.item}><legend>{t("itemNumber", { number: index + 1 })}</legend>
        <label className={styles.description}>{t("description", { number: index + 1 })}<input required maxLength={240} value={item.description} onChange={event => updateItem(item.id, "description", event.target.value)} /></label>
        <label>{t("quantity", { number: index + 1 })}<input required type="number" min="1" max="1000" step="1" value={item.quantity} onChange={event => updateItem(item.id, "quantity", event.target.value)} /></label>
        <label>{t("unitPrice", { number: index + 1 })}<input required inputMode="decimal" aria-describedby="money-help" value={item.price} onChange={event => updateItem(item.id, "price", event.target.value)} /></label>
        <button type="button" className={styles.remove} disabled={items.length === 1} aria-label={t("removeItem", { number: index + 1 })} onClick={() => setItems(current => current.filter(other => other.id !== item.id))}>×</button>
      </fieldset>)}</div>
      <button type="button" className={styles.textButton} onClick={() => {
        setItems(current => [...current, newItem()]);
        requestAnimationFrame(() => dialog.current?.querySelectorAll<HTMLInputElement>("fieldset input").item(items.length * 3)?.focus());
      }}>+ {t("addItem")}</button>
      <div className={styles.editorTotal}><span>{t("total")}</span><strong>{total === null ? "—" : formatDemoMoney(total, locale)}</strong></div>
      {error && <p role="alert" className={styles.error}>{t("quoteError")}</p>}
      <p className={styles.formNote}>{t("formNote")}</p><div className={styles.dialogActions}><button type="button" className={styles.secondary} onClick={onCancel}>{t("cancel")}</button><button type="submit" className={styles.primary}>{t("saveQuote")}</button></div>
    </form>
  </dialog>;
}
