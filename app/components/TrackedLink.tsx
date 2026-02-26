"use client";

import Link from "next/link";
import { trackEvent } from "@/app/lib/analytics";
import { CSSProperties } from "react";

interface TrackedLinkProps {
  href: string;
  eventName: string;
  eventParams?: Record<string, string>;
  external?: boolean;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

export default function TrackedLink({
  href,
  eventName,
  eventParams,
  external,
  className,
  style,
  children,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, eventParams);
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
}
