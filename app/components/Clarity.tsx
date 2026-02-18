"use client";

import { useEffect } from "react";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function Clarity() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return;

    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }, []);

  return null;
}
