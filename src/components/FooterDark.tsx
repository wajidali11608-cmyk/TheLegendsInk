import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, ShieldCheck, Loader2, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitNewsletterSubscription } from '../utils/newsletterService';

interface FooterDarkProps {
  onOpenPdfReader: () => void;
  onOpenMasthead: () => void;
  onOpenLegal: (topic: string) => void;
}

export const FooterDark: React.FC<FooterDarkProps> = ({
  onOpenPdfReader,
  onOpenMasthead,
  onOpenLegal,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSynced, setIsSynced] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || isSubmitting) return;

    const trimmed = email.trim().toLowerCase();
    setIsSubmitting(true);

    try {
      const res = await submitNewsletterSubscription(trimmed);
      setSubscribedEmail(trimmed);
      setIsSynced(res.synced);
      setIsSubscribed(true);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.95 },
        colors: ['#C5A059', '#FAF9F5', '#8E7128']
      });

      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0D0E12] text-[#FAF9F5] border-t-2 border-[#C5A059] select-none relative overflow-hidden">
      {/* Subtle warm golden ambient backdrop glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-[#C5A059]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-10 relative z-10">

        {/* ━━━ TOP MASTHEAD BRAND STRIP (Compact & Distinguished) ━━━ */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <img
              src="/tli-seal-badge.png"
              alt="The Legends Ink Crest"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full ring-1 ring-[#C5A059]/60 bg-black/40 flex-shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <h3 className="font-headline font-black text-sm sm:text-base uppercase tracking-[0.18em] text-[#FAF9F5]">
                  THE LEGENDS INK
                </h3>
                <span className="text-[#C5A059] font-mono text-[9px] tracking-widest font-bold">
                  MONTHLY
                </span>
              </div>
              <p className="font-cursive text-sm sm:text-base text-[#D4AF37] leading-tight">
                Ink That Speaks The Truth. For a Better, Informed Society.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={onOpenPdfReader}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E12] text-[10.5px] font-bold uppercase tracking-[0.16em] rounded-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <span>Read Full PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              onClick={scrollToTop}
              title="Back to top"
              className="px-3 py-2 bg-white/5 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white text-[10.5px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ━━━ THREE COMPACT COLUMNS ━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-6 border-b border-white/10">

          {/* Column 1: Editorial Channels */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>EDITORIAL CHANNELS</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "X (Twitter)", href: "#twitter" },
                { name: "Instagram", href: "#instagram" },
                { name: "LinkedIn", href: "#linkedin" },
                { name: "YouTube", href: "#youtube" },
                { name: "WhatsApp", href: "#whatsapp" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/12 border border-white/10 hover:border-[#C5A059]/40 text-white/75 hover:text-[#D4AF37] text-[10px] font-sans tracking-wide rounded-xs transition-colors"
                >
                  {item.name} ↗
                </a>
              ))}
            </div>

            <div className="pt-2 text-[9px] font-mono tracking-wider text-white/40 uppercase">
              PUBLISHED FROM BANDIPORA • PRINTED IN SRINAGAR, J&amp;K
            </div>
          </div>

          {/* Column 2: Compact Weekly Dispatch */}
          <div className="space-y-2.5 bg-white/[0.02] p-3 rounded-xs border border-white/06">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>THE WEEKLY INK DISPATCH</span>
            </div>

            <p className="text-[11px] text-white/60 font-sans leading-relaxed">
              Curated investigative briefs &amp; print edition previews to your inbox every Friday.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative mt-2">
              <div className="flex items-center bg-white/5 border border-white/15 focus-within:border-[#C5A059] rounded-xs px-2.5 py-1.5 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  required
                  className="w-full bg-transparent text-xs font-sans text-white placeholder-white/35 focus:outline-none pr-2"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Subscribe"
                  className="p-1 text-[#C5A059] hover:text-white transition-colors disabled:opacity-50 cursor-pointer flex-shrink-0"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isSubscribed ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {isSubscribed && (
                <div className="mt-1.5 text-[10px] font-sans text-[#D4AF37] flex items-center space-x-1 animate-in fade-in">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Subscribed! {subscribedEmail} is registered{isSynced ? ' (synced)' : ''}.</span>
                </div>
              )}
            </form>

            <div className="flex items-center justify-between text-[9px] font-mono text-white/45 pt-1">
              <span>Editorial Desk:</span>
              <a href="mailto:thelegendsink24×7@gmail.com" className="text-[#C5A059] hover:underline">
                thelegendsink24×7@gmail.com
              </a>
            </div>
          </div>

          {/* Column 3: Legal, Press Council & Board */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>LEGAL &amp; PCI CHARTER</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10.5px] font-sans text-white/70">
              {[
                { label: "Terms of Publication", topic: "terms" },
                { label: "Reader Privacy", topic: "privacy" },
                { label: "PCI Ethics Code", topic: "ethics" },
                { label: "Dispute Protocol", topic: "disputes" }
              ].map((item) => (
                <button
                  key={item.topic}
                  onClick={() => onOpenLegal(item.topic)}
                  className="text-left py-1 px-2 rounded-xs bg-white/5 hover:bg-white/10 hover:text-[#D4AF37] transition-colors truncate cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/08 text-[9px] font-mono text-white/40">
              <span className="flex items-center space-x-1 text-white/60">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>PCI COMPLIANT</span>
              </span>
              <button
                onClick={onOpenMasthead}
                className="text-[#C5A059] hover:underline uppercase tracking-wider cursor-pointer"
              >
                EDITORIAL BOARD [↗]
              </button>
            </div>
          </div>

        </div>

        {/* ━━━ MICRO BOTTOM BAR ━━━ */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[9.5px] font-mono text-white/45 tracking-wider uppercase gap-2 text-center sm:text-left">
          <div>
            &copy; 2026 THE LEGENDS INK MONTHLY &bull; ALL RIGHTS RESERVED
          </div>

          <div className="text-[#D4AF37]/75">
            "All disputes subject to the jurisdiction of Srinagar Courts only."
          </div>

          <div>
            ISSN: 2583-9985 &bull; RNI REGISTERED
          </div>
        </div>

      </div>
    </footer>
  );
};
