import Link from "next/link";
import { offers } from "@/content/offers";
import { Arrow } from "./arrow";

export function ServiceList() {
  return <div className="offer-list">{offers.map((offer,index) => <details className="offer-row" name="offers" key={offer.slug} open={index === 0}>
    <summary className="offer-toggle"><span className="offer-number">{offer.number}</span><h3 className="offer-name">{offer.title}</h3><span className="offer-plus" aria-hidden="true" /></summary>
    <div className="offer-panel"><div className="offer-word" aria-hidden="true">{offer.word}</div><div className="offer-copy"><h4>{offer.heading}</h4><p>{offer.description}</p><ul>{offer.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link href={`/contacto?servico=${offer.slug}`}>{offer.action}<Arrow /></Link></div></div>
  </details>)}</div>;
}
