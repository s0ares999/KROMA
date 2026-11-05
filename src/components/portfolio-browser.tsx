"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { projectCategories, type Project, type ProjectService } from "@/content/projects";

type Category = ProjectService | "todos";

export function PortfolioBrowser({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<Category>("todos");
  const selected = projectCategories.find((item) => item.value === category)!;
  const visible = useMemo(
    () => category === "todos" ? projects : projects.filter((project) => project.services.includes(category)),
    [category, projects],
  );
  const bookingHref = category === "todos" ? "/contacto" : `/contacto?servico=${category}`;

  return (
    <div className="portfolio-browser">
      <noscript><style>{`.portfolio-filters{display:none}`}</style></noscript>
      <div className="portfolio-toolbar">
        <div className="portfolio-filters" role="group" aria-label="Filtrar projetos por serviço">
          {projectCategories.map((item) => (
            <button
              type="button"
              key={item.value}
              aria-pressed={category === item.value}
              aria-controls="portfolio-results"
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="portfolio-count" aria-live="polite" aria-atomic="true">
          {String(visible.length).padStart(2, "0")} {visible.length === 1 ? "projeto" : "projetos"}
          <span className="second-sr-only"> — {selected.label}</span>
        </p>
      </div>
      <div id="portfolio-results">
        {visible.length > 0 ? (
          <div className="portfolio-projects">
            {visible.map((project) => (
              <Link className="portfolio-project" key={project.slug} href={`/portfolio/${project.slug}`}>
                <div className="portfolio-project-image">
                  <Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} sizes="(max-width: 700px) 90vw, 44vw" />
                  <span className="portfolio-project-arrow"><Arrow /></span>
                </div>
                <div className="portfolio-project-caption"><h2>{project.title}</h2><span>{project.year}</span></div>
                <p>{project.summary}</p>
                <ul className="portfolio-project-tags" aria-label="Serviços do projeto">
                  {project.services.map((service) => <li key={service}>{projectCategories.find((item) => item.value === service)?.label}</li>)}
                </ul>
              </Link>
            ))}
          </div>
        ) : (
          <div className="portfolio-empty">
            <div className="portfolio-empty-top"><span>SELEÇÃO EM PREPARAÇÃO</span><span>{category === "todos" ? "UM OLHAR. VÁRIOS FORMATOS." : selected.label.toLocaleUpperCase("pt-PT")}</span></div>
            <div className="portfolio-empty-main">
              <div className="portfolio-empty-frame" aria-hidden="true"><span /><Arrow /></div>
              <div className="portfolio-empty-copy">
                <h2>A seleção está<br />a ganhar forma.</h2>
                <p>Estamos a preparar os trabalhos que queremos partilhar contigo. Entretanto, podemos começar pela tua ideia.</p>
                <Link href={bookingHref} className="second-link second-link-lime">Preparar um projeto <Arrow /></Link>
              </div>
            </div>
            <p className="portfolio-empty-status" role="status">{category === "todos" ? "Ainda não há projetos publicados." : `Ainda não há projetos publicados em ${selected.label}.`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
