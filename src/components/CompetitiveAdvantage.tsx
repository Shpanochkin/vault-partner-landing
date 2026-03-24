import { Check, X } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const rows = [
  { metric: 'Rev Share %', vault: 'Up to 20%', industry: '5–10% avg', vaultWins: true },
  { metric: 'Payout Speed', vault: 'Monthly, net-30', industry: 'Net-60 to net-90', vaultWins: true },
  { metric: 'Cookie Window', vault: '90 days', industry: '30 days avg', vaultWins: true },
  { metric: 'Tier Progression', vault: 'Transparent, merit-based', industry: 'Often opaque', vaultWins: true },
  { metric: 'Support Level', vault: 'Dedicated AM from Growth tier', industry: 'Shared support pool', vaultWins: true },
  { metric: 'API Access', vault: 'Full API + sandbox', industry: 'Limited or none', vaultWins: true },
];

export function CompetitiveAdvantage() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Comparison
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Competitive <span className="gradient-text">Advantage</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-6 py-4 font-semibold text-white/50">Metric</th>
                  <th className="px-6 py-4 font-semibold text-deep-blue">Vault</th>
                  <th className="px-6 py-4 font-semibold text-white/30">Industry Avg</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.metric}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                      i === rows.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-white/70">{row.metric}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-white">
                        <Check size={14} className="text-emerald-400" />
                        {row.vault}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-white/40">
                        <X size={14} className="text-white/20" />
                        {row.industry}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
