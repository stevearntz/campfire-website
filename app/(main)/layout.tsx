import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CrispChat from "@/app/components/CrispChat";
import ConsoleGreeting from "@/app/components/ConsoleGreeting";
import CheatCodes from "@/app/components/CheatCodes";
import AsteroidsEgg from "@/app/components/AsteroidsEgg";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div id="easter-egg" hidden dangerouslySetInnerHTML={{ __html: `<!--

        (  )
       (    )
        (  )
       _|__|_
      |      |
      |______|

   Warming up the logs...
   Want to build something with us?
   getcampfire.com/contact

-->` }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-[#6E3FCC] focus:rounded-lg focus:shadow-lg focus:font-semibold focus:text-sm">Skip to main content</a>
      <Navbar />
      <div id="main-content">{children}</div>
      <Footer />
      <CrispChat />
      <ConsoleGreeting />
      <CheatCodes />
      <AsteroidsEgg />
    </>
  );
}
