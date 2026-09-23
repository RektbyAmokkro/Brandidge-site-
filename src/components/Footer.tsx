import React, { useState } from 'react';
import { ViewType } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ArrowUpRight, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Gift
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies' | 'sitemap') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenLegal
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#05070C] border-t border-slate-800/80 text-slate-400 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-900/10 blur-[100px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/70">
          
          {/* Column 1: Brand & Engineering Mission (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo 
              size="lg" 
              showTagline={true} 
              onClick={() => onNavigate('home')} 
            />
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Brandidge — bridging brands to growth. We engineer high-speed, SEO-optimized web systems that convert visitors and provide a seamless 5-step path to market launch.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Launch Readiness: 100%</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>1-Mo Free Care</span>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Web Design & Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Technical SEO Architecture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Core Web Vitals Speed Tuning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Logo & Brand Identity
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-cyan-400 transition-colors text-left text-cyan-400/90 font-medium"
                >
                  1-Month Free Maintenance →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: 5-Step Process & Agency */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Brandidge
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('process')}
                  className="hover:text-cyan-400 transition-colors text-left text-cyan-300 font-medium"
                >
                  Our 5-Step Process
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Pricing & Free Consultation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About & Philosophy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Direct Booking */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              New Business Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Actionable guides on conversion design, modern SEO algorithms, and new business scaling.
            </p>
            
            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed to Brandidge Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@newbusiness.com"
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Subscribe to Newsletter</span>
                </button>
              </form>
            )}

            <div className="pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Gift className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book 100% Free Meeting</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Legal Links and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Brandidge. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button 
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button 
              onClick={() => onOpenLegal('sitemap')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Site Index
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
