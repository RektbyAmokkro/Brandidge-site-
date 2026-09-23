import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';
import { AGENCY_INFO } from '../data/agencyData';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  CalendarCheck2,
  Lock,
  Headphones,
  DollarSign,
  Gift,
  Clock,
  Check,
  FileText,
  BadgePercent,
  MessageSquare
} from 'lucide-react';

interface PricingSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: (context?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'Custom High-Converting Web Design',
    'Technical SEO & Google Indexation'
  ]);

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const commonNeeds = [
    'Custom High-Converting Web Design',
    'Technical SEO & Google Indexation',
    'Sub-Second Speed (< 0.8s LCP)',
    'Logo & Visual Brand Identity',
    'Content Management System (CMS)',
    'Mobile-First Responsive Layout',
    'Lead Capture & Form Automation',
    '1-Month Free Maintenance Package'
  ];

  return (
    <section id="pricing-section" className="py-20 bg-[#080B11] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold">
            <Gift className="w-3.5 h-3.5 animate-pulse" />
            <span>100% FREE STRATEGY CONSULTATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight">
            Tailored Pricing Discussed in Your Free Meeting
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every new business has distinct goals, technical demands, and timelines. We review your exact vision during your <strong className="text-white">completely free consultation</strong> and deliver a transparent, custom-tailored quote with zero obligation.
          </p>
        </motion.div>

        {/* 100% Free Meeting Hero Showcase Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-b from-slate-900 via-[#0A0F18] to-slate-950 border-2 border-cyan-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="space-y-1">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Zero Cost • Zero Pressure • 100% Clarity</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                How Our Free Consultation Works
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm font-bold flex items-center gap-2 animate-pulse-subtle">
                <Gift className="w-4 h-4" />
                <span>MEETING FEE: $0.00 FREE</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of the Free Meeting */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 transition-colors hover:border-cyan-500/40"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                30-Min Discovery Session
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A live, friendly 1-on-1 strategy call to understand your new business concept, audience, and technical needs.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 transition-colors hover:border-blue-500/40"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Custom Scope Analysis
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We map out the exact pages, design systems, and SEO features required without forcing you to pay for unused fluff.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 transition-colors hover:border-purple-500/40"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Transparent Itemized Quote
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive an exact, milestone-based proposal with guaranteed timelines. Clear pricing with zero hidden fees.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 transition-colors hover:border-emerald-500/40"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold">
                04
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                1-Month Free Maintenance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every project includes 30 days of 100% complimentary post-launch support, security, backups & SEO checks.
              </p>
            </motion.div>

          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>
                No credit card required • No pushy sales tactics • Zero obligation to proceed
              </span>
            </div>

            <motion.button
              onClick={() => onOpenBooking()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Schedule Your 100% Free Meeting</span>
            </motion.button>
          </div>

        </motion.div>

        {/* Why Custom Pricing Works Best for New Businesses */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Explanatory Reasons */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                TRANSPARENCY FIRST
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Why We Discuss Pricing After We Connect
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Generic price tags often cause new businesses to either overpay for services they don’t need or end up with half-baked websites that lack critical SEO and speed infrastructure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Right-Sized for Your Startup Budget</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  Whether you need a lean 5-page conversion site or a full-stack brand architecture with custom API integrations, we tailor the investment to match your financial runway.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Transparent Milestone Payments</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  You only pay based on tangible completed deliverables (Design Approval → Development → QA Launch).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>100% Free 30-Day Launch Care Included</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  We stand by our code. Every tailored proposal includes 1 month of complimentary maintenance so you start your business with total peace of mind.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Needs Checklist & Meeting Prep */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                INTERACTIVE MEETING PREPARATION
              </span>
              <h4 className="text-xl font-bold text-white font-heading mt-1">
                Select Your New Business Priorities
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Click any features below you are interested in discussing during our free call:
              </p>
            </div>

            {/* Selectable checklist pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {commonNeeds.map((need, idx) => {
                const isSelected = selectedNeeds.includes(need);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleNeed(need)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200 shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border text-[10px] transition-all ${
                      isSelected 
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold scale-110' 
                        : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="leading-snug">{need}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Summary Note */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-mono">Selected topics:</span>{' '}
                <strong className="text-white">{selectedNeeds.length} items</strong>
              </div>
              <span className="text-emerald-400 font-mono font-semibold">Ready for Free Review</span>
            </div>

            <motion.button
              onClick={() => onOpenBooking(`Selected Priorities: ${selectedNeeds.join(', ')}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Book Free Consultation with Selected Priorities</span>
            </motion.button>
          </div>

        </div>

        {/* Post-Launch Maintenance Overview (After the 1-Month Free Period) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                POST-LAUNCH CONTINUITY
              </div>
              <h3 className="text-xl font-bold text-white font-heading mt-1">
                Optional Maintenance Retainers (After Your 1st Free Month)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your first 30 days are 100% complimentary. Ongoing retainers are customized to your team's needs with zero lock-in.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              Month-to-Month • Cancel Anytime
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-white">Standard Maintenance</h4>
                  <p className="text-xs text-slate-400">Hosting, daily backups & security</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-slate-300 font-mono">Custom Plan</span>
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>24/7 Uptime & Performance Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Daily Cloud Backups & Emergency Rollback</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Weekly Security & Plugin Patches</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 mb-1">
                    INCLUDED FREE IN MONTH 1
                  </div>
                  <h4 className="text-base font-bold text-white">Premium Maintenance & SEO</h4>
                  <p className="text-xs text-slate-400">Dedicated developer time + continuous SEO</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-cyan-300 font-mono">Tailored Scope</span>
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Everything in Standard + Dedicated Dev Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Monthly Technical SEO Crawl Audits & Fixes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Priority 2-Hour SLA Response Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
