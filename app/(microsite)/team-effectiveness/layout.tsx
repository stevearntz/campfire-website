import SiteNav from "./_components/SiteNav";
import SiteFooter from "./_components/SiteFooter";

export default function TeamEffectivenessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
