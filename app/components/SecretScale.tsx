"use client";

import { useState } from "react";
import { spawnEmbers } from "@/app/lib/embers";

export default function SecretScale() {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(true);
    spawnEmbers();
    setTimeout(() => setShow(false), 3000);
  }

  return (
    <>
      <span onClick={handleClick} className="cursor-text select-text">
        scale
      </span>
      {show && (
        <span
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-sm font-semibold shadow-xl"
          style={{
            backgroundColor: "#1C1334",
            color: "#9D88ED",
            animation: "toast-pop 0.3s ease-out",
          }}
        >
          You just scaled... your click count
          <style>{`@keyframes toast-pop{from{opacity:0;transform:translate(-50%,-10px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
        </span>
      )}
    </>
  );
}
