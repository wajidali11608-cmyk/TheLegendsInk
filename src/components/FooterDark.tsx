import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, ShieldCheck, Loader2 } from 'lucide-react';
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.9 },
        colors: ['#C59E3F', '#FBF9F5', '#B8860B']
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
    <footer className="w-full bg-[#0F1012] text-[#FBF9F5] border-t border-[rgba(255,255,255,0.12)] select-none relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative z-10">

        {/* Top Brand Banner in Footer with Logo from PDF */}
        <div className="px-8 lg:px-16 py-12 border-b border-[rgba(255,255,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <img
              src="/logo.png"
              alt="The Legends Ink Logo"
              className="h-16 md:h-20 w-auto object-contain filter brightness-110"
            />
            <div>
              <h3 className="font-luxury font-black text-xl md:text-2xl uppercase tracking-[0.15em] text-white">
                THE LEGENDS INK
              </h3>
              <p className="font-editorial italic text-sm text-[#C59E3F]">
                Ink That Speaks The Truth • Published from Bandipora & Printed in Srinagar
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPdfReader}
            className="px-8 py-3.5 bg-[#C59E3F] hover:bg-amber-400 text-[#0F1012] font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center space-x-2"
          >
            <span>Read Magazine PDF (Free)</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Three Columns Matrix: FOLLOW | ENTER YOUR E-MAIL | LEGAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.1)] border-b border-[rgba(255,255,255,0.1)]">

          {/* Column 1: DISPATCHES & SOCIAL */}
          <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C59E3F]" />
                <h4 className="font-sans font-bold text-xs tracking-[0.25em] uppercase text-white">
                  EDITORIAL CHANNELS
                </h4>
              </div>
              <ul className="space-y-3 text-xs font-sans tracking-wider text-white/70">
                {[
                  { name: "X (Twitter) Editorial", href: "#twitter" },
                  { name: "Instagram Dispatch", href: "#instagram" },
                  { name: "LinkedIn Publication Desk", href: "#linkedin" },
                  { name: "YouTube Investigative Channel", href: "#youtube" },
                  { name: "WhatsApp Reader Network", href: "#whatsapp" }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center justify-between hover:text-[#C59E3F] transition-colors py-1"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C59E3F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-[10px] font-sans tracking-widest text-white/40 uppercase">
              PUBLISHED FROM BANDIPORA • PRINTED IN SRINAGAR
            </div>
          </div>

          {/* Column 2: THE WEEKLY DISPATCH */}
          <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <h4 className="font-sans font-bold text-xs tracking-[0.25em] uppercase text-white">
                  THE WEEKLY INK DISPATCH
                </h4>
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Receive curated Valley investigative briefs, upcoming print edition previews, and historical archives directly to your inbox every Friday evening.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="mt-6">
                <div className="relative flex items-center border-b-2 border-white/20 focus-within:border-[#C59E3F] pb-2 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent text-sm font-sans text-white placeholder-white/40 focus:outline-none pr-8"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Subscribe to dispatch"
                    className="p-1.5 text-white hover:text-[#C59E3F] transition-colors focus:outline-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#C59E3F]" />
                    ) : isSubscribed ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isSubscribed && (
                  <div className="mt-2 text-xs font-sans text-[#C59E3F] tracking-wide animate-in fade-in space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>
                        Subscribed! {subscribedEmail} is registered
                        {isSynced ? ' (synced to Google Sheets)' : ''}.
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-2.5 text-[10px] font-mono text-white/50 flex items-center justify-between">
                  <span>Editorial Desk:</span>
                  <a 
                    href="mailto:thelegendsink@gmail.com?subject=The Weekly Ink Dispatch Inquiry" 
                    className="text-[#C59E3F] hover:underline"
                  >
                    thelegendsink@gmail.com
                  </a>
                </div>
              </form>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-sans tracking-widest text-white/40 uppercase">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>INDEPENDENT PUBLIC JOURNALISM</span>
              </span>
              <button
                onClick={onOpenMasthead}
                className="text-[#C59E3F] hover:underline"
              >
                EDITORIAL BOARD ↗
              </button>
            </div>
          </div>

          {/* Column 3: LEGAL & ETHICS */}
          <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C59E3F]" />
                <h4 className="font-sans font-bold text-xs tracking-[0.25em] uppercase text-white">
                  LEGAL & PCI CHARTER
                </h4>
              </div>
              <ul className="space-y-3 text-xs font-sans tracking-wider text-white/70">
                {[
                  { label: "Terms of Publication & Subscription", topic: "terms" },
                  { label: "Privacy Policy & Reader Safeguards", topic: "privacy" },
                  { label: "Press Council Code of Journalistic Ethics", topic: "ethics" },
                  { label: "Dispute Resolution & Legal Representation", topic: "disputes" }
                ].map((item) => (
                  <li key={item.topic}>
                    <button
                      onClick={() => onOpenLegal(item.topic)}
                      className="group flex items-center justify-between w-full hover:text-[#C59E3F] transition-colors py-1 text-left"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C59E3F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-[10px] font-sans tracking-wide text-[#C59E3F]/80 uppercase leading-relaxed">
              "All disputes subject to the jurisdiction of Srinagar Courts only."
            </div>
          </div>

        </div>

        {/* Bottom Bar: © 2026 THE LEGENDS INK | ALL RIGHTS RESERVED */}
        <div className="py-6 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-xs font-sans tracking-[0.2em] text-white/70 uppercase space-y-4 md:space-y-0">
          <div>
            © 2026 THE LEGENDS INK MONTHLY • ALL RIGHTS RESERVED
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="font-headline font-bold text-xs md:text-sm tracking-[0.25em] text-white hover:text-[#C59E3F] transition-colors flex items-center space-x-1.5"
            >
              <span>THE LEGENDS INK MONTHLY</span>
              <span>↑</span>
            </button>
          </div>

          <div>
            <button
              onClick={onOpenPdfReader}
              className="text-[#C59E3F] hover:text-white transition-colors font-bold tracking-[0.2em]"
            >
              READ FULL PDF
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
