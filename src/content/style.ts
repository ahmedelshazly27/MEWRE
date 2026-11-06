/** House-style checks for the founder and venture tracks (Track 0 predates these rules). */
import type { KeyConceptSet, Module } from "./schema";
import type { ValidationIssue } from "./validate";

const RULES: { re: RegExp; message: string }[] = [
  { re: /—/, message: "contains an em dash (use a comma, colon or parentheses)" },
  { re: /abdelrahman/i, message: "names the stealth cofounder (never in content)" },
];

export function validateStyle(mod: Module, keys?: KeyConceptSet): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const scan = (value: unknown, where: string) => {
    if (typeof value === "string") {
      for (const r of RULES) if (r.re.test(value)) issues.push({ where, message: `${r.message}: "${value.slice(Math.max(0, value.search(r.re) - 40), value.search(r.re) + 40).replace(/\n/g, " ")}"` });
    } else if (Array.isArray(value)) value.forEach((v, i) => scan(v, `${where}[${i}]`));
    else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scan(v, `${where}.${k}`);
  };
  scan(mod, `${mod.id} style`);
  if (keys) scan(keys.en, `${mod.id} key style`);
  return issues;
}
