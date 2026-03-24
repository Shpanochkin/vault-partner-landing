import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'framer-motion';

type Segment = 'smb' | 'wl' | 'bigfish';
type Tier = 'referral' | 'growth' | 'strategic';

const BOUNTY_TABLE: Record<Tier, Record<Segment, { min: number; max: number }>> = {
  referral: { smb: { min: 300, max: 750 }, wl: { min: 1000, max: 1000 }, bigfish: { min: 0, max: 0 } },
  growth: { smb: { min: 500, max: 1500 }, wl: { min: 2000, max: 2000 }, bigfish: { min: 0, max: 0 } },
  strategic: { smb: { min: 750, max: 3000 }, wl: { min: 3000, max: 3000 }, bigfish: { min: 0, max: 0 } },
};

const REVSHARE_TABLE: Record<Tier, Record<Segment, { pct: number; months: number }>> = {
  referral: { smb: { pct: 0, months: 0 }, wl: { pct: 0.10, months: 12 }, bigfish: { pct: 0.10, months: 12 } },
  growth: { smb: { pct: 0, months: 0 }, wl: { pct: 0.15, months: 12 }, bigfish: { pct: 0.15, months: 24 } },
  strategic: { smb: { pct: 0, months: 0 }, wl: { pct: 0.20, months: 24 }, bigfish: { pct: 0.20, months: 36 } },
};

const AVG_MONTHLY_REVENUE: Record<Segment, number> = {
  smb: 800,
  wl: 5000,
  bigfish: 25000,
};

const INDUSTRY_AVG_PAYOUT = 5000;

export function EarningsCalculator() {
  const [clients, setClients] = useState(10);
  const [segment, setSegment] = useState<Segment>('smb');
  const [tier, setTier] = useState<Tier>('growth');

  const result = useMemo(() => {
    const bounty = BOUNTY_TABLE[tier][segment];
    const avgBounty = (bounty.min + bounty.max) / 2;
    const annualBounty = avgBounty * clients;

    const rs = REVSHARE_TABLE[tier][segment];
    const monthlyRS = rs.pct * AVG_MONTHLY_REVENUE[segment] * clients;
    const annualRS = monthlyRS * Math.min(12, rs.months);

    const total = annualBounty + annualRS;
    const vsIndustry = INDUSTRY_AVG_PAYOUT > 0 ? Math.round(((total - INDUSTRY_AVG_PAYOUT) / INDUSTRY_AVG_PAYOUT) * 100) : 0;

    return { annualBounty, annualRS, total, vsIndustry };
  }, [clients, segment, tier]);

  const segmentOptions: { value: Segment; label: string }[] = [
    { value: 'smb', label: 'SMB' },
    { value: 'wl', label: 'White Label' },
    { value: 'bigfish', label: 'BigFish' },
  ];

  const tierOptions: { value: Tier; label: string }[] = [
    { value: 'referral', label: 'Referral' },
    { value: 'growth', label: 'Growth' },
    { value: 'strategic', label: 'Strategic' },
  ];

  return (
    <section id="calculator" className="relative px-6 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #0a0b0f 0%, #0c0d15 50%, #0a0b0f 100%)' }}>
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Earnings
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Revenue <span className="gradient-text">Calculator</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/40">
              Estimate your annual earnings based on referral volume, client segment, and partner tier.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Controls */}
              <div className="space-y-8">
                {/* Clients slider */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-medium text-white/70">Referred clients / year</label>
                    <span className="rounded-lg bg-deep-blue/10 px-3 py-1 text-sm font-bold text-deep-blue">{clients}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={clients}
                    onChange={(e) => setClients(+e.target.value)}
                    className="w-full accent-deep-blue"
                  />
                  <div className="mt-1 flex justify-between text-xs text-white/30">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Segment */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-white/70">Client segment</label>
                  <div className="flex gap-2">
                    {segmentOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSegment(opt.value)}
                        className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                          segment === opt.value
                            ? 'border-deep-blue/50 bg-deep-blue/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tier */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-white/70">Your partner tier</label>
                  <div className="flex gap-2">
                    {tierOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTier(opt.value)}
                        className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                          tier === opt.value
                            ? 'border-deep-blue/50 bg-deep-blue/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col justify-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                    <Calculator size={14} />
                    Estimated Annual Earnings
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Bounty income</span>
                      <motion.span
                        key={result.annualBounty}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg font-bold text-white"
                      >
                        ${result.annualBounty.toLocaleString()}
                      </motion.span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Rev share income</span>
                      <motion.span
                        key={result.annualRS}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg font-bold text-white"
                      >
                        ${result.annualRS.toLocaleString()}
                      </motion.span>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white/70">Total</span>
                        <motion.span
                          key={result.total}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-3xl font-black gradient-text"
                        >
                          ${result.total.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>

                    {result.vsIndustry > 0 && (
                      <motion.p
                        key={result.vsIndustry}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-center text-xs text-neon-blue"
                      >
                        That's {result.vsIndustry}% more than industry average
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
