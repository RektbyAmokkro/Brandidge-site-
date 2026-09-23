import React, { useState } from 'react';
import { CompanyService } from '../../types';
import { PortalStore } from '../../data/portalStore';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  ToggleLeft, 
  ToggleRight,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface ServicesManagementProps {
  services: CompanyService[];
  onServicesUpdated: () => void;
}

export const ServicesManagement: React.FC<ServicesManagementProps> = ({
  services,
  onServicesUpdated
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'one_time' | 'recurring' | 'active' | 'inactive'>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<CompanyService | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<CompanyService | null>(null);
  
  // Form fields
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDefaultPrice, setFormDefaultPrice] = useState<number | ''>(350);
  const [formType, setFormType] = useState<'one_time' | 'recurring'>('one_time');
  const [formRecurringInterval, setFormRecurringInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDisplayOrder, setFormDisplayOrder] = useState<number>(1);
  const [formError, setFormError] = useState('');

  const openCreateModal = () => {
    setEditingService(null);
    setFormName('');
    setFormDescription('');
    setFormDefaultPrice(300);
    setFormType('one_time');
    setFormRecurringInterval('monthly');
    setFormIsActive(true);
    setFormDisplayOrder(services.length + 1);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (service: CompanyService) => {
    setEditingService(service);
    setFormName(service.name);
    setFormDescription(service.description);
    setFormDefaultPrice(service.defaultPrice);
    setFormType(service.type);
    setFormRecurringInterval(service.recurringInterval || 'monthly');
    setFormIsActive(service.isActive);
    setFormDisplayOrder(service.displayOrder);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Service name is required.');
      return;
    }

    const priceNum = formDefaultPrice === '' ? 0 : Math.max(0, Number(formDefaultPrice));

    const serviceData: CompanyService = {
      id: editingService ? editingService.id : `svc-${Date.now()}`,
      name: formName.trim(),
      description: formDescription.trim(),
      defaultPrice: priceNum,
      type: formType,
      recurringInterval: formType === 'recurring' ? formRecurringInterval : undefined,
      isActive: formIsActive,
      displayOrder: Number(formDisplayOrder) || 1,
      createdAt: editingService?.createdAt || new Date().toISOString()
    };

    PortalStore.saveCompanyService(serviceData);
    setIsModalOpen(false);
    onServicesUpdated();
  };

  const handleToggleStatus = (service: CompanyService) => {
    const updated: CompanyService = {
      ...service,
      isActive: !service.isActive
    };
    PortalStore.saveCompanyService(updated);
    onServicesUpdated();
  };

  const handleDeleteService = () => {
    if (!serviceToDelete) return;
    PortalStore.deleteCompanyService(serviceToDelete.id);
    setServiceToDelete(null);
    onServicesUpdated();
  };

  // Filter and sort services
  const filteredServices = services
    .filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (filterType === 'active') return s.isActive;
      if (filterType === 'inactive') return !s.isActive;
      if (filterType === 'one_time') return s.type === 'one_time';
      if (filterType === 'recurring') return s.type === 'recurring';
      return true;
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const activeCount = services.filter(s => s.isActive).length;
  const oneTimeCount = services.filter(s => s.type === 'one_time').length;
  const recurringCount = services.filter(s => s.type === 'recurring').length;

  return (
    <div className="space-y-6">
      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">Services & Extras Management</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {services.length} Total Services
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure reusable digital services, SEO add-ons, speed packages, and deliverables. Default prices serve as suggestions and can be overridden per customer/quote.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Service / Extra</span>
        </button>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block uppercase">Active in Catalog</span>
          <div className="text-xl font-black font-mono text-emerald-400 mt-1">{activeCount} / {services.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block uppercase">One-Time Deliverables</span>
          <div className="text-xl font-black font-mono text-cyan-400 mt-1">{oneTimeCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block uppercase">Recurring / Retainers</span>
          <div className="text-xl font-black font-mono text-purple-400 mt-1">{recurringCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block uppercase">Custom Quote Overrides</span>
          <div className="text-xl font-black font-mono text-white mt-1">Enabled</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by name, keywords, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active Only' },
            { id: 'inactive', label: 'Disabled' },
            { id: 'one_time', label: 'One-Time' },
            { id: 'recurring', label: 'Recurring' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === f.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List Table / Grid */}
      <div className="space-y-3">
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <Layers className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Services Found</h4>
            <p className="text-xs text-slate-400">Try adjusting your search query or add a new service to the catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className={`p-5 rounded-2xl bg-slate-900/90 border transition-all space-y-3 flex flex-col justify-between ${
                  service.isActive ? 'border-slate-800 hover:border-slate-700' : 'border-slate-800/50 opacity-70 bg-slate-950/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[11px] font-bold text-cyan-400">
                        #{service.displayOrder}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug">{service.name}</h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        service.isActive 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}>
                        {service.isActive ? 'Active' : 'Disabled'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-800 text-slate-300">
                        {service.type === 'recurring' ? `Recurring (${service.recurringInterval || 'mo'})` : 'One-Time'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Default Suggested Price:</span>
                    <div className="text-base font-black font-mono text-white">
                      {service.defaultPrice === 0 ? (
                        <span className="text-emerald-400">€0.00 (Free / Included)</span>
                      ) : (
                        `€${service.defaultPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(service)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        service.isActive
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                      }`}
                      title={service.isActive ? 'Disable Service' : 'Reactivate Service'}
                    >
                      {service.isActive ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                      <span className="text-[11px]">{service.isActive ? 'Active' : 'Enable'}</span>
                    </button>

                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-all cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setServiceToDelete(service)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 transition-all cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Add or Edit Service */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {editingService ? 'Edit Service / Extra' : 'Create New Service / Extra'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Service Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Technical SEO & Google Indexation"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1 font-semibold">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe deliverables, scope, guarantees, or technologies included..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 font-semibold">
                    Default Suggested Price (€)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400">€</span>
                    <input
                      type="number"
                      step="any"
                      min={0}
                      placeholder="350.00"
                      value={formDefaultPrice}
                      onChange={(e) => setFormDefaultPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Set 0 for complimentary / free warranty</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 font-semibold">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 font-semibold">Billing Frequency</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-cyan-500"
                  >
                    <option value="one_time">One-Time Deliverable</option>
                    <option value="recurring">Recurring Retainer / Care</option>
                  </select>
                </div>

                {formType === 'recurring' && (
                  <div>
                    <label className="block text-slate-300 font-mono mb-1 font-semibold">Recurring Interval</label>
                    <select
                      value={formRecurringInterval}
                      onChange={(e) => setFormRecurringInterval(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold focus:outline-none focus:border-cyan-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Status Toggle */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200 block">Catalog Availability</span>
                  <span className="text-[11px] text-slate-400">Available for selection when building quotes</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    formIsActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {formIsActive ? '✓ Active' : '✕ Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  {editingService ? 'Update Service' : 'Save Service to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deletion */}
      {serviceToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          onClick={() => setServiceToDelete(null)}
        >
          <div 
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Delete Service?</h4>
                <p className="text-xs text-slate-400">This removes the service from the catalog.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              Are you sure you want to remove <strong>"{serviceToDelete.name}"</strong>? Existing quotes and invoices that already snapshotted this service will not be broken.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setServiceToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Keep Service
              </button>
              <button
                onClick={handleDeleteService}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
