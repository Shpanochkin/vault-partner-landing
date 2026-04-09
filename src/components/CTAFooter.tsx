import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { CheckCircle2, Loader2 } from 'lucide-react';

const ZOHO_WEB_FORM_URL = 'https://crm.zoho.com/crm/WebToLeadForm';
const ZOHO_XNQSJSDP = '';
const ZOHO_XMIWTLD = '';
const ZOHO_RETURN_URL = 'https://partners.vault.ist/?applied=1';

function submitToZoho(email: string, iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  if (!ZOHO_XNQSJSDP || !ZOHO_XMIWTLD) {
    console.log('[Vault Partner] Lead submission (Zoho web form not configured):', email);
    return;
  }

  const iframe = iframeRef.current;
  if (!iframe) return;

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) return;

  const form = doc.createElement('form');
  form.method = 'POST';
  form.action = ZOHO_WEB_FORM_URL;

  const fields: Record<string, string> = {
    xnQsjsdp: ZOHO_XNQSJSDP,
    xmIwtLD: ZOHO_XMIWTLD,
    actionType: 'TGVhZHM=',
    returnURL: ZOHO_RETURN_URL,
    Email: email,
    'Last Name': email.split('@')[0],
    'Lead Source': 'Partner Landing Page',
  };

  for (const [name, value] of Object.entries(fields)) {
    const input = doc.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  doc.body.appendChild(form);
  form.submit();
}

export function CTAFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return;
    }

    setStatus('loading');

    try {
      submitToZoho(trimmed, iframeRef);
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

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

      <iframe ref={iframeRef} name="zoho_lead_frame" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
            Ready to Grow <span className="gradient-text">Together</span>?
          </h2>
          <p className="mb-10 text-white/40">
            Join the Vault partner ecosystem today. No minimum volume required to start.
          </p>

          {status === 'success' ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-8">
              <CheckCircle2 size={40} className="text-emerald-400" />
              <p className="text-lg font-semibold text-white">Application Received!</p>
              <p className="text-sm text-white/50">
                We'll review your application and get back to you shortly at{' '}
                <span className="text-white/70">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-deep-blue/50 focus:ring-1 focus:ring-deep-blue/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,25,255,0.3)] disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Apply Now'
                )}
              </button>
            </form>
          )}

          {status !== 'success' && (
            <p className="mt-4 text-xs text-white/25">
              No minimum volume required to start
            </p>
          )}

          {status === 'error' && (
            <p className="mt-3 text-xs text-red-400/70">
              Something went wrong. Please try again or email us at{' '}
              <a href="mailto:partners@vault.ist" className="underline">partners@vault.ist</a>.
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/20">
            <a href="/terms.html" className="transition-colors hover:text-white/40">Terms & Conditions</a>
            <span>|</span>
            <a href="/privacy.html" className="transition-colors hover:text-white/40">Privacy Policy</a>
            <span>|</span>
            <a href="mailto:partners@vault.ist" className="transition-colors hover:text-white/40">Contact</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
