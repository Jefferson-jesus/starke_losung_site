"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SupportedLocale } from "@/site.config";
import { calculateQuoteTotal, type DemoAction, type DemoQuote, type DemoState } from "./model";
import { QuoteEditor } from "./quote-editor";
import { formatDemoMoney } from "./format-money";
import styles from "./flowdesk.module.css";

export function QuotesPanel({ state, locale, onAction }: { state: DemoState; locale: SupportedLocale; onAction: (action: DemoAction) => boolean }) {
  const t = useTranslations("demos.flowdesk");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<DemoQuote | null>(null);
  const quotes = state.quotes.filter(quote => `${quote.title} ${state.clients.find(client => client.id === quote.clientId)?.name ?? ""}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  return <section aria-label={t("quotes")}>
    <div className={styles.panelToolbar}><label className={styles.search}>{t("searchQuotes")}<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t("searchQuotePlaceholder")} /></label><button type="button" className={styles.primary} disabled={!state.clients.length} onClick={() => setEditing({ id: crypto.randomUUID(), clientId: state.clients[0].id, title: "", status: "draft", items: [] })}><span aria-hidden="true">+</span>{t("newQuote")}</button></div>
    {!state.clients.length && <p className={styles.empty}>{t("needClient")}</p>}
    <div className={styles.quoteList}>{quotes.map(quote => <article key={quote.id} className={styles.quoteRow} aria-label={quote.title}>
      <span className={styles.quoteIcon} aria-hidden="true">▤</span><div className={styles.quoteTitle}><h2>{quote.title}</h2><p>{state.clients.find(client => client.id === quote.clientId)?.name} <span aria-hidden="true">·</span> {t("itemCount", { count: quote.items.length })}</p></div>
      <strong className={styles.quoteTotal}>{formatDemoMoney(calculateQuoteTotal(quote.items), locale)}</strong>
      <label className={styles.statusLabel}>{t("status")}<select data-status={quote.status} value={quote.status} onChange={event => onAction({ type: "quote/status", payload: { id: quote.id, status: event.target.value as DemoQuote["status"] } })}>{(["draft", "sent", "approved"] as const).map(status => <option key={status} value={status}>{t(status)}</option>)}</select></label>
      <button type="button" className={styles.secondary} onClick={() => setEditing(quote)}>{t("edit")}</button>
    </article>)}</div>
    {!quotes.length && <p className={styles.empty}>{t("noQuotes")}</p>}
    {editing && <QuoteEditor quote={editing} clients={state.clients} locale={locale} onCancel={() => setEditing(null)} onSubmit={quote => {
      const saved = onAction({ type: "quote/upsert", payload: quote });
      if (saved) setEditing(null);
      return saved;
    }} />}
  </section>;
}
