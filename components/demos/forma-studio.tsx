import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { SupportedLocale } from "@/site.config";
import { getDemoQuoteUrl } from "./demo-toolbar";
import { StudioGallery, type StudioGalleryLabels, type StudioProject } from "./studio-gallery";
import styles from "./forma-studio.module.css";

function FormaMark() {
  return <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true"><path d="M5 33V5h28v28H5Z" stroke="currentColor" /><path d="M5 33 33 5M5 19h14v14M19 5v14h14" stroke="currentColor" /></svg>;
}

export async function FormaStudio({ locale }: { locale: SupportedLocale }) {
  const t = await getTranslations({ locale, namespace: "forma" });
  const quoteUrl = getDemoQuoteUrl(locale, "Forma Studio");
  const projects = t.raw("projects") as StudioProject[];
  const services = t.raw("serviceItems") as { title: string; description: string; detail: string }[];
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <div className={styles.forma} id="top">
      <a href="#forma-content" className={styles.skip}>{t("skip")}</a>
      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="Forma Studio"><FormaMark /><span>forma<span className={styles.brandSub}>STUDIO</span></span></a>
        <nav aria-label={t("nav")}>
          <a href="#projects">{t("projectsLink")}</a>
          <a href="#studio">{t("studioLink")}</a>
          <a href="#services">{t("servicesLink")}</a>
        </nav>
        <a href="#contact" className={styles.headerCta}>{t("contactLink")} <span aria-hidden="true">↗</span></a>
      </header>
      <main id="forma-content" className={styles.main}>
        <section className={styles.hero} aria-labelledby="forma-title">
          <div className={styles.heroHeading}>
            <p className={styles.eyebrow}>{t("kicker")}</p>
            <h1 id="forma-title">{t("title")}<br /><em>{t("titleAccent")}</em></h1>
            <div className={styles.heroSide}><p>{t("intro")}</p><a className={styles.textLink} href="#projects">{t("explore")} <span aria-hidden="true">↓</span></a></div>
          </div>
          <figure className={styles.heroFigure}>
            <Image src="/demos/forma/casa-patio.svg" alt={t("heroAlt")} width={1440} height={820} priority sizes="100vw" />
            <figcaption><span>{t("heroCaption")}</span><span>{t("conceptual")}</span></figcaption>
            <span className={styles.imageIndex} aria-hidden="true">F / 01</span>
          </figure>
          <div className={styles.heroFoot}><span>{t("heroNote")}</span><span>{t("heroFoot")}</span></div>
        </section>
        <section className={styles.studio} id="studio" aria-labelledby="studio-title">
          <p className={styles.eyebrow}>{t("studioKicker")}</p>
          <div><h2 id="studio-title">{t("studioTitle")} <em>{t("studioAccent")}</em></h2><div className={styles.studioText}><p>{t("studioText")}</p><p>{t("studioNote")}</p></div></div>
        </section>
        <section className={styles.projectsSection} id="projects" aria-labelledby="projects-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{t("projectsKicker")}</p><h2 id="projects-title">{t("projectsTitle")}</h2></div><p>{t("projectsIntro")}</p></div>
          <StudioGallery projects={projects} labels={t.raw("galleryLabels") as StudioGalleryLabels} />
        </section>
        <section className={styles.services} id="services" aria-labelledby="services-title">
          <div><p className={styles.eyebrow}>{t("servicesKicker")}</p><h2 id="services-title">{t("servicesTitle")}</h2><p className={styles.servicesIntro}>{t("servicesIntro")}</p><a href="#contact" className={styles.textLink}>{t("servicesCta")} <span aria-hidden="true">↗</span></a></div>
          <div className={styles.serviceList}>{services.map((service, index) => <article key={service.title}><span className={styles.number}>0{index + 1}</span><div><h3>{service.title}</h3><p>{service.description}</p><span className={styles.serviceDetail}>{service.detail}</span></div><span className={styles.serviceArrow} aria-hidden="true">↗</span></article>)}</div>
        </section>
        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{t("processKicker")}</p><h2 id="process-title">{t("processTitle")}</h2></div><p>{t("processIntro")}</p></div>
          <ol>{steps.map((step, index) => <li key={step.title}><span className={styles.number}>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </section>
        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <p className={styles.eyebrow}>{t("contactKicker")}</p><h2 id="contact-title">{t("contactTitle")} <em>{t("contactAccent")}</em></h2><p>{t("contactText")}</p><a href={quoteUrl} className={styles.button} target="_blank" rel="noreferrer">{t("contactCta")} <span aria-hidden="true">↗</span></a><p className={styles.contactNote}>{t("contactNote")}</p>
        </section>
      </main>
      <footer className={styles.footer}><a href="#top" className={styles.brand} aria-label="Forma Studio"><FormaMark /><span>forma<span className={styles.brandSub}>STUDIO</span></span></a><p>{t("footerNote")}<br />{t("credits")}</p><a className={styles.textLink} href="#top">{t("backTop")} ↑</a></footer>
    </div>
  );
}
