import React from 'react';
import { X, ShieldCheck, FileText, Lock, Globe2 } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookies' | 'sitemap' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#090D15] border border-cyan-500/30 p-6 sm:p-8 space-y-6 text-slate-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <Lock className="w-4 h-4" />
              <span>LEGAL DIRECTIVE: PRIVACY POLICY</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Data Privacy & Client Confidentiality</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              At Brandidge, confidentiality and data isolation are fundamental principles of our digital engineering practice. We never sell or distribute client data, analytics telemetry, or technical briefs to third parties.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">1. Data Collected During Consultations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contact information submitted through our Free Strategy Consultation form is strictly utilized for scheduling, drafting architectural specifications, and client onboarding.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">2. GDPR & International Compliance</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All infrastructure provisioned by Brandidge adheres to strict GDPR, CCPA, and ISO-27001 data processing requirements.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <FileText className="w-4 h-4" />
              <span>LEGAL DIRECTIVE: TERMS OF SERVICE</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Service Level Agreement & Warranties</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              All web architectures, custom design systems, and SEO implementations delivered by Brandidge are provided under full intellectual property assignment to the client upon project settlement.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">1. 1-Month Free Maintenance Terms</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The complimentary 30-day maintenance program initiates upon the day of official production DNS handover. Clients may cancel or adjust tiers at any time without penalty.
            </p>
            <h4 className="text-sm font-bold text-white pt-2">2. Performance & Speed Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Brandidge guarantees top-tier Core Web Vitals and sub-second load speeds under standard edge network conditions.
            </p>
          </div>
        )}

        {type === 'cookies' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>COOKIE DIRECTIVE</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Minimal Telemetry & Cookies</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              We employ zero third-party tracking pixels or intrusive marketing beacons. We only use functional session cookies to preserve user preferences and ensure smooth navigation across the application.
            </p>
          </div>
        )}

        {type === 'sitemap' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <Globe2 className="w-4 h-4" />
              <span>SYSTEM SITEMAP & ARCHITECTURE INDEX</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Brandidge Index Hierarchy</h2>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-cyan-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-white font-bold">Main Views:</div>
                <div>/ - Home (Hero & Metrics)</div>
                <div>/services - Digital Capabilities</div>
                <div>/process - Our 5-Step Process</div>
                <div>/pricing - Free Consultation & Pricing Model</div>
                <div>/about - Studio & FAQs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-white font-bold">Operations:</div>
                <div>/book - Free Consultation Scheduler</div>
                <div>/contact - Direct Inquiries</div>
                <div>/admin - Agency CRM Portal</div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
