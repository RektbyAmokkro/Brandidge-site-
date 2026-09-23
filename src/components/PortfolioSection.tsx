import React, { useState } from 'react';
import { ViewType, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  Activity, 
  Layers, 
  X, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  ShieldCheck,
  CalendarCheck2
} from 'lucide-react';

interface PortfolioSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: (projectContext?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioProject | null>(null);

  const categories = ['All', 'Fintech', 'Logistics', 'E-Commerce', 'SaaS'];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <section id="portfolio-section" className="py-20 bg-[#080B11] relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Activity className="w-3.5 h-3.5" />
              <span>PROVEN RESULTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              Engineered Outcomes.
            </h2>

            <p className="text-base text-slate-400">
              Explore how our high-performance architectures solve mission-critical speed, conversion, and ranking challenges.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-portfolio-${cat.toLowerCase()}`}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              onClick={() => setActiveCaseStudy(project)}
              className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              {/* Project Image Frame */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="lazy"
                />
                
                {/* Category & Status Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-950/80 border border-slate-700 text-slate-200 backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                    LIVE SYSTEM
                  </span>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 group-hover:text-cyan-400 group-hover:bg-slate-900 group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Project Info & Metrics Box */}
              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <div className="text-xs text-cyan-400 font-mono font-semibold tracking-wider uppercase mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Real Metrics Ticker */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-lg font-bold font-mono text-emerald-400">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Case Study Modal / Deep Dive */}
        {activeCaseStudy && (
          <div 
            id="case-study-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setActiveCaseStudy(null)}
          >
            <div 
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0F19] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl shadow-cyan-950/80 space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Case Study Top Details */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                  <span>CASE STUDY DEEP DIVE</span>
                  <span>•</span>
                  <span>{activeCaseStudy.category}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                  {activeCaseStudy.title}
                </h3>
                
                <p className="text-base text-slate-300 mt-3 leading-relaxed">
                  {activeCaseStudy.description}
                </p>
              </div>

              {/* Modal Image */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-800 bg-slate-950">
                <img
                  src={activeCaseStudy.imageUrl}
                  alt={activeCaseStudy.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Key Measured Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeCaseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/20">
                    <div className="text-2xl font-bold font-mono text-cyan-300">{m.value}</div>
                    <div className="text-xs text-slate-300 font-medium mt-1">{m.label}</div>
                    {m.trend && <div className="text-[11px] text-slate-500 font-mono mt-0.5">{m.trend}</div>}
                  </div>
                ))}
              </div>

              {/* Problem & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2 text-rose-400">
                    The Architectural Challenge
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-2 text-emerald-400">
                    Our Engineered Solution
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeCaseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                  Key Technical Highlights:
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeCaseStudy.architecturalHighlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Ready to engineer similar performance for your business?
                </div>

                <button
                  onClick={() => {
                    const ctx = `Project Inquiry based on ${activeCaseStudy.title}`;
                    setActiveCaseStudy(null);
                    onOpenBooking(ctx);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CalendarCheck2 className="w-4 h-4" />
                  <span>Schedule Consultation for This Architecture</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
