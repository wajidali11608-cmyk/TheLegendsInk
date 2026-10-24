import React, { useState } from 'react';
import { X, Check, ShieldCheck, Send, BookOpen, Truck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {
  const [selectedTier, setSelectedTier] = useState<string>('annual-patron');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    district: 'Bandipora',
    address: '',
    pincode: '',
    aspirantId: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const tiers = [
    {
      id: 'annual-patron',
      name: 'ANNUAL PRINT + DIGITAL PATRON',
      badge: 'RECOMMENDED',
      price: 'Rs. 550',
      period: '/ year (12 issues)',
      desc: 'All 12 monthly editions couriered directly to your doorstep in J&K, plus instant digital flipbook access and the complete archive.',
      perks: [
        '12 Print issues delivered by courier across all 20 J&K districts',
        'Early digital flipbook release on the 1st of every month',
        'Complete 2026 Valley investigative archive',
        'Exclusive editorial supplements & election dossiers'
      ]
    },
    {
      id: 'aspirant-pass',
      name: 'STUDENT & ASPIRANT PASS',
      badge: '45% SCHOLARSHIP',
      price: 'Rs. 300',
      period: '/ year (Digital + Print)',
      desc: 'Subsidized subscription for verified UPSC, JKAS, NEET, JEE aspirants and university students across Jammu & Kashmir.',
      perks: [
        'Full digital access + 6 printed master collector issues',
        'Unabridged civil services topper interview transcripts',
        'Monthly J&K Current Affairs and governance digest',
        'Direct inquiry desk access to senior editors'
      ]
    },
    {
      id: 'single-issue',
      name: 'OCTOBER 2026 SINGLE PRINT COPY',
      badge: 'CURRENT RELEASE',
      price: 'Rs. 50',
      period: '/ single issue',
      desc: 'The complete 68-page high-resolution print copy of October 2026 featuring the Young Achievers of Kashmir.',
      perks: [
        'Dispatched within 24 hours of confirmation',
        'Protective packaging for archival collectors',
        'Doorstep postal delivery across Jammu & Kashmir'
      ]
    },
    {
      id: 'institutional',
      name: 'INSTITUTIONAL & ACADEMIC',
      badge: 'FOR LIBRARIES & ACADEMIES',
      price: 'Rs. 1,500',
      period: '/ year (3 print copies/mo)',
      desc: 'For university libraries, degree colleges, civil service coaching academies, and administrative reading rooms.',
      perks: [
        '3 print copies of every monthly issue for your reading room',
        'Campus-wide IP digital access for faculty and students',
        'Official institutional tax invoice with GST',
        'Priority invitations to annual civic roundtables'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const orders = JSON.parse(localStorage.getItem('tli_subscriptions') || '[]');
      orders.unshift({
        ...formData,
        tier: selectedTier,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('tli_subscriptions', JSON.stringify(orders));
    } catch {
      // ignore
    }
    setIsSuccess(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C59E3F', '#0F1012', '#FFFFFF', '#D4AF37']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1012]/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FBF9F5] text-[#0F1012] border border-[rgba(15,16,18,0.15)] shadow-2xl my-6 overflow-hidden">
        
        {/* Modal Top Header with PDF Logo */}
        <div className="bg-[#0F1012] text-[#FBF9F5] p-6 sm:p-10 flex items-start justify-between border-b border-white/10 relative">
          <div className="flex items-center space-x-6">
            <img 
              src="/logo.png" 
              alt="The Legends Ink" 
              className="h-14 sm:h-20 w-auto object-contain filter brightness-110 hidden sm:block" 
            />
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.25em] text-[#C59E3F] uppercase font-bold">
                <span>OFFICIAL SUBSCRIBER CIRCLE • JAMMU & KASHMIR</span>
              </div>
              <h2 className="mt-2 font-headline font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                JOIN THE LEGENDS INK CIRCLE
              </h2>
              <p className="mt-1 text-xs sm:text-sm font-editorial italic text-white/80">
                "Ink That Speaks The Truth. For a Better, Informed Society."
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-white/20 hover:bg-white/10 hover:text-[#C59E3F] transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Confirmation Receipt View */
          <div className="p-8 sm:p-16 text-center">
            <div className="w-20 h-20 bg-[#C59E3F]/20 text-[#C59E3F] border-2 border-[#C59E3F] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg animate-in zoom-in">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="text-xs font-sans tracking-[0.25em] text-[#C59E3F] uppercase font-bold">
              SUBSCRIPTION ACTIVATION CONFIRMED
            </span>
            <h3 className="font-headline font-black text-2xl sm:text-4xl uppercase tracking-tight mt-2 text-[#0F1012]">
              WELCOME TO THE PATRON CIRCLE
            </h3>

            <div className="mt-8 max-w-lg mx-auto p-6 bg-white border border-[rgba(15,16,18,0.12)] shadow-md text-left font-sans text-xs space-y-3">
              <div className="flex justify-between border-b border-[rgba(15,16,18,0.1)] pb-2">
                <span className="text-[#0F1012]/60">Subscriber Name:</span>
                <span className="font-bold text-[#0F1012]">{formData.fullName || 'Valued Subscriber'}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(15,16,18,0.1)] pb-2">
                <span className="text-[#0F1012]/60">Membership Plan:</span>
                <span className="font-bold uppercase text-[#C59E3F]">{selectedTier}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(15,16,18,0.1)] pb-2">
                <span className="text-[#0F1012]/60">Delivery Jurisdiction:</span>
                <span className="font-bold text-[#0F1012]">{formData.district}, Jammu & Kashmir</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#0F1012]/60">Patron Membership ID:</span>
                <span className="font-mono font-bold text-[#C59E3F]">TLI-2026-OCT-8941</span>
              </div>
            </div>

            <p className="mt-6 text-xs font-sans text-[#0F1012]/70 max-w-lg mx-auto">
              Your digital flipbook credentials have been dispatched to your email. The October 2026 Young Achievers of Kashmir print edition has been routed to our Srinagar dispatch facility.
            </p>

            <button
              onClick={onClose}
              className="mt-8 px-10 py-3.5 bg-[#0F1012] hover:bg-[#C59E3F] text-[#FBF9F5] hover:text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Return to Journal
            </button>
          </div>
        ) : (
          /* Subscription Plans & Details */
          <div className="p-6 sm:p-10">
            {/* Guarantee Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#FAF8F3] border border-[rgba(15,16,18,0.12)] mb-8 text-xs font-sans text-[#0F1012]/80">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#C59E3F]" />
                <span className="font-semibold">Direct Courier & Post across all 20 J&K districts</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#C59E3F]" />
                <span>Instant Digital Flipbook Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Independent Press</span>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-6 border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      isSelected 
                        ? 'border-[#0F1012] bg-white shadow-xl ring-2 ring-[#0F1012]' 
                        : 'border-[rgba(15,16,18,0.15)] bg-[#FAF8F3] hover:border-[#0F1012]/50 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-sans font-bold tracking-widest px-2.5 py-1 uppercase ${
                          isSelected ? 'bg-[#0F1012] text-white' : 'bg-[#0F1012]/10 text-[#0F1012]/70'
                        }`}>
                          {tier.badge}
                        </span>
                        <div className="text-right">
                          <span className="font-headline font-black text-2xl text-[#0F1012]">{tier.price}</span>
                          <span className="text-[10px] font-sans text-[#0F1012]/60 block">{tier.period}</span>
                        </div>
                      </div>

                      <h4 className="font-headline font-bold text-base uppercase mt-4 text-[#0F1012] flex items-center space-x-2">
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C59E3F] flex-shrink-0" />}
                        <span>{tier.name}</span>
                      </h4>
                      <p className="mt-2 text-xs font-sans text-[#0F1012]/75 leading-relaxed">
                        {tier.desc}
                      </p>

                      <ul className="mt-4 space-y-2 text-xs font-sans text-[#0F1012]/80 pt-4 border-t border-[rgba(15,16,18,0.1)]">
                        {tier.perks.map((p, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#C59E3F] flex-shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subscriber Delivery Form */}
            <form onSubmit={handleSubmit} className="border-t border-[rgba(15,16,18,0.15)] pt-8">
              <h3 className="font-headline font-black text-xs uppercase tracking-[0.25em] text-[#0F1012] mb-4 flex items-center space-x-2">
                <span>SUBSCRIBER DELIVERY ADDRESS (JAMMU & KASHMIR)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#0F1012]/60 mb-1 font-bold">
                    Full Name / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Suvan Sharma"
                    className="w-full p-3 bg-white border border-[rgba(15,16,18,0.15)] text-xs font-sans focus:outline-none focus:border-[#0F1012] focus:ring-1 focus:ring-[#0F1012]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#0F1012]/60 mb-1 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="reader@gmail.com"
                    className="w-full p-3 bg-white border border-[rgba(15,16,18,0.15)] text-xs font-sans focus:outline-none focus:border-[#0F1012] focus:ring-1 focus:ring-[#0F1012]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#0F1012]/60 mb-1 font-bold">
                    Phone / WhatsApp (for Delivery Dispatch) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94190 00000"
                    className="w-full p-3 bg-white border border-[rgba(15,16,18,0.15)] text-xs font-sans focus:outline-none focus:border-[#0F1012] focus:ring-1 focus:ring-[#0F1012]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#0F1012]/60 mb-1 font-bold">
                    District in Jammu & Kashmir *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 bg-white border border-[rgba(15,16,18,0.15)] text-xs font-sans focus:outline-none focus:border-[#0F1012] focus:ring-1 focus:ring-[#0F1012]"
                  >
                    <option value="Bandipora">Bandipora (Publication HQ)</option>
                    <option value="Srinagar">Srinagar</option>
                    <option value="Baramulla">Baramulla</option>
                    <option value="Anantnag">Anantnag</option>
                    <option value="Jammu">Jammu</option>
                    <option value="Budgam">Budgam</option>
                    <option value="Ganderbal">Ganderbal</option>
                    <option value="Kupwara">Kupwara</option>
                    <option value="Pulwama">Pulwama</option>
                    <option value="Shopian">Shopian</option>
                    <option value="Kulgam">Kulgam</option>
                    <option value="Udhampur">Udhampur</option>
                    <option value="Rajouri">Rajouri</option>
                    <option value="Poonch">Poonch</option>
                    <option value="Other J&K">Other J&K / Ladakh</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#0F1012]/60 mb-1 font-bold">
                    Doorstep Postal Address (Mohalla, Landmark, Village/Town) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Near Degree College, Hilal Abad, Nesbal"
                    className="w-full p-3 bg-white border border-[rgba(15,16,18,0.15)] text-xs font-sans focus:outline-none focus:border-[#0F1012] focus:ring-1 focus:ring-[#0F1012]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(15,16,18,0.15)]">
                <div className="flex items-center space-x-2 text-xs font-sans text-[#0F1012]/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Doorstep delivery across all 20 J&K districts • SSL Secure</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-[#0F1012] hover:bg-[#C59E3F] text-[#FBF9F5] hover:text-[#0F1012] text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Complete Subscription</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
