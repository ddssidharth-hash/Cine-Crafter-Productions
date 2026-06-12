// ═══════════════════════════════════════════════════════════════════════
// Shared domain types. Keeping these in one place means the /data layer and
// the components that render it stay in sync.
// ═══════════════════════════════════════════════════════════════════════

/** Categories used to tag and filter portfolio projects. */
export type ProjectCategory =
  | "Film Production"
  | "Line Production"
  | "Filmmaking"
  | "Web Series"
  | "Ad Films"
  | "Documentaries"
  | "Digital Marketing Videos";

/** A single still / gallery image attached to a project. */
export interface MediaStill {
  src: string;
  alt: string;
}

/** A portfolio (or experimental) project entry. */
export interface Project {
  /** URL-safe unique id, also used as the modal/deep-link key. */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One-line teaser shown on cards. */
  excerpt: string;
  /** Longer description shown in the detail view. */
  description: string;
  /** The studio's role on the project, e.g. "Direction · Edit · Color". */
  role: string;
  /** Client or agency credit line. */
  client: string;
  year: number;
  /** Cover image used on cards and as the video poster. */
  cover: string;
  /**
   * Optional embedded video. Use a file URL (mp4/webm) for self-hosted
   * previews, or a YouTube/Vimeo embed URL for the detail player.
   */
  videoUrl?: string;
  /** Optional muted, looping preview shown on card hover (mp4/webm). */
  previewUrl?: string;
  /** Gallery stills shown in the detail view. */
  stills?: MediaStill[];
  /** Surface this project in homepage "Featured Work". */
  featured?: boolean;
}

/** An experimental / passion project — same shape, looser tagging. */
export interface ExperimentalProject {
  slug: string;
  title: string;
  /** Free-form tag, e.g. "AI Film", "Concept Reel", "Music Video". */
  tag: string;
  excerpt: string;
  description: string;
  year: number;
  cover: string;
  videoUrl?: string;
  previewUrl?: string;
  stills?: MediaStill[];
}

/** A service offering shown on the Services page. */
export interface Service {
  /** Stable id (used for anchor links from other pages). */
  id: string;
  title: string;
  summary: string;
  /** 2–3 sentence description. */
  description: string;
  /** Bulleted capabilities. */
  capabilities: string[];
  /** Optional representative visual. */
  image?: string;
  /** Optional slug of a portfolio project that exemplifies this service. */
  exampleProjectSlug?: string;
}

/** A client or agency logo entry. */
export interface Logo {
  name: string;
  /** Path to the logo asset (SVG/PNG, ideally monochrome). */
  src?: string;
  /** Optional external link. */
  url?: string;
}
