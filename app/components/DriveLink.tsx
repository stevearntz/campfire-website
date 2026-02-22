"use client";

export default function DriveLink() {
  return (
    <span
      onClick={() => window.dispatchEvent(new Event("racing-activate"))}
      className="cursor-pointer hover:underline"
    >
      drive
    </span>
  );
}
