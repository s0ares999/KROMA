import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { projects, projectCategories } from "@/content/projects";
import { Arrow } from "@/components/arrow";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: project ? `${project.title} — KROMA` : "Projeto não encontrado — KROMA" };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <SiteShell>
    <section className="second-hero section-pad"><Link className="text-link" href="/portfolio">← Portefólio</Link><div className="second-hero-layout"><h1>{project.title}</h1><p>{project.summary}</p></div><div className="about-capabilities">{project.services.map(service => <span key={service}>{projectCategories.find(item => item.value === service)?.label}</span>)}{project.client && <span>{project.client}</span>}{project.year && <span>{project.year}</span>}</div></section>
    <section className="project-story section-pad" aria-label="Apresentação do projeto"><Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} sizes="90vw" priority />{project.context && <article><h2>O contexto.</h2><p>{project.context}</p></article>}{project.approach && <article><h2>A abordagem.</h2><p>{project.approach}</p></article>}{project.images?.map(image => <Image key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="90vw" />)}{project.credits && <article><h2>Créditos.</h2><ul>{project.credits.map(credit => <li key={credit}>{credit}</li>)}</ul></article>}<Link href="/contacto" className="button button-lime">Criar o teu projeto <Arrow /></Link></section>
  </SiteShell>;
}
