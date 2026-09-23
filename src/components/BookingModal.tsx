import React, { useState, useMemo } from 'react';
import { LeadSubmission } from '../types';
import { 
  X, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Globe2, 
  Building, 
  Mail, 
  User, 
  Phone,
  Gift,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  Video,
  Check
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  onBookingComplete: (lead: LeadSubmission) => void;
}

// Popular timezones list
const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET) - New York / Toronto', group: 'US & Americas' },
  { value: 'America/Chicago', label: 'Central Time (CT) - Chicago / Dallas', group: 'US & Americas' },
  { value: 'America/Denver', label: 'Mountain Time (MT) - Denver / Phoenix', group: 'US & Americas' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT) - Los Angeles / SF', group: 'US & Americas' },
  { value: 'Europe/London', label: 'London Time (GMT / BST) - UK & Ireland', group: 'Europe & Africa' },
  { value: 'Europe/Paris', label: 'Central European Time (CET) - Paris / Berlin / Amsterdam', group: 'Europe & Africa' },
  { value: 'Europe/Athens', label: 'Eastern European Time (EET) - Athens / Helsinki', group: 'Europe & Africa' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST) - Dubai / Abu Dhabi', group: 'Asia & Pacific' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST) - New Delhi / Mumbai', group: 'Asia & Pacific' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT) - Singapore / HK', group: 'Asia & Pacific' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST) - Tokyo', group: 'Asia & Pacific' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST) - Sydney / Melbourne', group: 'Asia & Pacific' },
  { value: 'UTC', label: 'Universal Time Coordinated (UTC)', group: 'International' },
];

// Booking steps configuration for visual progress stepper
const BOOKING_STEPS = [
  {
    id: 1,
    number: '01',
    title: 'Contact Details',
    shortTitle: 'Contact',
    subtitle: 'Name & Business',
    icon: User,
  },
  {
    id: 2,
    number: '02',
    title: 'Scope & Goals',
    shortTitle: 'Scope',
    subtitle: 'Service & Budget',
    icon: Sparkles,
  },
  {
    id: 3,
    number: '03',
    title: 'Schedule Call',
    shortTitle: 'Schedule',
    subtitle: 'Date & Time Slot',
    icon: CalendarIcon,
  },
];

// All slots strictly between 09:00 and 20:00
const WORKING_HOUR_SLOTS = [
  // Morning (09:00 - 11:30)
  { time24: '09:00', label: '09:00 AM', period: 'morning' },
  { time24: '09:30', label: '09:30 AM', period: 'morning' },
  { time24: '10:00', label: '10:00 AM', period: 'morning' },
  { time24: '10:30', label: '10:30 AM', period: 'morning' },
  { time24: '11:00', label: '11:00 AM', period: 'morning' },
  { time24: '11:30', label: '11:30 AM', period: 'morning' },
  // Afternoon (12:00 - 16:30)
  { time24: '12:00', label: '12:00 PM', period: 'afternoon' },
  { time24: '12:30', label: '12:30 PM', period: 'afternoon' },
  { time24: '13:00', label: '01:00 PM', period: 'afternoon' },
  { time24: '13:30', label: '01:30 PM', period: 'afternoon' },
  { time24: '14:00', label: '02:00 PM', period: 'afternoon' },
  { time24: '14:30', label: '02:30 PM', period: 'afternoon' },
  { time24: '15:00', label: '03:00 PM', period: 'afternoon' },
  { time24: '15:30', label: '03:30 PM', period: 'afternoon' },
  { time24: '16:00', label: '04:00 PM', period: 'afternoon' },
  { time24: '16:30', label: '04:30 PM', period: 'afternoon' },
  // Evening (17:00 - 20:00)
  { time24: '17:00', label: '05:00 PM', period: 'evening' },
  { time24: '17:30', label: '05:30 PM', period: 'evening' },
  { time24: '18:00', label: '06:00 PM', period: 'evening' },
  { time24: '18:30', label: '06:30 PM', period: 'evening' },
  { time24: '19:00', label: '07:00 PM', period: 'evening' },
  { time24: '19:30', label: '07:30 PM', period: 'evening' },
  { time24: '20:00', label: '08:00 PM', period: 'evening' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  onBookingComplete
}) => {
  // Detect local timezone
  const defaultTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles';
    } catch {
      return 'America/Los_Angeles';
    }
  }, []);

  // Set default initial date to tomorrow or next weekday
  const initialDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(defaultTz);
  const [activePeriodFilter, setActivePeriodFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');

  // Calendar month state
  const [currentCalendarDate, setCurrentCalendarDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    websiteUrl: '',
    serviceInterest: initialService || 'New Business Digital Launch',
    budgetRange: 'Discuss in Free Meeting',
    timeline: 'Within 4 weeks',
    primaryGoal: 'Build high-converting website and discuss tailored pricing in free meeting',
    projectBrief: '',
    selectedDate: initialDateStr,
    selectedTimeSlot: '10:00 AM (10:00)'
  });

  if (!isOpen) return null;

  // Calendar generator helpers
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const monthName = currentCalendarDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Starting day index (0 = Sun, 1 = Mon ... adjust to Mon start)
  const firstDayIndexRaw = new Date(year, month, 1).getDay();
  // 0 (Sun) becomes 6, 1 (Mon) becomes 0
  const firstDayOffset = firstDayIndexRaw === 0 ? 6 : firstDayIndexRaw - 1;

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= thisMonthStart) {
      setCurrentCalendarDate(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };

  const isPrevMonthDisabled = () => {
    const prev = new Date(year, month - 1, 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return prev < thisMonthStart;
  };

  const formatDateDisplay = (dateString: string) => {
    try {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dateString;
    } catch {
      return dateString;
    }
  };

  const setQuickDateOffset = (daysAhead: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    const dateStr = target.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, selectedDate: dateStr }));
    setCurrentCalendarDate(new Date(target.getFullYear(), target.getMonth(), 1));
  };

  const filteredSlots = WORKING_HOUR_SLOTS.filter(slot => {
    if (activePeriodFilter === 'all') return true;
    return slot.period === activePeriodFilter;
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3);
    } else if (step === 3) {
      // Final submission
      const newLead: LeadSubmission = {
        id: `lead-${Date.now()}`,
        fullName: formData.fullName || 'New Business Founder',
        email: formData.email,
        company: formData.company || 'New Venture',
        phone: formData.phone,
        websiteUrl: formData.websiteUrl,
        serviceInterest: formData.serviceInterest,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        primaryGoal: formData.primaryGoal,
        projectBrief: formData.projectBrief,
        selectedDate: formData.selectedDate,
        selectedTimeSlot: `${formData.selectedTimeSlot} (${selectedTimezone.split('/').pop()?.replace('_', ' ') || selectedTimezone})`,
        timezone: selectedTimezone,
        status: 'scheduled',
        meetingStatus: 'upcoming',
        meetingLink: 'https://meet.google.com/bnd-strat-live',
        submittedAt: new Date().toISOString()
      };

      onBookingComplete(newLead);
      setStep(4);
    }
  };

  return (
    <div 
      id="strategy-booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-[#080C14] border border-cyan-500/30 p-5 sm:p-8 shadow-2xl shadow-cyan-950/90 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Cleanly Separated Close Button */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wide text-emerald-400 flex items-center gap-1.5">
                <span>100% FREE STRATEGY CONSULTATION</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-sans font-semibold">
                  $0.00
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                30-min strategy call with our lead technical architect • No commitment
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer shadow-sm"
              aria-label="Close modal"
              title="Close window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visual Progress Stepper Bar */}
        {step <= 3 && (
          <div className="py-4 border-b border-slate-800/80 mb-2">
            {/* Top Stepper Meta Row: Current Step & Remaining Steps Status Badge */}
            <div className="flex items-center justify-between text-xs mb-3.5">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sky-400 tracking-wider uppercase text-[11px] bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  STEP {step} OF 3
                </span>
                <span className="text-slate-300 font-semibold hidden sm:inline text-xs">
                  {BOOKING_STEPS.find(s => s.id === step)?.title}
                </span>
              </div>

              {/* Explicit remaining steps pill counter */}
              <div className="flex items-center gap-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                  3 - step === 0
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                    : 3 - step === 1
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    3 - step === 0 ? 'bg-emerald-400' : 3 - step === 1 ? 'bg-amber-400' : 'bg-sky-400 animate-pulse'
                  }`} />
                  {3 - step === 0
                    ? 'Final step to complete'
                    : `${3 - step} step${3 - step > 1 ? 's' : ''} remaining`}
                </span>
              </div>
            </div>

            {/* Interactive Connected Step Nodes */}
            <div className="relative flex items-center justify-between px-2 sm:px-6">
              {/* Background Track Line */}
              <div className="absolute left-8 right-8 top-5 h-1 bg-slate-800 rounded-full z-0 pointer-events-none">
                {/* Active Progress Fill Line */}
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                  style={{
                    width: step === 1 ? '0%' : step === 2 ? '50%' : '100%'
                  }}
                />
              </div>

              {/* Step Nodes */}
              {BOOKING_STEPS.map((s) => {
                const isCompleted = step > s.id;
                const isCurrent = step === s.id;
                const isClickable = s.id < step;

                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && setStep(s.id as 1 | 2 | 3)}
                    className={`relative z-10 flex flex-col items-center group transition-all select-none ${
                      isClickable ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    {/* Node Circle */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_14px_rgba(16,185,129,0.4)] scale-100 group-hover:scale-110'
                        : isCurrent
                        ? 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-slate-950 font-black shadow-[0_0_18px_rgba(56,189,248,0.5)] ring-4 ring-sky-500/25 scale-105'
                        : 'bg-slate-900 border border-slate-700 text-slate-500'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <span className={`text-xs font-mono font-black ${isCurrent ? 'text-slate-950' : 'text-slate-400'}`}>
                          {s.number}
                        </span>
                      )}
                    </div>

                    {/* Step Label Beneath */}
                    <div className="text-center mt-2">
                      <div className={`text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'text-sky-300'
                          : isCompleted
                          ? 'text-slate-200 group-hover:text-sky-300'
                          : 'text-slate-500'
                      }`}>
                        <span className="hidden sm:inline">{s.title}</span>
                        <span className="sm:hidden">{s.shortTitle}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 hidden sm:block">
                        {isCompleted ? '✓ Completed' : s.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Step Content */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6 pt-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Step 1: Contact & Business Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tell us about yourself so we can review your brand before the session.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" /> Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="founder@yourcompany.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" /> Business Name / Concept *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Nexus Dynamics"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Current Website URL (if any)
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://yourcurrentsite.com (leave blank if launching new)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Scope & Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-6 pt-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Step 2: Project Scope & Launch Goals
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Help us prepare customized architectural options and tailored pricing for your call.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Primary Service Focus
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="New Business Digital Launch">New Business Complete Launch (Web + SEO + Branding)</option>
                  <option value="Custom High-Converting Web Design">Custom High-Converting Web Design & UX</option>
                  <option value="Technical SEO & Performance Architecture">Technical SEO & Sub-Second Speed Architecture</option>
                  <option value="Brand Identity & Design System">Logo, Visual Identity & Complete Design System</option>
                  <option value="Custom Web Application / Portal">Custom Web Application / Client Portal</option>
                  <option value="Discuss Custom Scope in Meeting">Other / Discuss in Free Call</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Anticipated Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Discuss in Free Meeting">Discuss in Free Meeting (Tailored)</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000 (Lean Launch)</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000 (Growth Partner)</option>
                    <option value="$10,000+">$10,000+ (Scale Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">
                    Target Launch Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Within 2-3 weeks">Within 2-3 weeks (Expedited)</option>
                    <option value="Within 4 weeks">Within 4 weeks (Standard Sprint)</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="Exploring for future launch">Exploring for future launch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">
                  Brief Project Vision or Specific Needs
                </label>
                <textarea
                  rows={3}
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  placeholder="Tell us what your business does, key features needed (e.g. online booking, payment flow, portfolio), or challenges with your current presence..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Select Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNext} className="space-y-5 pt-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Step 3: Schedule Your Free Strategy Call
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Select your preferred date, timezone, and working-hour slot (09:00 - 20:00).
              </p>
            </div>

            {/* Timezone Selector Row */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Your Timezone</div>
                  <div className="text-[11px] text-slate-400">All slots adjust automatically</div>
                </div>
              </div>

              <div className="flex-1 sm:max-w-xs">
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {TIMEZONE_OPTIONS.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calendar & Time Slots 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Interactive Date Picker Calendar (7 cols) */}
              <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                {/* Calendar Header with Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-white font-heading">
                      {monthName} {year}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled()}
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
                      title="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday Labels (Mon to Sun) */}
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-mono text-slate-500 font-semibold border-b border-slate-850 pb-1.5">
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span className="text-cyan-400/60">Sa</span>
                  <span className="text-cyan-400/60">Su</span>
                </div>

                {/* Day Numbers Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty cells for offset */}
                  {Array.from({ length: firstDayOffset }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-8 sm:h-9" />
                  ))}

                  {/* Days in Month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateObj = new Date(year, month, dayNum);
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    const isPast = dateObj < today;
                    const isSelected = formData.selectedDate === dateStr;
                    const isToday = dateObj.toDateString() === today.toDateString();

                    return (
                      <button
                        key={`day-${dayNum}`}
                        type="button"
                        disabled={isPast}
                        onClick={() => setFormData({ ...formData, selectedDate: dateStr })}
                        className={`h-8 sm:h-9 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center relative cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/30 scale-105 z-10'
                            : isPast
                            ? 'text-slate-700 opacity-40 cursor-not-allowed'
                            : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-850'
                        } ${isToday && !isSelected ? 'ring-1 ring-cyan-400/50' : ''}`}
                      >
                        <span>{dayNum}</span>
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Date Presets */}
                <div className="pt-2 border-t border-slate-900 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Quick:</span>
                  <button
                    type="button"
                    onClick={() => setQuickDateOffset(1)}
                    className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 cursor-pointer"
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDateOffset(2)}
                    className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 cursor-pointer"
                  >
                    In 2 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDateOffset(5)}
                    className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 cursor-pointer"
                  >
                    Next Week
                  </button>
                </div>

                {/* Selected Date Summary Display */}
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs flex items-center justify-between">
                  <span className="text-slate-400">Chosen Date:</span>
                  <span className="font-bold text-cyan-300 font-mono">
                    {formatDateDisplay(formData.selectedDate)}
                  </span>
                </div>
              </div>

              {/* Right Column: Working Hours Time Slots (09:00 - 20:00) (5 cols) */}
              <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Working Hours (09:00 - 20:00)</span>
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      30 Min
                    </span>
                  </div>

                  {/* Period Filter Tabs */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-xl mb-3 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setActivePeriodFilter('all')}
                      className={`py-1 rounded-lg transition-all cursor-pointer ${
                        activePeriodFilter === 'all'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePeriodFilter('morning')}
                      className={`py-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        activePeriodFilter === 'morning'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Sun className="w-2.5 h-2.5" /> AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePeriodFilter('afternoon')}
                      className={`py-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        activePeriodFilter === 'afternoon'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Sunset className="w-2.5 h-2.5" /> PM
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePeriodFilter('evening')}
                      className={`py-1 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        activePeriodFilter === 'evening'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Moon className="w-2.5 h-2.5" /> Eve
                    </button>
                  </div>

                  {/* Scrollable Slots Grid */}
                  <div className="max-h-[220px] overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-1.5">
                      {filteredSlots.map((slot) => {
                        const slotFormatted = `${slot.label} (${slot.time24})`;
                        const isSelected = formData.selectedTimeSlot === slotFormatted;

                        return (
                          <button
                            key={slot.time24}
                            type="button"
                            onClick={() => setFormData({ ...formData, selectedTimeSlot: slotFormatted })}
                            className={`py-2 px-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer border ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/25'
                                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            <span>{slot.label}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-slate-900/80 font-bold' : 'text-slate-500'}`}>
                              {slot.time24}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Slot Recap */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] flex items-center justify-between">
                  <span className="text-slate-400">Chosen Time:</span>
                  <span className="font-bold text-cyan-300 font-mono">
                    {formData.selectedTimeSlot}
                  </span>
                </div>
              </div>
            </div>

            {/* Free Meeting Perks Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-emerald-950/70 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-cyan-200">
                  <strong>100% Free Strategy Session ($0.00)</strong> • Instant Google Meet link & calendar invitation included.
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold text-[11px] whitespace-nowrap">
                <Video className="w-3.5 h-3.5" />
                <span>Google Meet Direct</span>
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 cursor-pointer scale-100 hover:scale-[1.02] active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Lock In Free Meeting</span>
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Strategy Meeting Confirmed!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. We look forward to analyzing <strong>{formData.company || 'your business'}</strong> and presenting high-converting growth options.
              </p>
            </div>

            {/* Session Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left space-y-2.5 text-xs shadow-xl">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                <span>Meeting Date:</span>
                <span className="font-mono text-cyan-300 font-semibold">{formatDateDisplay(formData.selectedDate)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                <span>Time & Zone:</span>
                <span className="font-mono text-cyan-300 font-semibold">{formData.selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                <span>Meeting Location:</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Google Meet
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-400">
                <span>Consultation Fee:</span>
                <span className="font-mono text-emerald-400 font-extrabold">$0.00 (100% FREE)</span>
              </div>
              <div className="flex justify-between py-1 text-slate-400">
                <span>Confirmation Sent To:</span>
                <span className="text-slate-200 font-mono truncate max-w-[200px]">{formData.email}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
