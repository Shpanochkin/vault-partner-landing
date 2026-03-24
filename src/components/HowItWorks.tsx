import { FileText, Code, DollarSign, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Apply',
    description: 'Submit your application in 2 minutes. We review and onboard fast.',
  },
  {
    icon: Code,
    number: '02',
    title: 'Integrate',
    description: 'Connect via API or refer clients directly. Choose what works for you.',
  },
  {
    icon: DollarSign,
    number: '03',
    title: 'Earn',
    description: 'Receive commissions monthly. Track everything in your partner portal.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative px-6 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #0a0b0f 0%, #0d0e14 50%, #0a0b0f 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-deep-blue">
              Process
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.15}>
              <div className="group relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all group-hover:border-deep-blue/30 group-hover:bg-deep-blue/5">
                    <step.icon size={32} className="text-white/60 transition-colors group-hover:text-deep-blue" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-deep-blue text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm text-white/50">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-10 hidden -translate-y-1/2 translate-x-1/2 text-white/15 md:block">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
