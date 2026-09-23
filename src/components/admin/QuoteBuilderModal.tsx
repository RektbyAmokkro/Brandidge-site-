import React, { useState, useEffect } from 'react';
import { Quote, CompanyService, CustomerProfile, LeadSubmission, PaymentStructureType } from '../../types';
import { PortalStore } from '../../data/portalStore';
import { 
  FileText, 
  X, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  DollarSign, 
  Percent, 
  CreditCard, 
  Send, 
  Save, 
  Calendar, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface QuoteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuoteSaved: (quote: Quote) => void;
  initialQuote?: Quote | null;
  customers: CustomerProfile[];
  leads: LeadSubmission[];
  services: CompanyService[];
}

export const QuoteBuilderModal: React.FC<QuoteBuilderModalProps> = ({
  isOpen,
  onClose,
  onQuoteSaved,
  initialQuote,
  customers,
  leads,
  services
}) => {
  const companySettings = PortalStore.getCompanySettings();

  // Client Selection
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('custom');
  const [customerName, setCustomerName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [quoteTitle, setQuoteTitle] = useState('High-Converting Web Architecture & Digital Launch');

  // Base Website / Project Price (Manual & completely flexible)
  const [basePrice, setBasePrice] = useState<number | ''>(2500);

  // Selected Services & Extras with Custom Pricing
  const [selectedExtras, setSelectedExtras] = useState<{ [serviceId: string]: { selected: boolean; customPrice: number } }>({});

  // Custom Line Items
  const [customItems, setCustomItems] = useState<{ id: string; description: string; quantity: number; unitPrice: number; vatRate?: number }[]>([]);

  // Discounts
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed');
  const [discountValue, setDiscountValue] = useState<number | ''>(0);

  // Tax / VAT
  const [vatRate, setVatRate] = useState<number>(companySettings.defaultVatRate || 21);

  // Payment Plan Selection
  const [paymentPlan, setPaymentPlan] = useState<PaymentStructureType>('two_installments');
  const [depositPercentage, setDepositPercentage] = useState<number>(50);

  // Validity and Terms
  const [expiresAt, setExpiresAt] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('Includes complete sub-second Core Web Vitals optimization, responsive architecture, and post-launch onboarding.');
  const [terms, setTerms] = useState('50% deposit required upon contract confirmation. Remaining 50% due at production DNS cutover and live launch.');

  const [formError, setFormError] = useState('');

  // Initialize form state
  useEffect(() => {
    if (initialQuote) {
      setSelectedCustomerId(initialQuote.customerId || 'custom');
      setCustomerName(initialQuote.customerName);
      setCompany(initialQuote.company);
      setEmail(initialQuote.email);
      setQuoteTitle(initialQuote.title);
      setBasePrice(initialQuote.basePrice !== undefined ? initialQuote.basePrice : 2500);
      setDiscountType(initialQuote.discountType || 'fixed');
      setDiscountValue(initialQuote.discountValue || initialQuote.discountTotal || 0);
      setVatRate(initialQuote.vatRate !== undefined ? initialQuote.vatRate : 21);
      setPaymentPlan(initialQuote.paymentPlanProposed || 'two_installments');
      setDepositPercentage(initialQuote.depositPercentage || 50);
      setExpiresAt(initialQuote.expiresAt || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
      setNotes(initialQuote.notes || '');
      setTerms(initialQuote.terms || '');

      // Populate extras
      const extrasMap: { [serviceId: string]: { selected: boolean; customPrice: number } } = {};
      initialQuote.items.forEach(item => {
        if (item.serviceId) {
          extrasMap[item.serviceId] = {
            selected: true,
            customPrice: item.unitPrice
          };
        }
      });
      setSelectedExtras(extrasMap);

      // Populate custom items
      const customs = initialQuote.items
        .filter(i => i.itemType === 'custom' || (!i.serviceId && i.itemType !== 'base_project'))
        .map(i => ({
          id: i.id,
          description: i.description,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          vatRate: i.vatRate
        }));
      setCustomItems(customs);
    } else {
      // Default initial state
      const defaultExtras: { [serviceId: string]: { selected: boolean; customPrice: number } } = {};
      services.forEach(svc => {
        defaultExtras[svc.id] = {
          selected: svc.id === 'svc-2' || svc.id === 'svc-3' || svc.id === 'svc-8', // default check SEO, Speed, Free Maintenance
          customPrice: svc.defaultPrice
        };
      });
      setSelectedExtras(defaultExtras);

      // Auto-select first client if available
      if (customers.length > 0) {
        const first = customers[0];
        setSelectedCustomerId(first.id);
        setCustomerName(first.fullName);
        setCompany(first.company);
        setEmail(first.email);
      }
    }
  }, [initialQuote, isOpen]);

  // Handle client selection dropdown
  const handleClientChange = (clientId: string) => {
    setSelectedCustomerId(clientId);
    if (clientId === 'custom') {
      setCustomerName('');
      setCompany('');
      setEmail('');
    } else {
      const cust = customers.find(c => c.id === clientId);
      if (cust) {
        setCustomerName(cust.fullName);
        setCompany(cust.company);
        setEmail(cust.email);
        return;
      }
      const lead = leads.find(l => l.id === clientId);
      if (lead) {
        setCustomerName(lead.fullName);
        setCompany(lead.company);
        setEmail(lead.email);
      }
    }
  };

  // Toggle Extra Selection
  const toggleExtra = (service: CompanyService) => {
    setSelectedExtras(prev => ({
      ...prev,
      [service.id]: {
        selected: !prev[service.id]?.selected,
        customPrice: prev[service.id]?.customPrice !== undefined ? prev[service.id].customPrice : service.defaultPrice
      }
    }));
  };

  // Update Custom Price for Extra
  const updateExtraPrice = (serviceId: string, price: number) => {
    setSelectedExtras(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        customPrice: Math.max(0, price)
      }
    }));
  };

  // Custom Items Management
  const addCustomItem = () => {
    setCustomItems(prev => [
      ...prev,
      {
        id: `ci-${Date.now()}`,
        description: '',
        quantity: 1,
        unitPrice: 250,
        vatRate
      }
    ]);
  };

  const removeCustomItem = (id: string) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCustomItem = (id: string, field: string, value: any) => {
    setCustomItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Compute live breakdown via store engine
  const activeSelectedExtrasList = Object.entries(selectedExtras)
    .filter(([_, data]) => (data as { selected?: boolean; customPrice?: number })?.selected)
    .map(([serviceId, data]) => ({
      serviceId,
      customPrice: (data as { selected?: boolean; customPrice?: number }).customPrice || 0
    }));

  const breakdown = PortalStore.calculateQuoteBreakdown({
    basePrice: basePrice === '' ? 0 : Number(basePrice),
    selectedExtras: activeSelectedExtrasList,
    customItems,
    discountType,
    discountValue: discountValue === '' ? 0 : Number(discountValue),
    vatRate,
    paymentPlan,
    depositPercentage
  });

  // Save or Save & Send Handler
  const handleSave = (status: 'draft' | 'sent') => {
    if (!customerName.trim()) {
      setFormError('Customer name is required.');
      return;
    }
    if (!email.trim()) {
      setFormError('Customer email is required.');
      return;
    }
    if (!quoteTitle.trim()) {
      setFormError('Quote title / scope is required.');
      return;
    }

    setFormError('');

    const quoteId = initialQuote?.id || `qt-${Date.now()}`;
    const nextNum = PortalStore.getQuotes().length + 1;
    const quoteNumber = initialQuote?.quoteNumber || `QT-2026-${String(nextNum).padStart(3, '0')}`;

    const quoteToSave: Quote = {
      id: quoteId,
      quoteNumber,
      version: initialQuote?.version || 1,
      customerId: selectedCustomerId !== 'custom' ? selectedCustomerId : `cust-gen-${Date.now()}`,
      customerName: customerName.trim(),
      company: company.trim() || customerName.trim(),
      email: email.trim(),
      title: quoteTitle.trim(),
      basePrice: basePrice === '' ? 0 : Number(basePrice),
      items: breakdown.items,
      subtotal: breakdown.subtotal,
      discountType,
      discountValue: discountValue === '' ? 0 : Number(discountValue),
      discountTotal: breakdown.discountTotal,
      vatRate,
      vatTotal: breakdown.vatTotal,
      totalAmount: breakdown.totalAmount,
      status,
      notes: notes.trim(),
      terms: terms.trim(),
      paymentPlanProposed: paymentPlan,
      depositPercentage: paymentPlan === 'two_installments' || paymentPlan === 'percentage_deposit' ? depositPercentage : undefined,
      milestoneInstallments: breakdown.installments,
      expiresAt,
      createdAt: initialQuote?.createdAt || new Date().toISOString()
    };

    const saved = PortalStore.saveQuote(quoteToSave);

    if (status === 'sent') {
      PortalStore.sendEmail({
        recipient: quoteToSave.email,
        subject: `New Quotation ${quoteToSave.quoteNumber}: ${quoteToSave.title} — BrandRidge Digital`,
        templateType: 'new_quote',
        relatedEntityId: saved.id,
        previewSnippet: `Hi ${quoteToSave.customerName}, your proposal ${quoteToSave.quoteNumber} for €${quoteToSave.totalAmount.toLocaleString()} is ready for review.`
      });
    }

    onQuoteSaved(saved);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/90 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {initialQuote ? `Edit Quote ${initialQuote.quoteNumber}` : 'Create Custom Proposal & Flexible Quote'}
              </h3>
              <p className="text-xs text-slate-400">
                Manual project pricing, configurable extras per customer, custom line items, and dynamic payment plans
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <div className="space-y-6 text-xs">
          
          {/* 1. Client & Project Details */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> 1. Customer & Project Details
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Quotes are customized per customer</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Select Customer / Lead</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-cyan-500"
                >
                  <option value="custom">+ New Custom Client</option>
                  <optgroup label="Active Clients">
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.fullName} — {c.company}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Lead Bookings">
                    {leads.map(l => (
                      <option key={l.id} value={l.id}>{l.fullName} ({l.company})</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Customer Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Sterling"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lumina Aesthetics Clinic"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. marcus@lumina-aesthetics.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Proposal / Scope Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Complete Luxury Web Architecture & VIP Booking Platform"
                  value={quoteTitle}
                  onChange={(e) => setQuoteTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Manual Project Pricing (Base Website Price) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" /> 2. Manual Base Project Price (Completely Flexible)
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Enter any custom base price for this specific client (e.g. €750, €1,250, €2,500, €4,750, €8,000). Prices are never hardcoded.
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Manual Override Active
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="relative flex-1 max-w-xs">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-cyan-400 text-sm">€</span>
                <input
                  type="number"
                  step="any"
                  min={0}
                  placeholder="2500.00"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-white font-mono font-bold text-base focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {[750, 1250, 2500, 4750, 8000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBasePrice(preset)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
                  >
                    €{preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Services & Extras (Checkboxes with Per-Customer Price Overrides) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 3. Services & Extras (Selectable Add-ons)
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Select add-on deliverables from your catalog and adjust the price for this specific customer if needed.
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {activeSelectedExtrasList.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((svc) => {
                const isSelected = !!selectedExtras[svc.id]?.selected;
                const currentPrice = selectedExtras[svc.id]?.customPrice !== undefined ? selectedExtras[svc.id].customPrice : svc.defaultPrice;
                const isPriceOverridden = currentPrice !== svc.defaultPrice;

                return (
                  <div
                    key={svc.id}
                    className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                      isSelected
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-900/40 border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleExtra(svc)}
                        className="mt-1 w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                        id={`extra-${svc.id}`}
                      />
                      <div className="flex-1">
                        <label htmlFor={`extra-${svc.id}`} className="font-bold text-white cursor-pointer select-none block">
                          {svc.name}
                        </label>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5 line-clamp-2">
                          {svc.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                        <div className="text-[10px] text-slate-400 font-mono">
                          Suggested: €{svc.defaultPrice} {svc.defaultPrice === 0 ? '(Free)' : ''}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-semibold">Quote Price:</span>
                          <div className="relative w-28">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-slate-400">€</span>
                            <input
                              type="number"
                              min={0}
                              step="any"
                              value={currentPrice}
                              onChange={(e) => updateExtraPrice(svc.id, Number(e.target.value))}
                              className={`w-full pl-6 pr-2 py-1 rounded-lg bg-slate-950 border text-xs font-mono font-bold focus:outline-none ${
                                isPriceOverridden
                                  ? 'border-cyan-400 text-cyan-300'
                                  : 'border-slate-700 text-white'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Custom Line Items */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> 4. Custom Line Items
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Add custom bespoke deliverables, third-party licenses, or client-specific modules.
                </p>
              </div>

              <button
                type="button"
                onClick={addCustomItem}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-all border border-cyan-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Custom Item</span>
              </button>
            </div>

            {customItems.length === 0 ? (
              <div className="p-3 text-center rounded-xl bg-slate-900/50 border border-slate-800/80 text-slate-500 text-[11px]">
                No custom line items added yet. Click "+ Add Custom Item" above to append unique deliverables.
              </div>
            ) : (
              <div className="space-y-2">
                {customItems.map((item, idx) => (
                  <div key={item.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        placeholder="Item deliverable description..."
                        value={item.description}
                        onChange={(e) => updateCustomItem(item.id, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-mono">Qty:</span>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateCustomItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center text-xs"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-slate-400">€</span>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={item.unitPrice}
                          onChange={(e) => updateCustomItem(item.id, 'unitPrice', Number(e.target.value))}
                          className="w-full pl-5 pr-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono font-semibold text-xs"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => removeCustomItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Discounts & Taxes */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-200">Discounts</span>
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDiscountType('fixed')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      discountType === 'fixed' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Fixed (€)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType('percentage')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      discountType === 'percentage' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Percent (%)
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400">
                  {discountType === 'fixed' ? '€' : '%'}
                </span>
                <input
                  type="number"
                  min={0}
                  step="any"
                  placeholder={discountType === 'fixed' ? '500.00' : '10'}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {discountType === 'percentage' ? `Applies ${discountValue || 0}% discount to subtotal` : 'Deducts fixed amount from subtotal'}
              </span>
            </div>

            <div>
              <span className="font-semibold text-slate-200 block mb-1.5">Tax / VAT Rate</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400">%</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Standard NL VAT: 21% (or set 0% for B2B reverse-charge)
              </span>
            </div>
          </div>

          {/* 6. Payment Plan Selection (Strictly Computed on the FINAL TOTAL) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" /> 6. Payment Plan Schedule (Computed from Final Total)
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Installments are calculated based on the <strong>final total (€{breakdown.totalAmount.toLocaleString()})</strong> after discounts and extras.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'full_upfront', title: '100% Upfront', desc: 'Single invoice upon signing' },
                { id: 'two_installments', title: '50% / 50% Two Stages', desc: '50% deposit + 50% launch' },
                { id: 'three_installments', title: '3 Installments', desc: '33% signing + 33% staging + 34% launch' },
              ].map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setPaymentPlan(plan.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentPlan === plan.id
                      ? 'bg-cyan-500/10 border-cyan-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{plan.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{plan.desc}</div>
                </button>
              ))}
            </div>

            {/* Calculated Schedule Preview Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Installment Breakdown Preview:
              </span>
              <div className="divide-y divide-slate-800">
                {breakdown.installments.map((inst, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white">{inst.label}</span>
                      <span className="text-[11px] text-slate-400 ml-2 font-mono">({inst.dueTrigger})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-cyan-400 text-sm">
                        €{inst.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7. Financial Summary Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-cyan-500/50 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              Live Verified Quotation Total
            </h4>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Base Project Architecture:</span>
                <span className="font-mono font-semibold">€{(basePrice === '' ? 0 : Number(basePrice)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Extras & Add-ons:</span>
                <span className="font-mono font-semibold">€{activeSelectedExtrasList.reduce((s, e) => s + e.customPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              {customItems.length > 0 && (
                <div className="flex justify-between">
                  <span>Custom Line Items:</span>
                  <span className="font-mono font-semibold">€{customItems.reduce((s, i) => s + (i.quantity * i.unitPrice), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="font-bold text-white">Subtotal:</span>
                <span className="font-mono font-bold text-white">€{breakdown.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              {breakdown.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount Applied:</span>
                  <span className="font-mono">-€{breakdown.discountTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>VAT / Tax ({vatRate}%):</span>
                <span className="font-mono">€{breakdown.vatTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t-2 border-cyan-500/40">
                <span>FINAL TOTAL AMOUNT:</span>
                <span className="font-mono text-cyan-400 text-lg">€{breakdown.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* 8. Terms & Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-mono mb-1 font-semibold">Proposal Expiration Date</label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1 font-semibold">Warranty & Proposal Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Bottom Actions: Save Draft vs Save & Send */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => handleSave('draft')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>[ Save Draft ]</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave('sent')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>[ Save + Send to Client ]</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
