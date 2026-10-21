"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { SupportedLocale } from "@/site.config";
import { applyDemoAction, getDashboardStats, type DemoAction } from "./model";
import { createSeedState } from "./seed";
import { getDemoStorageKey, parseDemoState, saveDemoState } from "./storage";
import { ClientsPanel } from "./clients-panel";
import { QuotesPanel } from "./quotes-panel";
import { formatDemoMoney } from "./format-money";
import styles from "./flowdesk.module.css";

export function FlowDeskDemo({ locale }: { locale: SupportedLocale }) {
  const t = useTranslations("demos.flowdesk");
  const [state, setState] = useState(() => createSeedState(locale));
  const [ready, setReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState("loading");
  const [section, setSection] = useState<"overview" | "clients" | "quotes">("overview");
  const [actionError, setActionError] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const canReadStorage = useRef(true);

  useEffect(() => {
    // The server and first client render use the same seed. Never persist until
    // this read has completed, including when storage is inaccessible.
    let raw: string | null = null;
    try { raw = window.localStorage.getItem(getDemoStorageKey(locale)); }
    catch { canReadStorage.current = false; }
    setState(parseDemoState(raw, locale));
    setReady(true);
  }, [locale]);

  useEffect(() => {
    if (!ready) return;
    let saved = false;
    try { saved = canReadStorage.current && saveDemoState(window.localStorage, locale, state); }
    catch { /* Some browsers throw when accessing localStorage itself. */ }
    setSaveStatus(saved ? "saved" : "session");
  }, [locale, ready, state]);

  function dispatch(action: DemoAction): boolean {
    try {
      setState(applyDemoAction(state, action));
      setActionError(false);
      return true;
    } catch {
      setActionError(true);
      return false;
    }
  }

  function navigate(next: typeof section) {
    setSection(next);
    setActionError(false);
    requestAnimationFrame(() => heading.current?.focus());
  }

  const stats = getDashboardStats(state);
  return (
    <div className={styles.app}>
      <a className={styles.skip} href="#flowdesk-main">{t("skip")}</a>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span className={styles.mark} aria-hidden="true">f.</span><span>FlowDesk<small>{t("workspace")}</small></span></div>
        <div className={styles.workspace}><span className={styles.avatar}>AC</span><div><strong>{t("workspaceName")}</strong><small>{t("demoWorkspace")}</small></div><span aria-hidden="true">⌄</span></div>
        <p className={styles.navLabel}>{t("workspaceNav")}</p>
        <nav className={styles.navigation} aria-label={t("navigation")}>
          {(["overview", "clients", "quotes"] as const).map((item, i) => <button type="button" key={item} disabled={!ready} aria-current={section === item ? "page" : undefined} onClick={() => navigate(item)}><span aria-hidden="true">{["◫", "◎", "▤"][i]}</span>{t(item)}{i > 0 && <small aria-hidden="true">{i === 1 ? stats.clientCount : stats.quoteCount}</small>}</button>)}
        </nav>
        <div className={styles.sidebarNote}><span className={styles.demoBadge}>{t("demoBadge")}</span><p>{t("demoNote")}</p><button type="button" className={styles.reset} disabled={!ready} onClick={() => {
          if (!window.confirm(t("resetConfirm"))) return;
          setState(createSeedState(locale));
          navigate("overview");
        }}>{t("reset")}</button></div>
        <div className={styles.profile}><span className={styles.avatar}>VC</span><div><strong>{t("visitor")}</strong><small>{t("localAccount")}</small></div></div>
      </aside>
      <main id="flowdesk-main" className={styles.main}>
        <div className={styles.topbar}><span>{t("workspaceNav")} <span aria-hidden="true">/</span> {t(section)}</span><span className={styles.localBadge}>{t("localOnly")}</span></div>
        <div className={styles.content}>
          <header className={styles.pageHeading}><div><p className={styles.eyebrow}>{t("eyebrow")}</p><h1 ref={heading} tabIndex={-1}>{t(section)}</h1><p>{t(`${section}Intro`)}</p></div><span className={styles.version}>DEMO / 01</span></header>
          <div className={styles.saveStatus} role="status"><span aria-hidden="true">{saveStatus === "session" ? "○" : "●"}</span>{t(saveStatus)}<span className={styles.saveDetail}>{t("saveDetail")}</span></div>
          {actionError && <p role="alert" className={styles.error}>{t("actionError")}</p>}
          {section === "overview" && <>
            <section className={styles.stats} aria-label={t("summary")}>
              <div className={styles.stat}><span>{t("clientCount")}</span><strong>{stats.clientCount.toString().padStart(2, "0")}</strong><small>{t("clientCountNote")}</small></div>
              <div className={styles.stat}><span>{t("quoteCount")}</span><strong>{stats.quoteCount.toString().padStart(2, "0")}</strong><small>{t("quoteCountNote")}</small></div>
              <div className={`${styles.stat} ${styles.approvedStat}`} data-testid="approved-total"><span>{t("approvedTotal")}</span><strong>{formatDemoMoney(stats.approvedTotalCents, locale)}</strong><small>{t("approvedNote")}</small></div>
            </section>
            <div className={styles.dashboardGrid}><section className={styles.card}><div className={styles.sectionHeading}><h2>{t("pipeline")}</h2><span className={styles.pill}>{t("live")}</span></div><p className={styles.muted}>{t("pipelineIntro")}</p><div className={styles.pipeline}>{(["draft", "sent", "approved"] as const).map(status => {
              const count = state.quotes.filter(quote => quote.status === status).length;
              return <div key={status}><div><span>{t(status)}</span><strong>{count}</strong></div><div className={styles.track}><span data-status={status} style={{ width: `${state.quotes.length ? count / state.quotes.length * 100 : 0}%` }} /></div></div>;
            })}</div><button className={styles.textButton} type="button" onClick={() => navigate("quotes")}>{t("viewQuotes")} <span aria-hidden="true">→</span></button></section>
            <section className={styles.guide}><span className={styles.guideIcon} aria-hidden="true">✳</span><p className={styles.eyebrow}>{t("tryKicker")}</p><h2>{t("tryTitle")}</h2><p>{t("tryIntro")}</p><ol><li>{t("stepClient")}</li><li>{t("stepQuote")}</li><li>{t("stepApprove")}</li></ol><button className={styles.primary} type="button" disabled={!ready} onClick={() => navigate("clients")}>{t("start")} <span aria-hidden="true">↗</span></button></section></div>
          </>}
          {section === "clients" && <ClientsPanel state={state} onAction={dispatch} />}
          {section === "quotes" && <QuotesPanel state={state} locale={locale} onAction={dispatch} />}
          <footer className={styles.footer}><span>FlowDesk <span aria-hidden="true">·</span> {t("footer")}</span><span>{t("commercialNote")}</span></footer>
        </div>
      </main>
    </div>
  );
}
