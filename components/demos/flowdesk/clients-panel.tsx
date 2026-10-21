"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { DemoAction, DemoClient, DemoState } from "./model";
import styles from "./flowdesk.module.css";

export function ClientsPanel({ state, onAction }: { state: DemoState; onAction: (action: DemoAction) => boolean }) {
  const t = useTranslations("demos.flowdesk");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<DemoClient | null>(null);
  const clients = state.clients.filter(client => `${client.name} ${client.company} ${client.email}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  return <section aria-label={t("clients")}>
    <div className={styles.panelToolbar}><label className={styles.search}>{t("searchClients")}<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t("searchClientPlaceholder")} /></label><button type="button" className={styles.primary} onClick={() => setEditing({ id: crypto.randomUUID(), name: "", company: "", email: "" })}><span aria-hidden="true">+</span>{t("newClient")}</button></div>
    <div className={styles.clientGrid}>{clients.map(client => <article className={styles.clientCard} key={client.id} aria-label={client.name}>
      <div className={styles.clientTop}><span className={styles.clientAvatar} aria-hidden="true">{client.name.slice(0, 2).toUpperCase()}</span><span className={styles.pill}>{t("client")}</span></div><h2>{client.name}</h2><p>{client.company}</p><p className={styles.clientEmail}>{client.email}</p><div className={styles.clientBottom}><span>{t("clientQuotes", { count: state.quotes.filter(quote => quote.clientId === client.id).length })}</span><button type="button" className={styles.textButton} onClick={() => setEditing(client)}>{t("edit")} <span aria-hidden="true">↗</span></button></div>
    </article>)}</div>
    {!clients.length && <p className={styles.empty}>{t("noClients")}</p>}
    {editing && <ClientEditor client={editing} onCancel={() => setEditing(null)} onSubmit={client => {
      const saved = onAction({ type: "client/upsert", payload: client });
      if (saved) setEditing(null);
      return saved;
    }} />}
  </section>;
}

function ClientEditor({ client, onSubmit, onCancel }: { client: DemoClient; onSubmit: (client: DemoClient) => boolean; onCancel: () => void }) {
  const t = useTranslations("demos.flowdesk");
  const [draft, setDraft] = useState(client);
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    element?.showModal();
    element?.querySelector("input")?.focus();
    return () => { element?.close(); opener?.focus(); };
  }, []);
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="client-editor-title" onCancel={event => { event.preventDefault(); onCancel(); }}>
    <form noValidate onSubmit={event => {
      event.preventDefault();
      const normalized = { ...draft, name: draft.name.trim(), company: draft.company.trim(), email: draft.email.trim() };
      if (!normalized.name || !normalized.company || !normalized.email || !event.currentTarget.checkValidity()) { setError(true); return; }
      if (!onSubmit(normalized)) setError(true);
    }}>
      <div className={styles.dialogHeader}><div><p className={styles.eyebrow}>{t("localOnly")}</p><h2 id="client-editor-title">{client.name ? t("editClient") : t("newClient")}</h2></div><button type="button" className={styles.close} aria-label={t("cancel")} onClick={onCancel}>×</button></div>
      <div className={styles.fields}>{(["name", "company", "email"] as const).map(field => <label key={field}>{t(field)}<input required type={field === "email" ? "email" : "text"} maxLength={160} value={draft[field]} aria-describedby={error ? "client-error" : undefined} onChange={event => setDraft({ ...draft, [field]: event.target.value })} /></label>)}</div>
      {error && <p id="client-error" role="alert" className={styles.error}>{t("clientError")}</p>}
      <p className={styles.formNote}>{t("formNote")}</p><div className={styles.dialogActions}><button type="button" className={styles.secondary} onClick={onCancel}>{t("cancel")}</button><button type="submit" className={styles.primary}>{t("saveClient")}</button></div>
    </form>
  </dialog>;
}
