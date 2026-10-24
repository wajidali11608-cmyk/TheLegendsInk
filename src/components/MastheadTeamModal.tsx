import React from 'react';
import { X, Mail, MapPin, Globe, Scale, Shield } from 'lucide-react';
import { MASTHEAD_MEMBERS, MAGAZINE_DETAILS } from '../data/magazineContent';

interface MastheadTeamModalProps {
  onClose: () => void;
}

export const MastheadTeamModal: React.FC<MastheadTeamModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#F7F5F0] text-ink border border-accent-gold/40 shadow-2xl my-6 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#07080B] text-[#F7F5F0] p-6 sm:p-8 flex items-start justify-between border-b border-white/10 relative">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-[10px] font-editorial-mono tracking-[0.25em] text-accent-gold uppercase font-bold">
              <span>OFFICIAL PUBLICATION IMPRINT & CHARTER</span>
            </div>
            <h2 className="mt-2 font-headline font-black text-2xl sm:text-4xl uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F7F5F0] via-[#FAF9F6] to-accent-gold">
              THE EDITORIAL BOARD & MASTHEAD
            </h2>
            <p className="mt-1 text-xs font-editorial-mono text-[#F7F5F0]/80">
              {MAGAZINE_DETAILS.name} • {MAGAZINE_DETAILS.volume}, {MAGAZINE_DETAILS.issue} • Bandipora & Srinagar
            </p>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 border border-white/20 hover:border-accent-gold hover:text-accent-gold transition-colors text-[#F7F5F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Board Members Matrix */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTHEAD_MEMBERS.map((member, i) => (
              <div 
                key={i} 
                className="group p-5 bg-white border border-hairline hover:border-accent-gold/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-editorial-mono uppercase tracking-widest text-accent-gold font-bold">
                      {member.role}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 group-hover:bg-accent-gold group-hover:scale-125 transition-all" />
                  </div>
                  <h4 className="mt-1.5 font-headline font-black text-base uppercase text-ink group-hover:text-accent-gold transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-editorial-mono text-ink/75 mt-1 leading-snug">
                    {member.credentials}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-hairline/70 flex items-center space-x-1.5 text-[10px] font-editorial-mono text-ink-muted">
                  <MapPin className="w-3 h-3 text-accent-gold" />
                  <span>{member.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Publishing Registry & Contact Grid */}
          <div className="mt-8 pt-6 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-editorial-mono">
            <div className="space-y-3 p-5 bg-[#FAF9F6] border border-hairline">
              <h5 className="font-headline font-black uppercase tracking-wider text-ink text-xs flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-accent-gold" />
                <span>HEADQUARTERS & EDITORIAL BUREAU</span>
              </h5>
              <div className="flex items-start space-x-2.5 text-ink/80 pt-1">
                <MapPin className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{MAGAZINE_DETAILS.editorialOffice}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-ink/80">
                <Mail className="w-4 h-4 text-accent-gold flex-shrink-0" />
                <span className="font-bold">{MAGAZINE_DETAILS.email}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-ink/80">
                <Globe className="w-4 h-4 text-accent-gold flex-shrink-0" />
                <span>{MAGAZINE_DETAILS.website}</span>
              </div>
            </div>

            <div className="space-y-3 p-5 bg-[#FAF9F6] border border-hairline">
              <h5 className="font-headline font-black uppercase tracking-wider text-ink text-xs flex items-center space-x-2">
                <Scale className="w-3.5 h-3.5 text-accent-gold" />
                <span>LEGAL DISCLOSURE & JURISDICTION</span>
              </h5>
              <div className="flex items-start space-x-2 text-ink/80 pt-1">
                <span className="leading-relaxed">
                  {MAGAZINE_DETAILS.courtJurisdiction} Printed at {MAGAZINE_DETAILS.printingPress}. All rights reserved under the Press and Registration of Books Act.
                </span>
              </div>
              <div className="p-3 bg-accent-gold/10 border border-accent-gold/30 text-[11px] text-amber-950 font-editorial-serif italic leading-relaxed">
                "The Legends Ink Monthly questions institutions without hostility and celebrates achievers without flattery."
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
