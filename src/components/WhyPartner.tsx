import { TrendingUp, Code2, HeadphonesIcon, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GlowCard } from './GlowCard';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Revenue Growth',
    description: 'Earn competitive bounties and recurring revenue share on every client you bring. Scale your income as your portfolio grows.',
  },
  {
    icon: Code2,
    title: 'Technical Integration',
    description: 'Connect via our well-documented APIs or simply refer clients directly. Flexible options for technical and non-technical partners.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'Get priority access to our partner success team, co-marketing materials, and a dedicated account manager at higher tiers.',
  },
  {
    icon: Globe,
    title: 'Market Access',
    description: 'Tap into 20+ supported markets across Europe and beyond. Help your clients launch financial products in record time.',
  },
];

export function WhyPartner() {
  return (
    <section id="why" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Benefits
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Why Partner with <span className="gradient-text">Vault</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <GlowCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-deep-blue/10">
                  <benefit.icon size={24} className="text-deep-blue" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{benefit.description}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
