import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/** FlatCompat + next extends causes circular JSON errors on ESLint 9 — use upstream flat config */
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      /** 필터/검색 변경 시 페이지 리셋·localStorage 초기화 등 흔한 패턴과 충돌 — 과도한 false positive */
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
