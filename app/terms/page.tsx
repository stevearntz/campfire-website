export default function TermsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="py-20" style={{ backgroundImage: "url('/purple-topo.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Terms of service
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing the website at getcampfire.com, you are agreeing to be
                bound by these terms of service, all applicable laws and
                regulations, and agree that you are responsible for compliance with
                any applicable local laws. If you do not agree with any of these
                terms, you are prohibited from using or accessing this site. The
                materials contained in this website are protected by applicable
                copyright and trademark law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                2. Use license
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the
                materials (information or software) on Campfire&apos;s website for
                personal, non-commercial transitory viewing only. This is the grant
                of a license, not a transfer of title, and under this license you
                may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2 ml-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose, or for any public
                  display (commercial or non-commercial)
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software contained
                  on Campfire&apos;s website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or &ldquo;mirror&rdquo;
                  the materials on any other server
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by Campfire at any time.
                Upon terminating your viewing of these materials or upon the
                termination of this license, you must destroy any downloaded
                materials in your possession whether in electronic or printed
                format.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                3. Disclaimer
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The materials on Campfire&apos;s website are provided on an
                &ldquo;as is&rdquo; basis. Campfire makes no warranties, expressed
                or implied, and hereby disclaims and negates all other warranties
                including, without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Further, Campfire does not warrant or make any representations
                concerning the accuracy, likely results, or reliability of the use
                of the materials on its website or otherwise relating to such
                materials or on any sites linked to this site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                4. Limitations
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall Campfire or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data or
                profit, or due to business interruption) arising out of the use or
                inability to use the materials on Campfire&apos;s website, even if
                Campfire or a Campfire authorized representative has been notified
                orally or in writing of the possibility of such damage. Because
                some jurisdictions do not allow limitations on implied warranties,
                or limitations of liability for consequential or incidental
                damages, these limitations may not apply to you.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                5. Accuracy of materials
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The materials appearing on Campfire&apos;s website could include
                technical, typographical, or photographic errors. Campfire does not
                warrant that any of the materials on its website are accurate,
                complete or current. Campfire may make changes to the materials
                contained on its website at any time without notice. However
                Campfire does not make any commitment to update the materials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Links</h2>
              <p className="text-gray-600 leading-relaxed">
                Campfire has not reviewed all of the sites linked to its website
                and is not responsible for the contents of any such linked site.
                The inclusion of any link does not imply endorsement by Campfire of
                the site. Use of any such linked website is at the user&apos;s own
                risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                7. Modifications
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Campfire may revise these terms of service for its website at any
                time without notice. By using this website you are agreeing to be
                bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                8. Governing law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of Utah and you irrevocably submit to the
                exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
