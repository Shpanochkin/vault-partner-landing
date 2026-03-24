import { ScrollReveal } from './ScrollReveal';
import { GlowCard } from './GlowCard';

const testimonials = [
  {
    quote: 'Vault\'s partner program has been a game-changer for our consultancy. The rev share model keeps generating income long after the initial referral.',
    name: 'Alex M.',
    role: 'Fintech Consultant',
    avatar: 'AM',
  },
  {
    quote: 'The integration was seamless and the dedicated account manager at Growth tier made all the difference. Our clients love Vault\'s products.',
    name: 'Sarah K.',
    role: 'Payment Solutions Director',
    avatar: 'SK',
  },
  {
    quote: 'Compared to other BaaS partner programs we\'ve worked with, Vault offers the most transparent and competitive commission structure.',
    name: 'David L.',
    role: 'Technology Partner',
    avatar: 'DL',
  },
];

export function SocialProof() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Testimonials
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Trusted by <span className="gradient-text">Partners</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 0.1}>
              <GlowCard className="flex h-full flex-col">
                <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-deep-blue to-neon-blue text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="mb-6 text-sm text-white/30">Trusted by leading fintechs</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
              {['FinCo', 'PayBridge', 'LedgerX', 'NeoBank', 'CryptoFlow'].map((name) => (
                <div key={name} className="text-lg font-bold tracking-wide text-white/50">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
