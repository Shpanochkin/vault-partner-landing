import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

const faqs = [
  {
    q: 'What types of partners do you accept?',
    a: 'We work with fintech consultants, technology integrators, payment service providers, software platforms, and independent sales agents. Both individuals and companies are welcome.',
  },
  {
    q: 'How does the commission structure work?',
    a: 'Earnings consist of one-time bounties per referred client plus recurring revenue share. Bounty amounts and rev share percentages depend on your tier and the client segment (SMB, White Label, or BigFish).',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Commissions are paid monthly via bank transfer, net-30 from the referral qualification date. You can track all payouts in your partner dashboard.',
  },
  {
    q: 'Is there a minimum referral volume?',
    a: 'No minimum volume is required to start as a Referral Partner. Higher tiers (Growth, Strategic) have qualification thresholds based on referred clients or partner-sourced ARR.',
  },
  {
    q: 'Can I refer clients from any country?',
    a: 'Vault supports 20+ markets across Europe and select regions. Contact us for the full list of supported jurisdictions for your specific use case.',
  },
  {
    q: 'What marketing materials do you provide?',
    a: 'All partners receive a co-branded landing page template, product one-pagers, and email templates. Growth and Strategic partners get access to co-marketing funds and custom materials.',
  },
  {
    q: 'How do I track my referrals?',
    a: 'Through your dedicated partner portal with real-time tracking, conversion analytics, and payout history. Each referral gets a unique tracking link.',
  },
  {
    q: 'What happens if a referred client churns?',
    a: 'Bounties are retained after the qualification period (typically 90 days). Revenue share is only paid on active client revenue, so it naturally adjusts if a client downgrades or churns.',
  },
  {
    q: 'Can I upgrade my partner tier?',
    a: 'Yes. Tier upgrades are automatic once you meet the next tier\'s qualification criteria. You can also request a review if you\'re close to the threshold.',
  },
  {
    q: 'Do you offer co-marketing opportunities?',
    a: 'Growth partners get access to co-marketing initiatives. Strategic partners receive a dedicated MDF (Market Development Fund), co-selling playbook, and annual summit invitations.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="border-b border-white/5">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-white/90"
        >
          <span className="pr-4 text-sm font-medium text-white/70">{faq.q}</span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="shrink-0 text-white/30" />
          </motion.div>
        </button>
        <AnimatePresence mode="sync">
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-sm leading-relaxed text-white/40">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #0a0b0f 0%, #0d0e14 50%, #0a0b0f 100%)' }}>
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              FAQ
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Common <span className="gradient-text">Questions</span>
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
