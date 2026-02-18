"use client";

import { useEffect } from "react";

const RB2B_ID = process.env.NEXT_PUBLIC_RB2B_ID;

export default function RB2B() {
  useEffect(() => {
    if (!RB2B_ID) return;

    (window as any).reb2b =
      (window as any).reb2b ||
      function () {
        ((window as any).reb2b.q = (window as any).reb2b.q || []).push(
          arguments
        );
      };
    (window as any).reb2b.SNIPPET_VERSION = "1.0.1";

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://ddwl4m2hdecbv.cloudfront.net/b/" + RB2B_ID + "/" + RB2B_ID + ".js.gz";
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
