import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Motion } from "./motion";

export function SiteShell({ children }: { children: ReactNode }) {
  return <Motion><Header /><main id="conteudo">{children}</main><Footer /></Motion>;
}
