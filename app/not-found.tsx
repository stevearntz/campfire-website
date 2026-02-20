import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main
      className="flex flex-col items-center justify-center text-center px-6"
      style={{
        backgroundColor: "#06021B",
        minHeight: "calc(100vh - 160px)",
      }}
    >
      <Image
        src="/campfire-logo.webp"
        alt="Campfire"
        width={160}
        height={40}
        className="mb-12 brightness-0 invert"
      />

      <h1
        className="font-extrabold tracking-tight mb-6"
        style={{
          color: "#9D88ED",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          letterSpacing: "-1px",
        }}
      >
        Sorry, that page went missing
      </h1>

      <p
        className="max-w-md mb-10"
        style={{
          color: "#E8E2F9",
          fontSize: "1.3rem",
          lineHeight: 1.375,
          letterSpacing: "-0.5px",
        }}
      >
        We&rsquo;re all about connecting people, but didn&rsquo;t connect this
        time. Don&rsquo;t worry, you didn&rsquo;t do anything wrong.
      </p>

      <Link
        href="/"
        className="uppercase font-semibold tracking-widest transition-colors hover:bg-[#9D88ED]/10"
        style={{
          color: "#9D88ED",
          border: "2px solid #9D88ED",
          borderRadius: "5px",
          padding: "20px 30px",
          fontSize: "0.875rem",
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
