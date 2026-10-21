"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./forma-studio.module.css";

export type StudioProject = {
  id: string;
  title: string;
  category: "residential" | "commercial";
  image: string;
  imageAlt: string;
};

export type StudioGalleryLabels = {
  all: string;
  residential: string;
  commercial: string;
  conceptual: string;
  filter: string;
};

export function StudioGallery({ projects, labels }: {
  projects: StudioProject[];
  labels: StudioGalleryLabels;
}) {
  const [category, setCategory] = useState<"all" | StudioProject["category"]>("all");
  const visibleProjects = category === "all" ? projects : projects.filter((project) => project.category === category);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label={labels.filter}>
        {(["all", "residential", "commercial"] as const).map((value) => (
          <button key={value} type="button" aria-pressed={category === value} aria-controls="forma-project-list" onClick={() => setCategory(value)}>
            {labels[value]}
          </button>
        ))}
      </div>
      <div className={styles.gallery} id="forma-project-list" aria-live="polite" aria-atomic="true">
        {visibleProjects.map((project) => (
          <article className={styles.project} key={project.id}>
            <div className={styles.projectImage}>
              <Image src={project.image} alt={project.imageAlt} width={960} height={720} sizes="(max-width: 700px) 100vw, 50vw" />
              <span className={styles.conceptual}>{labels.conceptual}</span>
            </div>
            <div className={styles.projectCaption}>
              <h3>{project.title}</h3>
              <span>{labels[project.category]}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
