import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <Logo height={22} className="opacity-40" />
        <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} Vault. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://twitter.com/Vault_ist" target="_blank" rel="noopener noreferrer" className="text-xs text-white/20 transition-colors hover:text-white/40">Twitter</a>
          <a href="https://www.linkedin.com/company/vault-ist/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/20 transition-colors hover:text-white/40">LinkedIn</a>
          <a href="https://t.me/vault_ist" target="_blank" rel="noopener noreferrer" className="text-xs text-white/20 transition-colors hover:text-white/40">Telegram</a>
        </div>
      </div>
    </footer>
  );
}
