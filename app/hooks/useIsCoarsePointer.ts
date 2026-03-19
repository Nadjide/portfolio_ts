"use client";

import { useEffect, useState } from "react";

export function useIsCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const update = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return isCoarsePointer;
}
