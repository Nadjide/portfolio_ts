"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Piège le focus clavier à l'intérieur de `ref` tant que `active` est vrai
 * (Tab / Shift+Tab bouclent), place le focus sur le premier élément à l'ouverture
 * et le rend à l'élément précédemment focalisé à la fermeture. Pour les modales.
 */
export function useFocusTrap<T extends HTMLElement>(
  ref: RefObject<T | null>,
  active = true
) {
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const items = () =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetWidth > 0 || n.offsetHeight > 0 || n === document.activeElement
      );

    // Focus initial : premier élément focusable, sinon le conteneur lui-même.
    const first = items()[0];
    if (first) first.focus();
    else {
      el.setAttribute("tabindex", "-1");
      el.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === firstEl || activeEl === el)) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [ref, active]);
}
