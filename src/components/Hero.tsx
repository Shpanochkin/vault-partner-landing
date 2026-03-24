import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import { CountUp } from './CountUp';
import { ArrowDown } from 'lucide-react';

const stats = [
  { value: 20, suffix: '+', label: 'Supported Markets' },
  { value: 2, prefix: '$', suffix: 'B+', label: 'Platform Volume' },
  { value: 150, suffix: '+', label: 'Active Clients' },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      <ParticleBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm"
        >
          Partner Program
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 max-w-4xl font-black leading-none tracking-tight"
          style={{ fontSize: 'clamp(48px, 7.5vw, 88px)', letterSpacing: '-0.04em' }}
        >
          Grow with{' '}
          <span className="gradient-text">Vault</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl text-lg text-white/50 md:text-xl"
        >
          Join our partner ecosystem and unlock recurring revenue with embedded finance infrastructure.
          Earn commissions, grow your network, access premium tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#apply"
            className="rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,25,255,0.3)]"
          >
            Become a Partner
          </a>
          <a
            href="#why"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
          >
            Learn More
            <ArrowDown size={14} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl font-black tracking-tight text-white md:text-5xl">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-sm text-white/40">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0b0f] to-transparent" />
    </section>
  );
}
