import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, FaqItem } from '../types';
import { AGENCY_INFO, FAQS_DATA } from '../data/agencyData';
import { 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight, 
  Search,
  CheckCircle2,
  CalendarCheck2,
  Gift
} from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('free-meeting');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');

  const faqCategories = ['All', 'Process', 'Pricing', 'Technical', 'Maintenance'];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCat = selectedFaqCategory === 'All' || faq.category === selectedFaqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="about-section" className="py-20 bg-[#080B11] relative">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Main About Hero & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Pillars (Col 7) */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE BRANDIDGE MISSION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              A Place Where New Businesses Begin.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Brandidge was founded with one clear purpose: to empower founders and new businesses with high-converting web architecture, lightning speed, and structured SEO right out of the gate.
            </p>

            <div className="space-y-4 pt-2">
              <motion.div 
                whileHover={{ x: 4 }}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 transition-all duration-300 hover:border-cyan-500/40"
              >
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mt-1 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">1. Predictable 5-Step Process</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Discovery → Proposal → Build → Launch → 1 Month Free Maintenance. No unexpected roadblocks or vague agency timelines.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 transition-all duration-300 hover:border-emerald-500/40"
              >
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mt-1 flex-shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">2. Sub-Second Speed & Zero Bloat</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    We deliver sub-0.8s Largest Contentful Paint and optimized Core Web Vitals, ensuring maximum visitor conversions from day one.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 transition-all duration-300 hover:border-teal-500/40"
              >
                <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 mt-1 flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">3. Semantic SEO & 1-Month Free Care</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Every project includes complete JSON-LD structured schemas, Google indexation, and 30 days of 100% complimentary post-launch maintenance.
                  </p>
                </div>
              </motion.div>
            </div>

          </motion.div>

          {/* Right: High Quality Tech & Studio Image (Col 5) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 to-slate-800 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 group">
              <div className="rounded-[14px] overflow-hidden aspect-[4/3] bg-slate-950 relative">
                <img
                  src={AGENCY_INFO.aboutImage}
                  alt="Brandidge Creative & Development Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-4 bg-slate-950/90 rounded-b-[14px] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Brandidge Studio
                </span>
                <span className="text-cyan-400">Global Launch Operations</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Knowledge Base & Interactive FAQ Accordion */}
        <div id="faq-section" className="pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '7s' }} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Knowledge Base & Free Consultation Details
            </h3>

            <p className="text-sm text-slate-400">
              Answers regarding our 100% free discovery meeting, custom pricing structure, and the complimentary 1-month maintenance guarantee.
            </p>
          </motion.div>

          {/* FAQ Search & Category Filters */}
          <div className="max-w-3xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions about free meeting, pricing, timeline, SEO..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedFaqCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-xl bg-slate-900/80 border transition-colors duration-200 overflow-hidden ${isOpen ? 'border-cyan-500/40 shadow-lg shadow-cyan-950/20' : 'border-slate-800 hover:border-slate-700'}`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-sm sm:text-base font-bold font-heading transition-colors ${isOpen ? 'text-cyan-300' : 'text-white'}`}>
                      {faq.question}
                    </span>
                    <div className={`p-1 rounded flex-shrink-0 transition-colors ${isOpen ? 'bg-cyan-950 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Consultation Prompt */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-slate-400 mb-4">
              Ready to discuss your new business and receive a custom roadmap?
            </p>
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all cursor-pointer"
            >
              <Gift className="w-4 h-4 text-emerald-300" />
              <span>Book Your 100% Free Meeting</span>
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
