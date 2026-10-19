import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }],
      // Hydrating client state from localStorage/sessionStorage/fetch on mount is intentional here.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // Server components render per request (force-dynamic); reading the clock there is intended.
    files: ["src/app/**/page.tsx"],
    rules: { "react-hooks/purity": "off" },
  },
  { ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "public/**"] },
];

export default eslintConfig;
