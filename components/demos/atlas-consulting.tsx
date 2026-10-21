import { getTranslations } from "next-intl/server";
import type { SupportedLocale } from "@/site.config";
import { getDemoQuoteUrl } from "./demo-toolbar";
import styles from "./atlas-consulting.module.css";

function AtlasMark() {
  return <svg width="35" height="35" viewBox="0 0 35 35" fill="none" aria-hidden="true"><path d="M3 31 16 4h4l12 27h-8l-6-16-7 16H3Z" fill="currentColor" /><path d="M13 25h10" stroke="#92d4cf" strokeWidth="3" /></svg>;
}

export async function AtlasConsulting({ locale }: { locale: SupportedLocale }) {
  const t = await getTranslations({ locale, namespace: "atlas" });
  const quoteUrl = getDemoQuoteUrl(locale, "Atlas Consulting");
  const cards = t.raw("serviceCards") as { title: string; description: string; deliverable: string }[];
  const steps = t.raw("steps") as { title: string; description: string }[];
  const questions = t.raw("questions") as { question: string; answer: string }[];
  return (
    <div className={styles.atlas} id="top">
      <a className={styles.skip} href="#atlas-content">{t("skip")}</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Atlas Consulting"><AtlasMark /><span>atlas<span className={styles.brandSub}>CONSULTING</span></span></a>
        <nav aria-label={t("nav")}>
          <a href="#services">{t("services")}</a>
          <a href="#approach">{t("process")}</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className={styles.headerCta} href={quoteUrl} target="_blank" rel="noreferrer">{t("navCta")} <span aria-hidden="true">↗</span></a>
      </header>
      <main id="atlas-content" className={styles.main}>
        <section className={styles.hero} aria-labelledby="atlas-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.dot} />{t("kicker")}</p>
            <h1 id="atlas-title">{t("title")} <span>{t("titleAccent")}</span></h1>
            <p className={styles.intro}>{t("intro")}</p>
            <div className={styles.heroActions}>
              <a className={styles.button} href={quoteUrl} target="_blank" rel="noreferrer">{t("primary")} <span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href="#approach">{t("secondary")} <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.heroNote}>{t("heroNote")}</p>
          </div>
          <div className={styles.visual}>
            <div className={styles.visualTop}><span>ATLAS / INSIGHT</span><span aria-hidden="true">↗</span></div>
            <svg className={styles.diagram} viewBox="0 0 420 350" fill="none" aria-hidden="true">
              <defs><pattern id="atlas-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" stroke="#ffffff" strokeOpacity=".09" /></pattern></defs>
              <rect width="420" height="350" fill="url(#atlas-grid)" />
              <circle cx="210" cy="175" r="140" stroke="#fff" strokeOpacity=".16" />
              <circle cx="210" cy="175" r="96" stroke="#fff" strokeOpacity=".24" />
              <circle cx="210" cy="175" r="52" stroke="#fff" strokeOpacity=".16" />
              <path d="M75 270 154 210 235 220 338 75" stroke="#92d4cf" strokeWidth="3" />
              <path d="m307 79 31-4-1 32" stroke="#92d4cf" strokeWidth="3" />
              <path d="M210 12v326M48 175h324" stroke="#fff" strokeOpacity=".12" strokeDasharray="4 6" />
              <circle cx="75" cy="270" r="7" fill="#92d4cf" /><circle cx="154" cy="210" r="7" fill="#92d4cf" /><circle cx="235" cy="220" r="7" fill="#92d4cf" />
              <circle cx="338" cy="75" r="20" stroke="#92d4cf" strokeOpacity=".4" />
            </svg>
            <div className={styles.visualCaption}><h2>{t("visualLabel")}</h2><p>{t("visualNote")}</p></div>
            <div className={styles.visualSteps}>{(t.raw("visualSteps") as string[]).map((step, i) => <span key={step}><b>0{i + 1}</b>{step}</span>)}</div>
          </div>
        </section>
        <div className={styles.principles}>{(t.raw("principles") as string[]).map((item) => <span key={item}><span aria-hidden="true">✳</span>{item}</span>)}</div>
        <section className={styles.services} id="services" aria-labelledby="services-title">
          <p className={styles.eyebrow}>{t("servicesKicker")}</p>
          <div className={styles.sectionHeading}><h2 id="services-title">{t("servicesTitle")}</h2><p>{t("servicesIntro")}</p></div>
          <div className={styles.cards}>{cards.map((card, i) => (
            <article className={styles.card} key={card.title}>
              <div className={styles.cardIndex}><span>0{i + 1}</span><span aria-hidden="true">↗</span></div>
              <h3>{card.title}</h3><p>{card.description}</p><div className={styles.deliverable}>{card.deliverable}</div>
            </article>
          ))}</div>
        </section>
        <section className={styles.approach} id="approach" aria-labelledby="approach-title">
          <div><p className={styles.eyebrow}>{t("processKicker")}</p><h2 id="approach-title">{t("processTitle")}</h2><p className={styles.approachIntro}>{t("processIntro")}</p></div>
          <ol className={styles.steps}>{steps.map((step, i) => <li key={step.title}><span className={styles.stepNumber}>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        </section>
        <section className={styles.faq} id="faq" aria-labelledby="faq-title">
          <div><p className={styles.eyebrow}>{t("faqKicker")}</p><h2 id="faq-title">{t("faqTitle")}</h2></div>
          <div className={styles.questions}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>
        <section className={styles.cta} aria-labelledby="cta-title"><div><p className={styles.eyebrow}>{t("ctaKicker")}</p><h2 id="cta-title">{t("ctaTitle")}</h2><p>{t("ctaText")}</p></div><a className={styles.lightButton} href={quoteUrl} target="_blank" rel="noreferrer">{t("ctaLink")} <span aria-hidden="true">↗</span></a></section>
      </main>
      <footer className={styles.footer}><a href="#top" className={styles.brand}><AtlasMark /><span>atlas<span className={styles.brandSub}>CONSULTING</span></span></a><p>{t("footerNote")}<br />Design &amp; development · STARKE LOSUNG</p><a className={styles.textLink} href="#top">{t("backTop")} ↑</a></footer>
    </div>
  );
}
