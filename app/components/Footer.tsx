import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#262F56] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/campfire-logo.png"
              alt="Campfire"
              width={140}
              height={32}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed">
              Deeply human leadership development designed to flex and scale
              with you.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="/content" className="hover:text-white transition-colors">Content</Link></li>
              <li><Link href="/customers" className="hover:text-white transition-colors">Customers</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="https://bythecampfire.beehiiv.com/" target="_blank" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get Started</h4>
            <p className="text-sm mb-4">
              Ready to build better leaders? Let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="inline-block px-5 py-2.5 text-sm font-semibold text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
            >
              Book a Call
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Campfire. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
