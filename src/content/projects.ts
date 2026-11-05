/** Only publish real work with confirmed permissions, credits and KROMA's role. */
export type ProjectService =
  | "fotografia"
  | "video"
  | "identidade-design"
  | "websites"
  | "redes-sociais";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  year?: number;
  summary: string;
  services: ProjectService[];
  cover: ProjectImage;
  images?: ProjectImage[];
  context?: string;
  approach?: string;
  credits?: string[];
};

// Intentionally empty. Never substitute invented work or generated brand mockups.
export const projects: Project[] = [];

export const projectCategories: { value: ProjectService | "todos"; label: string }[] = [
  { value: "todos", label: "Tudo" },
  { value: "fotografia", label: "Fotografia" },
  { value: "video", label: "Vídeo" },
  { value: "identidade-design", label: "Identidade & design" },
  { value: "websites", label: "Websites" },
  { value: "redes-sociais", label: "Redes sociais" },
];
