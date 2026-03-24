import { ScrollReveal } from './ScrollReveal';

export function CTAFooter() {
  return (
    <section
      id="apply"
      className="relative px-6 py-24 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #0a0b0f 0%, #080a1a 40%, #0a0b0f 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,25,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
            Ready to Grow <span className="gradient-text">Together</span>?
          </h2>
          <p className="mb-10 text-white/40">
            Join the Vault partner ecosystem today. No minimum volume required to start.
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-deep-blue/50 focus:ring-1 focus:ring-deep-blue/30"
            />
            <button className="rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,25,255,0.3)]">
              Apply Now
            </button>
          </div>

          <p className="mt-4 text-xs text-white/25">
            No minimum volume required to start
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/20">
            <a href="#" className="transition-colors hover:text-white/40">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-white/40">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-white/40">Contact</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
