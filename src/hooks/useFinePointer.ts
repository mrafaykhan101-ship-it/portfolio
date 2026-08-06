"use client";

import { useEffect, useState } from "react";

/**
 * True only for precise pointers (mouse/trackpad). Hover-dependent effects —
 * magnetism, cursor spotlights, parallax — are skipped on touch, where they
 * either do nothing or fire on tap and feel broken.
 *
 * Starts `false` so server and first client render agree.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
