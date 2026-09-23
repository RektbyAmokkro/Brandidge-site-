import React from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';
import { AGENCY_INFO } from '../data/agencyData';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Terminal,
  Activity,
  Award,
  Cpu,
  CalendarCheck2,
  Gift
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Radial Glow Overlays with Motion Pulse */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[480px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Headline & 3D Architectural Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (Col 7) */}
          <motion.div 
            className="lg:col-span-7 space-y-6 sm:space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Brand Origin & Special Offer Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/85 border border-cyan-500/40 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-cyan-950/50 hover:border-cyan-400 transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>100% Free Strategy Meeting + 1 Month Free Maintenance</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-3">
              <motion.div 
                variants={itemVariants}
                className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase flex items-center gap-2"
              >
                <span className="w-2 h-0.5 bg-cyan-400 rounded-full inline-block" />
                <span>A PLACE WHERE NEW BUSINESSES BEGIN</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading leading-tight"
              >
                High-Converting Websites Engineered for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                  New Businesses
                </span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
              >
                {AGENCY_INFO.subtitle} We guide your venture step-by-step from Discovery to Launch with zero guesswork and transparent pricing discussed in your free consultation.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <motion.button
                id="hero-book-consultation-btn"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-size-200 hover:bg-right text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/45 transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Book 100% Free Meeting</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>

              <motion.button
                id="hero-view-process-btn"
                onClick={() => onNavigate('process')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm shadow-md"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explore 5-Step Process</span>
              </motion.button>
            </motion.div>

            {/* Micro Trust Proof Metrics */}
            <motion.div 
              variants={itemVariants}
              className="pt-5 border-t border-slate-800/80 grid grid-cols-3 gap-4"
            >
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold text-lg sm:text-xl">
                  <span>99.9%</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">Uptime Reliability</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-1 text-cyan-400 font-mono font-bold text-lg sm:text-xl">
                  <span>&lt;0.6s</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">Page Load Speed</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-1 text-teal-300 font-mono font-bold text-lg sm:text-xl">
                  <span>100%</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">Free Consultation</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Architectural Visual (Col 5) with Motion entrance */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            
            {/* Glowing Backdrop Frame */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/50 to-slate-900/80 shadow-2xl shadow-cyan-950/60 border border-cyan-500/20 group">
              
              <div className="relative rounded-[14px] overflow-hidden bg-[#0A0E17]">
                
                {/* Visual Window Bar */}
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="text-[11px] text-slate-500 ml-2">brandidge-architecture.wireframe</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400 font-mono">
                    <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                    <span className="text-[10px]">LIVE RENDER</span>
                  </div>
                </div>

                {/* Hotlinked 3D Wireframe Image */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={AGENCY_INFO.heroImage}
                    alt="Brandidge Digital Architecture Visual"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-110"
                    loading="eager"
                  />
                  {/* Subtle technical grid overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Metric Badge: Core Web Vitals with subtle motion float */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md shadow-lg flex items-center justify-between animate-float-slow">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                      <Zap className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Sub-Second Execution</div>
                      <div className="text-[11px] text-slate-400 font-mono">LCP 0.42s • FID 2ms • CLS 0.00</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                    GRADE A+
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Trust Indicator Pill with reverse float */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/40 shadow-xl backdrop-blur-md text-xs animate-float-reverse">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-200 font-medium">Brandidge Engineering SLA</span>
            </div>

          </motion.div>

        </div>

        {/* Live Systems Trust Ticker & Badges */}
        <motion.div 
          className="mt-14 pt-8 border-t border-slate-800/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest mb-5">
            Engineered for high performance and new business scalability
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            <motion.div whileHover={{ scale: 1.08 }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 font-mono text-xs sm:text-sm font-semibold hover:border-cyan-500/40 transition-colors">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>React 19 / TypeScript</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 font-mono text-xs sm:text-sm font-semibold hover:border-amber-500/40 transition-colors">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Sub-Second Edge CDN</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 font-mono text-xs sm:text-sm font-semibold hover:border-emerald-500/40 transition-colors">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>JSON-LD Semantic SEO</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-300 font-mono text-xs sm:text-sm font-semibold hover:border-blue-500/40 transition-colors">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>1-Month Free Maintenance</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
