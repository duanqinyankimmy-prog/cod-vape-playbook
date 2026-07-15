export type LangKey = "en" | "ro" | "pl" | "hu" | "pt" | "cs" | "es" | "hr" | "sk" | "lt" | "lv";

export interface Section {
  title: string;
  subtitle: string;
  content: string[];
  psychology?: string[];
  signals?: string[];
  antipattern?: string;
  scripts: Record<LangKey, string>;
  zh: string;
  tag: string;
  tagColor: string;
  bonus?: boolean;
}
