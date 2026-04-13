import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { getUTM, formatUTMForDescription } from '../lib/utm';

// Zoho Web-to-Lead form credentials.
// Get these from: Zoho CRM → Setup → Developer Space → Webforms → Leads → [your form] → Get Code
// Copy the xnQsjsdp and xmIwtLD hidden input values from the generated form HTML.
const ZOHO_WEB_FORM_URL = 'https://crm.zoho.com/crm/WebToLeadForm';
const ZOHO_XNQSJSDP = 'c07c573ba82bfe259ff17e97e7c58d3b3eb02ab4b41ec1feeae66959214542d2';
const ZOHO_XMIWTLD = '3a93182db6ef181f8ffa5bc8b5e694603761a9da18e021a135156356f0a3bfda6893abff82b945f23d124c3ec1f1af1e';
const ZOHO_RETURN_URL = 'https://partners.vault.ist/?applied=1';

/**
 * Split a free-form full-name string into Zoho's First Name / Last Name fields.
 * Zoho Leads module requires Last Name — if the user types a single word, we
 * put it in Last Name (not First) so the required field is satisfied.
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: '', lastName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function submitToZoho(
  fullName: string,
  email: string,
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
) {
  const utm = getUTM();
  const description = formatUTMForDescription(utm, window.location.href);
  const { firstName, lastName } = splitName(fullName);

  // Extract company domain from email for Company / Website fields
  const emailDomain = email.split('@')[1] || '';

  if (!ZOHO_XNQSJSDP || !ZOHO_XMIWTLD) {
    console.log('[Vault Partner] Lead submission (Zoho web form not configured):', {
      firstName,
      lastName,
      email,
      company: emailDomain,
      utm,
      description,
    });
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
    'First Name': firstName,
    'Last Name': lastName,
    Email: email,
    Company: emailDomain,
    Website: `https://${emailDomain}`,
    'Lead Source': 'Partner Landing Page',
    LEADCF8: 'New Business/Customer',
    // UTM fields — Zoho custom field names from Web-to-Lead form
    LEADCF28: utm.utm_source || '',
    LEADCF27: utm.utm_medium || '',
    LEADCF30: utm.utm_campaign || '',
    LEADCF29: utm.utm_term || '',
    LEADCF31: utm.utm_content || '',
    Description: description,
    // Honeypot field — must be empty (anti-spam, required by Zoho form)
    aG9uZXlwb3Q: '',
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || trimmedName.length < 2) {
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return;
    }

    setStatus('loading');

    try {
      submitToZoho(trimmedName, trimmedEmail, iframeRef);
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
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                minLength={2}
                autoComplete="name"
                disabled={status === 'loading'}
                className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:border-deep-blue/50 focus:ring-1 focus:ring-deep-blue/30 disabled:opacity-50"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
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
              </div>
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
