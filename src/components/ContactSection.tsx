import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewType, LeadSubmission } from '../types';
import { AGENCY_INFO } from '../data/agencyData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  CalendarCheck2,
  Clock,
  Building,
  User,
  Globe2,
  Gift
} from 'lucide-react';

interface ContactSectionProps {
  onNavigate: (view: ViewType) => void;
  onOpenBooking: () => void;
  onNewLead: (lead: LeadSubmission) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigate,
  onOpenBooking,
  onNewLead
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    message: '',
    gdprConsent: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.email && contactForm.name) {
      const newLead: LeadSubmission = {
        id: `msg-${Date.now()}`,
        fullName: contactForm.name,
        email: contactForm.email,
        company: contactForm.company || 'New Business Founder',
        phone: contactForm.phone,
        websiteUrl: contactForm.website,
        serviceInterest: 'Direct Inquiry / Contact Form',
        budgetRange: 'Discuss in Free Meeting',
        timeline: 'As soon as possible',
        primaryGoal: 'Free Consultation & Custom Quote',
        projectBrief: contactForm.message,
        status: 'new',
        submittedAt: new Date().toISOString()
      };

      onNewLead(newLead);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setContactForm({
          name: '',
          email: '',
          company: '',
          phone: '',
          website: '',
          message: '',
          gdprConsent: true
        });
      }, 6000);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-[#080B11] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-900/10 rounded-full blur-[130px] pointer-events-none" />

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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight">
            Let's Launch Your New Business
          </h2>

          <p className="text-base text-slate-300">
            Have a new business concept, need a high-converting web presence, or want to discuss tailored pricing? Reach out directly or book a free 30-min strategy call.
          </p>
        </motion.div>

        {/* Main Grid: Form & Studio Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form (Col 7) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl"
          >
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Message Dispatched</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to Brandidge. A digital strategist will review your concept and reply within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" /> Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="founder@newbusiness.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" /> Business Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      placeholder="NextGen Venture"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Website (if existing)
                    </label>
                    <input
                      type="url"
                      value={contactForm.website}
                      onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
                      placeholder="https://yournewsite.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Project Vision or Questions *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you are building, your target launch date, or any specific questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={contactForm.gdprConsent}
                    onChange={(e) => setContactForm({ ...contactForm, gdprConsent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>
                    I consent to Brandidge contacting me regarding this project inquiry. 100% confidential.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </motion.button>
              </form>
            )}

          </motion.div>

          {/* Right: Direct Studio Info & Free Meeting Card (Col 5) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-heading">
                Direct Contact Points
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">Direct Founder & Support Email:</div>
                    <a href={`mailto:${AGENCY_INFO.supportEmail}`} className="text-white font-mono hover:text-cyan-400">
                      {AGENCY_INFO.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">Direct Consultation Line:</div>
                    <div className="text-white font-mono">{AGENCY_INFO.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">Brandidge HQ:</div>
                    <div className="text-white">{AGENCY_INFO.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">Response SLA:</div>
                    <div className="text-emerald-300 font-semibold">&lt; 4 Hours during Business Hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Booking Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <Gift className="w-4 h-4" />
                <span>100% FREE STRATEGY CONSULTATION</span>
              </div>

              <h4 className="text-lg font-bold text-white font-heading">
                Prefer an Instant Live Call?
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Skip the back-and-forth email exchange and lock in your 30-minute free discovery meeting on our live calendar.
              </p>

              <motion.button
                onClick={onOpenBooking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Schedule 100% Free Meeting</span>
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
