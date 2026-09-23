import React from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';
import { SERVICES_DATA } from '../data/agencyData';
import { 
  Code2, 
  SearchCheck, 
  Zap, 
  Palette, 
  ArrowRight, 
  Check, 
  Clock, 
  Layers,
  Sparkles,
  CalendarCheck2,
  ShieldCheck,
  Gift
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'SearchCheck':
        return <SearchCheck className="w-6 h-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-teal-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="services-section" className="py-20 bg-[#080B11] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>ENGINEERING SPECIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Engineering Digital Excellence
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            We build architectural-grade digital experiences. From custom front-end architecture to deep programmatic SEO, every component is engineered for conversion and speed with tailored pricing discussed during your free consultation.
          </p>
        </motion.div>

        {/* Bento Grid: 4 Core Services with Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`${service.colSpan || 'col-span-1'} relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-8 transition-colors duration-300 group hover:shadow-2xl hover:shadow-cyan-950/50 flex flex-col justify-between`}
            >
              {/* Card Top Row */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {service.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables List */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Architectural Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom Row: Specs & CTA */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{service.timeline}</span>
                  </div>
                  <div className="text-slate-600">•</div>
                  <div className="text-cyan-300 font-semibold flex items-center gap-1">
                    <Gift className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>Tailored in Free Call</span>
                  </div>
                </div>

                <motion.button
                  id={`book-service-${service.id}-btn`}
                  onClick={() => onOpenBooking(service.title)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold text-xs border border-cyan-500/30 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn shadow-sm"
                >
                  <span>Book Free Call</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Free Consultation Call-Out Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0C121D] to-slate-900 border border-cyan-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-cyan-950/20"
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>BESPOKE TECHNICAL ROADMAP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Need a tailored architecture for your new business?
            </h3>
            <p className="text-xs text-slate-400">
              We discuss your exact features, requirements, and budget on a 30-minute free call with zero commitment.
            </p>
          </div>

          <motion.button
            onClick={() => onOpenBooking()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>Schedule Free Consultation</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
