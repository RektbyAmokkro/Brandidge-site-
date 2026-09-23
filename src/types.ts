export type ViewType = 
  | 'home' 
  | 'services' 
  | 'process' 
  | 'pricing' 
  | 'about' 
  | 'admin'
  | 'customer-portal'
  | 'contact';

export type UserRole = 'admin' | 'customer';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  companyName?: string;
  customerId?: string;
  phone?: string;
  avatar?: string;
  token?: string;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  websiteUrl?: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  vatNumber?: string;
  taxExempt?: boolean;
  notes?: string;
  status: 'active' | 'lead' | 'archived';
  createdAt: string;
}

export type ProjectStatus = 
  | 'new'
  | 'planning'
  | 'in_development'
  | 'waiting_for_customer'
  | 'preview_ready'
  | 'changes_requested'
  | 'approved'
  | 'ready_for_launch'
  | 'live'
  | 'maintenance'
  | 'completed'
  | 'paused';

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  targetDate: string;
  completionDate?: string;
}

export interface CustomerProject {
  id: string;
  customerId: string;
  customerName: string;
  companyName: string;
  name: string;
  domain: string;
  status: ProjectStatus;
  progressPercent: number;
  previewUrl: string;
  liveUrl?: string;
  startDate: string;
  estimatedCompletionDate: string;
  techStack: string[];
  notes: string;
  milestones: ProjectMilestone[];
  maintenanceActive: boolean;
  maintenancePlan?: string;
  maintenanceEndDate?: string;
}

export type ChangeRequestPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ChangeRequestStatus = 'new' | 'reviewing' | 'approved' | 'in_progress' | 'waiting_for_customer' | 'completed' | 'rejected';

export interface ChangeRequest {
  id: string;
  projectId: string;
  projectName: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  priority: ChangeRequestPriority;
  status: ChangeRequestStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedHours?: number;
}

export interface CompanyService {
  id: string;
  name: string;
  description: string;
  defaultPrice: number; // in EUR (0 allowed)
  type: 'one_time' | 'recurring';
  recurringInterval?: 'monthly' | 'yearly';
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuoteItem {
  id: string;
  serviceId?: string; // Reference to company service if from catalog
  nameSnapshot?: string;
  description: string;
  quantity: number;
  unitPrice: number; // In Euro
  discountPercent?: number;
  vatRate: number; // e.g. 21% or 0%
  total: number;
  isRecurring?: boolean;
  recurringInterval?: 'monthly' | 'yearly';
  itemType?: 'base_project' | 'service_extra' | 'custom';
}

export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'cancelled';

export interface PaymentScheduleItem {
  installmentNumber: number;
  label: string;
  percentage: number;
  amount: number;
  dueTrigger: string;
  dueDate: string;
  description?: string;
}

export interface QuoteVersionRecord {
  version: number;
  quoteNumber: string;
  totalAmount: number;
  subtotal: number;
  discountTotal: number;
  vatTotal: number;
  items: QuoteItem[];
  paymentPlanProposed: PaymentStructureType;
  paymentSchedule: PaymentScheduleItem[];
  savedAt: string;
  savedBy: string;
  notes?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  version?: number;
  versionHistory?: QuoteVersionRecord[];
  customerId: string;
  customerName: string;
  company: string;
  email: string;
  projectId?: string;
  title: string;
  basePrice?: number;
  items: QuoteItem[];
  subtotal: number;
  discountType?: 'fixed' | 'percentage';
  discountValue?: number;
  discountTotal: number;
  vatRate?: number;
  vatTotal: number;
  totalAmount: number;
  status: QuoteStatus;
  notes: string;
  terms: string;
  paymentPlanProposed: PaymentStructureType;
  depositPercentage?: number;
  depositFixedAmount?: number;
  numberOfInstallments?: number;
  milestoneInstallments?: { label: string; percentage: number; amount: number; dueTrigger: string; dueDate?: string }[];
  paymentSchedule?: PaymentScheduleItem[];
  expiresAt: string;
  acceptedAt?: string;
  acceptedBy?: string;
  signatureIp?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface QuoteCalculationParams {
  basePrice: number;
  selectedExtras: { serviceId: string; customPrice: number }[];
  customItems: { description: string; quantity: number; unitPrice: number; vatRate?: number }[];
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  vatRate?: number;
  paymentPlan: PaymentStructureType;
  depositPercentage?: number;
  numberOfInstallments?: number;
  milestoneInstallments?: { label: string; percentage: number; amount: number; dueTrigger: string; dueDate?: string }[];
}

export interface QuoteCalculationResult {
  items: QuoteItem[];
  subtotal: number;
  discountTotal: number;
  vatTotal: number;
  totalAmount: number;
  installments: PaymentScheduleItem[];
  paymentSchedule: PaymentScheduleItem[];
}

export type PaymentStructureType = 
  | 'full_upfront'
  | 'percentage_deposit'
  | 'fixed_deposit'
  | 'two_installments'
  | 'three_installments'
  | 'milestone_installments'
  | 'custom_installments'
  | 'recurring_subscription';

export interface InvoiceItem {
  id: string;
  serviceId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent?: number;
  vatRate: number;
  total: number;
  isRecurring?: boolean;
  recurringInterval?: 'monthly' | 'yearly';
  itemType?: 'base_project' | 'service_extra' | 'custom';
}

export type InvoiceStatus = 
  | 'draft'
  | 'sent'
  | 'open'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'refunded';

export interface Installment {
  id: string;
  invoiceId: string;
  installmentNumber: number;
  label: string;
  percentage?: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  paidAt?: string;
  paymentLinkId?: string;
  paymentMethod?: string;
  transactionRef?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  quoteId?: string;
  customerId: string;
  customerName: string;
  company: string;
  email: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  vatNumber?: string;
  projectId?: string;
  projectName?: string;
  items: InvoiceItem[];
  subtotal: number;
  discountTotal: number;
  vatTotal: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  status: InvoiceStatus;
  paymentStructure: PaymentStructureType;
  installments: Installment[];
  issueDate: string;
  dueDate: string;
  notes: string;
  paymentInstructions: string;
  emailSentAt?: string;
  emailDeliveryStatus?: 'sent' | 'opened' | 'pending' | 'failed';
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  installmentId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  currency: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'stripe' | 'ideal' | 'sepa';
  providerTxId: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  paidAt: string;
  receiptUrl?: string;
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  reason: string;
  amount: number;
  vatAmount: number;
  total: number;
  issuedDate: string;
  status: 'issued' | 'applied' | 'refunded';
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: 'AUTH' | 'CUSTOMER' | 'PROJECT' | 'QUOTE' | 'INVOICE' | 'PAYMENT' | 'CHANGE_REQUEST' | 'SETTINGS' | 'APPOINTMENT';
  entityId?: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  templateType: 'booking_confirmation' | 'new_quote' | 'quote_accepted' | 'new_invoice' | 'payment_reminder' | 'payment_confirmation' | 'change_request_update';
  relatedEntityId?: string;
  status: 'sent' | 'queued' | 'failed';
  sentAt: string;
  previewSnippet: string;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  legalEntity: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  email: string;
  phone: string;
  website: string;
  vatNumber: string;
  kvkRegistration: string;
  bankDetails: {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
  };
  currency: string;
  currencySymbol: string;
  defaultVatRate: number;
  defaultPaymentTermsDays: number;
  invoicePrefix: string;
  quotePrefix: string;
  autoRemindersEnabled: boolean;
  stripeEnabled: boolean;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  iconName: string;
  highlightBadge: string;
  milestoneQuote: string;
  keyOutputs: { label: string; value: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  deliverables: string[];
  timeline: string;
  idealFor: string;
  pricingNote?: string;
  colSpan?: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  maintenanceIncluded?: string;
  ctaText: string;
  popular?: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  badge?: string;
  features: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'Fintech' | 'Logistics' | 'E-Commerce' | 'SaaS';
  imageUrl: string;
  colSpan: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    trend?: string;
  }[];
  challenge: string;
  solution: string;
  architecturalHighlights: string[];
  techStack: string[];
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  category: string;
  featuredImage: string;
  diagramImage?: string;
  summary: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: string;
      keyTakeaways?: string[];
    }[];
    conclusion: string;
  };
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  websiteUrl?: string;
  serviceInterest: string;
  budgetRange: string;
  timeline: string;
  primaryGoal: string;
  projectBrief: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
  timezone?: string;
  meetingStatus?: 'upcoming' | 'completed' | 'rescheduled' | 'cancelled' | 'no-show';
  meetingLink?: string;
  callNotes?: string;
  clientStage?: 'intake' | 'meeting_scheduled' | 'proposal_active' | 'in_development' | 'maintenance_active' | 'completed';
  maintenanceEndDate?: string;
  contractValue?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'proposal' | 'won' | 'archived';
  submittedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Process' | 'Pricing' | 'Technical' | 'Maintenance';
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  metric: string;
  avatar: string;
}
