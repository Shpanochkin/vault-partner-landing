import { BarChart3, Activity, Clock, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GlowCard } from './GlowCard';

const features = [
  { icon: Activity, label: 'Real-time tracking' },
  { icon: BarChart3, label: 'Performance analytics' },
  { icon: Clock, label: 'Payout history' },
  { icon: Users, label: 'Client management' },
];

export function PartnerPortal() {
  return (
    <section className="relative px-6 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #0a0b0f 0%, #0d0e16 50%, #0a0b0f 100%)' }}>
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Portal
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Partner <span className="gradient-text">Dashboard</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <GlowCard className="relative overflow-hidden">
            <div className="absolute right-4 top-4 rounded-full border border-neon-blue/30 bg-neon-blue/10 px-3 py-1 text-xs font-semibold text-neon-blue">
              Coming Soon
            </div>

            {/* Mockup dashboard */}
            <div className="mb-8 mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <div className="ml-4 h-3 w-48 rounded bg-white/10" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/[0.04] p-4">
                  <div className="mb-2 h-2 w-16 rounded bg-white/10" />
                  <div className="h-6 w-20 rounded bg-deep-blue/20" />
                </div>
                <div className="rounded-lg bg-white/[0.04] p-4">
                  <div className="mb-2 h-2 w-16 rounded bg-white/10" />
                  <div className="h-6 w-20 rounded bg-neon-blue/20" />
                </div>
                <div className="rounded-lg bg-white/[0.04] p-4">
                  <div className="mb-2 h-2 w-16 rounded bg-white/10" />
                  <div className="h-6 w-20 rounded bg-emerald-500/20" />
                </div>
              </div>
              <div className="mt-3 h-24 rounded-lg bg-white/[0.02] p-3">
                <div className="flex h-full items-end gap-1">
                  {[40, 55, 35, 70, 50, 80, 65, 90, 75, 85, 60, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-deep-blue/40 to-neon-blue/20"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.03] p-4 text-center">
                  <f.icon size={20} className="text-deep-blue" />
                  <span className="text-xs font-medium text-white/60">{f.label}</span>
                </div>
              ))}
            </div>

            <a
              href="#apply"
              className="mt-6 block rounded-full border border-deep-blue/30 bg-deep-blue/10 py-3 text-center text-sm font-semibold text-deep-blue transition-all hover:bg-deep-blue/20"
            >
              Get Early Access
            </a>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
