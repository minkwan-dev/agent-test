"use client";

import { useEffect, useState } from "react";

/** 서버 HTML과 첫 클라이언트 페인트를 맞추기 위해, 마운트 전에는 false */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
