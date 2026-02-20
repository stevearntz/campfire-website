"use client";

import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    const art = [
      "",
      "        (  )",
      "       (    )",
      "        (  )",
      "       _|__|_",
      "      |      |",
      "      |______|",
      "",
      "  Warming up the logs...",
      "  Want to build something with us?",
      "  getcampfire.com/contact",
      "",
    ].join("\n");
    console.log(
      `%c${art}`,
      "color: #9D88ED; font-size: 14px; font-family: monospace; line-height: 1.4;"
    );
  }, []);

  return null;
}
