import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, ProcessStep } from '../types';
import { PROCESS_STEPS, AGENCY_INFO } from '../data/agencyData';
import { 
  Compass, 
  FileCheck2, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  Zap, 
  HelpCircle,
  Layers,
  ChevronRight
} from 'lucide-react';

interface ProcessSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const [activeStepId, setActiveStepId] = useState<string>(PROCESS_STEPS[0].id);

  const activeStep = PROCESS_STEPS.find((s) => s.id === activeStepId) || PROCESS_STEPS[0];

  const getStepIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={className} />;
      case 'FileCheck2':
        return <FileCheck2 className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <section id="process-section" className="py-20 bg-[#080B11] relative overflow-hidden">
      
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '7s' }} />
            <span>BRANDIDGE BLUEPRINT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight">
            Our 5-Step Process for New Businesses
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            We’ve eliminated agency ambiguity with a predictable, stress-free path from your first concept to live market launch — starting with a 100% free consultation.
          </p>

          {/* Quick Flow Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-semibold">Discovery</span>
            <span>→</span>
            <span className="text-blue-400 font-semibold">Proposal</span>
            <span>→</span>
            <span className="text-purple-400 font-semibold">Build</span>
            <span>→</span>
            <span className="text-emerald-400 font-semibold">Launch</span>
            <span>→</span>
            <span className="text-teal-300 font-bold bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-500/30 animate-pulse">
              1-Month Free Maintenance
            </span>
          </div>
        </motion.div>

        {/* Step Navigation Bar / Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PROCESS_STEPS.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <motion.button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-500/40'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP {step.stepNumber}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-transform duration-300 ${isActive ? 'bg-cyan-500/20 text-cyan-400 scale-110' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                    {getStepIcon(step.iconName, "w-4 h-4")}
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm font-bold font-heading ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    {step.duration}
                  </div>
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="activeStepIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" 
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Card with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            
            {/* Subtle Grid Accent */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Stage Overview & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    STAGE {activeStep.stepNumber} OF 05
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    <Clock className="w-3 h-3 inline mr-1 text-slate-400" />
                    {activeStep.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                    {activeStep.highlightBadge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                    {activeStep.title}
                  </h3>
                  <p className="text-sm text-cyan-300/90 font-medium mt-1">
                    {activeStep.subtitle}
                  </p>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Milestone Quote Box */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 italic border-l-4 border-l-cyan-500">
                  "{activeStep.milestoneQuote}"
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Stage Deliverables & Verification:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.deliverables.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Key Outputs Card & Call to Action */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-slate-400 uppercase">Key Stage Metrics</span>
                    <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    {activeStep.keyOutputs.map((output, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/60 text-xs">
                        <span className="text-slate-400">{output.label}:</span>
                        <span className="font-mono font-bold text-white text-right">{output.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Step Contextual CTA */}
                  <div className="pt-2">
                    {activeStep.id === 'step-1-discovery' ? (
                      <motion.button
                        onClick={onOpenBooking}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule 100% Free Meeting</span>
                      </motion.button>
                    ) : activeStep.id === 'step-2-proposal' ? (
                      <motion.button
                        onClick={() => onNavigate('pricing')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Learn How We Scope Pricing</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={onOpenBooking}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                      >
                        <span>Start with Step 1 (Free Discovery)</span>
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Free Maintenance Guarantee Callout */}
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Zero-Risk Guarantee for New Businesses</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Our 5th step guarantees 1 Month of full-coverage complimentary maintenance with daily backups, performance audits, and priority developer support.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Bottom Banner: Ready to Kick Off */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center space-y-6"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Ready to Begin Step 1 with Zero Risk?
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your new business vision, website requirements, and growth strategy in a 30-minute discovery session. 100% free, no sales pressure, zero commitments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your 100% Free Meeting</span>
            </motion.button>
            <motion.button
              onClick={() => onNavigate('pricing')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              How Pricing is Handled
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
