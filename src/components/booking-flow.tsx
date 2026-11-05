"use client";

import { useRef, useState, type FormEvent } from "react";

const services = [
  { slug: "fotografia", name: "Fotografia", description: "Marcas, eventos e momentos." },
  { slug: "video", name: "Vídeo", description: "Histórias que ganham movimento." },
  { slug: "identidade-design", name: "Identidade & design", description: "Uma linguagem para a tua marca." },
  { slug: "websites", name: "Websites", description: "Uma presença digital à tua medida." },
  { slug: "redes-sociais", name: "Redes sociais", description: "Conteúdo para manter a conversa." },
] as const;

type ServiceSlug = (typeof services)[number]["slug"];
type BriefFields = { name: string; email: string; objective: string; date: string; location: string };
const steps = ["Serviço", "Projeto", "Rever"];
const emptyFields: BriefFields = { name: "", email: "", objective: "", date: "", location: "" };

function resolveService(value: string | undefined): ServiceSlug | "" {
  const canonical = value === "design" ? "identidade-design" : value;
  return services.find((service) => service.slug === canonical)?.slug ?? "";
}

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function displayDate(value: string) {
  if (!value) return "A combinar";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function BookingFlow({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceSlug | "">(() => resolveService(initialService));
  const [fields, setFields] = useState<BriefFields>(emptyFields);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const selected = services.find((item) => item.slug === service);

  function goTo(next: number) {
    setError("");
    setFeedback("");
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }

  function updateField(key: keyof BriefFields, value: string) {
    setFields((previous) => ({ ...previous, [key]: value }));
    setError("");
    setFeedback("");
  }

  function continueBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (step === 0) {
      if (!service) {
        setError("Escolhe o serviço que tens em mente para continuar.");
        form.querySelector<HTMLInputElement>('input[name="service"]')?.focus();
        return;
      }
      goTo(1);
      return;
    }
    if (step === 1) {
      const name = form.elements.namedItem("name") as HTMLInputElement;
      const objective = form.elements.namedItem("objective") as HTMLTextAreaElement;
      const date = form.elements.namedItem("date") as HTMLInputElement;
      name.setCustomValidity(fields.name.trim() ? "" : "Escreve o teu nome.");
      objective.setCustomValidity(fields.objective.trim() ? "" : "Conta-nos um pouco sobre a tua ideia.");
      date.setCustomValidity(fields.date && fields.date < localToday() ? "Escolhe uma data de hoje em diante, ou deixa a data em aberto." : "");
      if (!form.checkValidity()) {
        setError("Revê os campos indicados antes de continuar.");
        form.reportValidity();
        return;
      }
      goTo(2);
    }
  }

  function briefText() {
    return [
      "KROMA — Pedido de projeto",
      "RASCUNHO LOCAL — NÃO ENVIADO",
      "",
      `Serviço: ${selected?.name ?? "A definir"}`,
      `Nome: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      `Data pretendida: ${displayDate(fields.date)}`,
      `Local: ${fields.location.trim() || "A combinar"}`,
      "",
      "A ideia:",
      fields.objective.trim(),
      "",
      "Este documento foi preparado no website KROMA e guardado no teu dispositivo.",
      "Não foi enviado ao estúdio e não confirma uma reserva ou disponibilidade.",
    ].join("\n");
  }

  function downloadBrief() {
    try {
      const url = URL.createObjectURL(new Blob([briefText()], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "KROMA-pedido-de-projeto.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setFeedback("Pedido guardado no teu dispositivo. Ainda não foi enviado à KROMA.");
    } catch {
      setFeedback("Não foi possível guardar o ficheiro. Experimenta copiar o pedido.");
    }
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefText());
      setFeedback("Pedido copiado. Ainda não foi enviado à KROMA.");
    } catch {
      setFeedback("Não foi possível copiar. Podes guardar o pedido num ficheiro .txt.");
    }
  }

  return (
    <div className="booking-flow">
      <p className="booking-notice" id="booking-availability"><span aria-hidden="true">↗</span> O envio ainda não está disponível. Podes preparar e guardar o teu pedido.</p>
      <noscript><style>{`.booking-flow form, .booking-flow .booking-progress { display: none; }`}</style><p className="booking-notice">Ativa JavaScript para preparar o teu pedido nesta página.</p></noscript>
      <ol className="booking-progress" aria-label="Etapas do pedido">
        {steps.map((name, index) => <li key={name} className={index === step ? "is-current" : index < step ? "is-complete" : ""} aria-current={index === step ? "step" : undefined}><span className="booking-step-number" aria-hidden="true">0{index + 1}</span><span>{name}</span><span className="booking-sr-only">{index < step ? " — concluído" : index === step ? " — etapa atual" : ""}</span></li>)}
      </ol>
      <form ref={formRef} noValidate onSubmit={continueBrief} aria-describedby="booking-availability booking-privacy">
        <div className="booking-step-heading"><p className="booking-kicker">0{step + 1} / 03</p><h2 ref={heading} tabIndex={-1}>{step === 0 ? "O que vamos criar?" : step === 1 ? "Vamos dar contexto." : "A tua ideia, enquadrada."}</h2><p>{step === 0 ? "Escolhe um ponto de partida. Podemos cruzar serviços no mesmo projeto." : step === 1 ? "Partilha o essencial. Os detalhes afinam-se em conjunto." : "Revê o pedido antes de o guardares. Podes voltar atrás e ajustar os detalhes."}</p></div>
        {step === 0 && <fieldset className="booking-service-fieldset"><legend className="booking-sr-only">Serviço pretendido</legend><div className="booking-service-options">{services.map((item, index) => <label className={`booking-service-option ${service === item.slug ? "is-selected" : ""}`} key={item.slug}><input type="radio" name="service" value={item.slug} checked={service === item.slug} required onChange={() => { setService(item.slug); setError(""); }} /><span className="booking-service-index" aria-hidden="true">0{index + 1}</span><span className="booking-service-copy"><span className="booking-service-name">{item.name}</span><span className="booking-service-description">{item.description}</span></span><span className="booking-service-check" aria-hidden="true">{service === item.slug ? "↗" : "+"}</span></label>)}</div></fieldset>}
        {step === 1 && <div className="booking-fields"><div className="booking-field booking-field-wide"><label htmlFor="booking-objective">Conta-nos a tua ideia <span aria-hidden="true">*</span></label><textarea id="booking-objective" name="objective" rows={4} maxLength={3000} required placeholder="O que queres criar, para quem e com que objetivo?" value={fields.objective} onChange={(event) => { event.target.setCustomValidity(""); updateField("objective", event.target.value); }} /><p className="booking-field-hint">Pode ser uma ideia inicial. Não precisas de ter tudo definido.</p></div><div className="booking-field"><label htmlFor="booking-name">O teu nome <span aria-hidden="true">*</span></label><input id="booking-name" name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={(event) => { event.target.setCustomValidity(""); updateField("name", event.target.value); }} /></div><div className="booking-field"><label htmlFor="booking-email">Email <span aria-hidden="true">*</span></label><input id="booking-email" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(event) => updateField("email", event.target.value)} /></div><div className="booking-field"><label htmlFor="booking-date">Data pretendida <span className="booking-optional">Opcional</span></label><input id="booking-date" name="date" type="date" min={localToday()} value={fields.date} onChange={(event) => { event.target.setCustomValidity(""); updateField("date", event.target.value); }} /><p className="booking-field-hint">Uma preferência, sujeita a confirmação.</p></div><div className="booking-field"><label htmlFor="booking-location">Local <span className="booking-optional">Opcional</span></label><input id="booking-location" name="location" autoComplete="off" maxLength={180} placeholder="Cidade ou local do projeto" value={fields.location} onChange={(event) => updateField("location", event.target.value)} /></div><p className="booking-required-note booking-field-wide">* Campos necessários para preparar o pedido.</p></div>}
        {step === 2 && <div className="booking-review"><div className="booking-review-top"><span>O TEU PEDIDO</span><button type="button" className="booking-text-button" onClick={() => goTo(0)}>Editar serviço ↗</button></div><dl className="booking-review-details"><div className="booking-review-wide"><dt>Serviço</dt><dd>{selected?.name}</dd></div><div><dt>Nome</dt><dd>{fields.name.trim()}</dd></div><div><dt>Email</dt><dd>{fields.email.trim()}</dd></div><div><dt>Data pretendida</dt><dd>{displayDate(fields.date)}</dd></div><div><dt>Local</dt><dd>{fields.location.trim() || "A combinar"}</dd></div><div className="booking-review-wide"><dt>A tua ideia</dt><dd className="booking-review-objective">{fields.objective.trim()}</dd></div></dl><p className="booking-review-note">Este pedido ainda não foi enviado. Guardar ou copiar o resumo não confirma uma reserva.</p></div>}
        {error && <p className="booking-error" role="alert">{error}</p>}
        <div className="booking-actions">{step > 0 && <button className="booking-back" type="button" onClick={() => goTo(step - 1)}>← Voltar</button>}{step < 2 ? <button className="booking-primary" type="submit">Continuar <span aria-hidden="true">↗</span></button> : <div className="booking-final-actions"><button className="booking-primary" type="button" onClick={downloadBrief}>Guardar pedido (.txt) <span aria-hidden="true">↓</span></button><button className="booking-secondary" type="button" onClick={copyBrief}>Copiar pedido <span aria-hidden="true">↗</span></button></div>}</div>
        <p className="booking-feedback" aria-live="polite" role="status">{feedback}</p>
        <p className="booking-privacy" id="booking-privacy">Os dados não são enviados nem guardados automaticamente.</p>
      </form>
    </div>
  );
}
