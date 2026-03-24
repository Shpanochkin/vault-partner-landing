import { Check, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GlowCard } from './GlowCard';

const tiers = [
  {
    name: 'Referral Partner',
    highlighted: false,
    requirements: 'KYC/KYB verification',
    bounties: [
      { label: 'Small Business', value: '$300 – $750' },
      { label: 'White Label', value: '$1,000 + 10% rev share (12 mo)' },
      { label: 'Enterprise', value: '10% rev share (12 mo)' },
    ],
    features: ['Self-service portal', 'Basic reporting', 'Email support'],
  },
  {
    name: 'Growth Partner',
    highlighted: true,
    badge: 'Recommended',
    requirements: '5+ referred clients OR $50K partner-sourced ARR',
    bounties: [
      { label: 'Small Business', value: '$500 – $1,500' },
      { label: 'White Label', value: '$2,000 + 15% rev share (12 mo)' },
      { label: 'Enterprise', value: '15% rev share (24 mo)' },
    ],
    features: ['Priority support', 'Co-marketing', 'Advanced analytics'],
  },
  {
    name: 'Strategic Partner',
    highlighted: false,
    requirements: '15+ referred clients OR $200K partner-sourced ARR',
    bounties: [
      { label: 'Small Business', value: '$750 – $3,000' },
      { label: 'White Label', value: '$3,000 + 20% rev share (24 mo)' },
      { label: 'Enterprise', value: 'Custom terms (up to 36 mo)' },
    ],
    features: [
      'Dedicated Account Manager',
      'MDF fund',
      'Co-selling playbook',
      'Annual summit',
    ],
  },
];

export function PartnerTiers() {
  return (
    <section id="tiers" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Partner Tiers
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Choose Your <span className="gradient-text">Path</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/40">
              Progress through tiers as your referral portfolio grows. Higher tiers unlock better commissions and premium support.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={index * 0.12}>
              <div className={`relative ${tier.highlighted ? 'lg:-my-4' : ''}`}>
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-deep-blue to-neon-blue px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-deep-blue/20">
                      <Star size={10} className="mr-1 inline" />
                      {tier.badge}
                    </span>
                  </div>
                )}
                <GlowCard
                  className={`flex h-full flex-col ${
                    tier.highlighted
                      ? 'border-deep-blue/30 bg-deep-blue/[0.04] lg:pb-10 lg:pt-10'
                      : ''
                  }`}
                >
                <h3 className="mb-1 text-xl font-bold text-white">{tier.name}</h3>
                <p className="mb-6 text-xs text-white/40">{tier.requirements}</p>

                <div className="mb-6 space-y-3">
                  {tier.bounties.map((bounty) => (
                    <div key={bounty.label} className="flex items-start justify-between gap-2">
                      <span className="text-xs text-white/50">{bounty.label}</span>
                      <span className="text-right text-sm font-semibold text-white">{bounty.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto border-t border-white/5 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                    Features
                  </p>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                        <Check size={14} className="shrink-0 text-deep-blue" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#apply"
                  className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? 'bg-deep-blue text-white hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,25,255,0.3)]'
                      : 'border border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  Get Started
                </a>
              </GlowCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
