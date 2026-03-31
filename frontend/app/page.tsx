import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant font-medium">v2.0 obsidian update</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tighter text-on-surface mb-6 leading-tight">
            Chat Smarter.<br />
            <span className="text-gradient">Not Harder. PristoChat.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            The premium AI-powered chat application designed for the digital obsidian workspace. Seamless intelligence meets architectural precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/auth/register" className="bg-kinetic px-8 py-4 rounded-xl text-white font-headline font-bold text-lg tracking-tight shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all active:scale-95">
              Get Started
            </Link>
            <Link href="/auth/login" className="px-8 py-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-low transition-all text-on-surface font-headline font-bold text-lg tracking-tight active:scale-95">
              View Demo
            </Link>
          </div>

          {/* Floating Glass Interface Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-primary/5 blur-[100px] rounded-full"></div>
            <div className="glass-panel ghost-border rounded-2xl p-4 shadow-2xl relative z-10 overflow-hidden text-left">
              {/* Top Bar of Mockup */}
              <div className="flex items-center justify-between mb-8 px-4 py-2 border-b border-outline-variant/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error/40"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                </div>
                <div className="text-[10px] font-label tracking-widest text-on-surface-variant uppercase">Secure Connection Active</div>
              </div>
              <div className="grid grid-cols-12 gap-6 p-4">
                {/* Mockup Sidebar */}
                <div className="hidden md:block col-span-3 space-y-4">
                  <div className="h-10 w-full bg-surface-container-lowest rounded-lg opacity-40"></div>
                  <div className="h-10 w-full bg-surface-container-high rounded-lg"></div>
                  <div className="h-10 w-full bg-surface-container-lowest rounded-lg opacity-40"></div>
                  <div className="h-10 w-full bg-surface-container-lowest rounded-lg opacity-40"></div>
                </div>
                {/* Mockup Chat Area */}
                <div className="col-span-12 md:col-span-9 space-y-6">
                  <div className="flex flex-col items-start max-w-[80%]">
                    <div className="bg-surface-container-high rounded-2xl rounded-tl-none p-4 text-sm font-body text-on-surface shadow-sm">
                      How can I optimize the current architectural workflow for the digital obsidian?
                    </div>
                  </div>
                  <div className="flex flex-col items-end w-full">
                    <div className="bg-primary-container/20 border border-primary/10 rounded-2xl rounded-tr-none p-4 text-sm font-body text-on-primary-container shadow-[0_0_20px_rgba(195,192,255,0.05)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-label uppercase tracking-wider">AI Thinking</span>
                      </div>
                      The obsidian framework thrives on tonal shifts rather than line-based containment. I recommend increasing your surface_container_low spacing.
                    </div>
                  </div>
                  <div className="h-12 w-full bg-surface-container-lowest rounded-xl flex items-center px-4">
                    <div className="h-2 w-24 bg-outline-variant/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full -z-10"></div>
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -z-10"></div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl bg-surface-container-low transition-all duration-500 hover:bg-surface-container active:scale-[0.98]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">AI-Powered Intelligence</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Advanced neural networks processing every interaction with pixel-perfect precision and contextual awareness.
              </p>
            </div>
            {/* Card 2 */}
            <div className="group p-8 rounded-2xl bg-surface-container-low transition-all duration-500 hover:bg-surface-container active:scale-[0.98]">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors">
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Seamless Integrations</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Connect your entire workspace ecosystem into a single unified stream of conscious productivity.
              </p>
            </div>
            {/* Card 3 */}
            <div className="group p-8 rounded-2xl bg-surface-container-low transition-all duration-500 hover:bg-surface-container active:scale-[0.98]">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-8 group-hover:bg-tertiary/20 transition-colors">
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Enterprise-Grade Security</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Built on the obsidian principle—impenetrable, dark-site architecture for complete data sovereignty.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="max-w-7xl mx-auto px-6 mb-40 relative">
          <div className="bg-surface-container-lowest rounded-3xl p-12 md:p-24 overflow-hidden relative border border-outline-variant/5">
            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-headline font-medium text-on-surface leading-tight mb-12">
                &quot;PristoChat has completely redefined how our engineering team communicates. It&apos;s not just a chat tool; it&apos;s an <span className="text-primary font-bold">architectural extension</span> of our workflow.&quot;
              </h2>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 relative">
                  <Image
                    fill
                    style={{ objectFit: 'cover' }}
                    alt="portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBvDPsbx0FkDraagVO5tip80yFWVTtcEC6nuzeckdFmx8OzFQjaflF8ynaJfB0mp9RzPPFkvhYElPeKim-GSiEVLUhltrgJawlaWRfQnygF7ED3Uu5LumV42NK5ZYBUrY6Q7sO_u9sbbdjOLIVyr9oeaZcItsPHSDO-bPkgKwLIpbG3cHtGNsPUCKgMNr_NA1PCP8wp8MqhanQCcRVwFUyHszU6JRDi1yA7f87BImewFIFKaLF6cyYaQTPlPl0KTaszUj4HLuWTrqh"
                  />
                </div>
                <div>
                  <div className="font-headline font-bold text-xl text-on-surface">Julian Sterling</div>
                  <div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">CTO at Obsidian Labs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 text-center">
          <div className="p-1 w-fit mx-auto rounded-3xl bg-linear-to-tr from-primary/20 via-secondary/20 to-tertiary/20">
            <div className="bg-surface rounded-[calc(1.5rem-4px)] px-12 py-20 md:px-24">
              <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 text-on-surface tracking-tight">Ready to evolve?</h2>
              <p className="text-on-surface-variant max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                Join the elite workspaces leveraging the power of PristoChat. Experience the obsidian standard today.
              </p>
              <Link href="/auth/register" className="inline-block bg-kinetic px-10 py-5 rounded-xl text-white font-headline font-bold text-xl tracking-tight shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-105 transition-all">
                Launch Your Workspace
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 w-full py-12 px-6 border-t border-zinc-100/5">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-headline font-bold text-zinc-100 text-2xl tracking-tighter">PristoChat</div>
            <p className="font-body text-sm text-zinc-500">© 2024 PristoChat AI. Designed for the digital obsidian.</p>
          </div>
          <div className="flex gap-8">
            <Link className="text-zinc-500 hover:text-indigo-400 transition-colors text-sm font-medium" href="#">Privacy Policy</Link>
            <Link className="text-zinc-500 hover:text-indigo-400 transition-colors text-sm font-medium" href="#">Terms of Service</Link>
            <Link className="text-zinc-500 hover:text-indigo-400 transition-colors text-sm font-medium" href="#">Twitter</Link>
            <Link className="text-zinc-500 hover:text-indigo-400 transition-colors text-sm font-medium" href="#">GitHub</Link>
          </div>
        </div>
      </footer>
    </>
  );
}