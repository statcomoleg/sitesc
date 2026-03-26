"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const METRIKA_ID = 108245195;

export function YandexMetrikaRouteTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const ym = (window as Window & { ym?: (...args: unknown[]) => void }).ym;
    if (!ym) return;

    const url = `${window.location.pathname}${window.location.search}`;
    ym(METRIKA_ID, "hit", url, { referer: document.referrer });
  }, [pathname]);

  return null;
}
