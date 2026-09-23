import { 
  AuthUser, 
  CustomerProfile, 
  CustomerProject, 
  Quote, 
  Invoice, 
  Installment, 
  PaymentRecord, 
  ChangeRequest, 
  AuditLog, 
  EmailLog, 
  CompanySettings, 
  LeadSubmission,
  PaymentStructureType,
  InvoiceItem,
  QuoteItem,
  CompanyService,
  PaymentScheduleItem,
  QuoteVersionRecord,
  QuoteCalculationParams,
  QuoteCalculationResult,
  Vacancy,
  ContactMessage
} from '../types';

export const SEED_COMPANY_SERVICES: CompanyService[] = [
  {
    id: 'svc-1',
    name: 'Custom High-Converting Web Design',
    description: 'Bespoke UI/UX visual architecture, tailored wireframing, and conversion-optimized section hierarchy.',
    defaultPrice: 500,
    type: 'one_time',
    isActive: true,
    displayOrder: 1,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-2',
    name: 'Technical SEO & Google Indexation',
    description: 'Technical SEO schema architecture, OpenGraph meta tags, Google Search Console indexing setup, and sitemap generation.',
    defaultPrice: 300,
    type: 'one_time',
    isActive: true,
    displayOrder: 2,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-3',
    name: 'Sub-Second Speed (< 0.8s LCP)',
    description: 'Sub-second Core Web Vitals optimization, asset compression, edge CDN routing, and <0.8s Largest Contentful Paint guarantee.',
    defaultPrice: 400,
    type: 'one_time',
    isActive: true,
    displayOrder: 3,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-4',
    name: 'Logo & Visual Brand Identity',
    description: 'Custom vector logo creation, master typography pairing, luxury color palettes, and digital asset export guidelines.',
    defaultPrice: 350,
    type: 'one_time',
    isActive: true,
    displayOrder: 4,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-5',
    name: 'Content Management System (CMS)',
    description: 'Intuitive administrative dashboard for dynamic blog publishing, portfolio case studies, and live content management.',
    defaultPrice: 450,
    type: 'one_time',
    isActive: true,
    displayOrder: 5,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-6',
    name: 'Mobile-First Responsive Layout',
    description: 'Adaptive touch-optimized interface engineered and tested across smartphones, tablets, laptops, and 4K displays.',
    defaultPrice: 250,
    type: 'one_time',
    isActive: true,
    displayOrder: 6,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-7',
    name: 'Lead Capture & Form Automation',
    description: 'High-converting interactive lead funnels, automated email notifications, webhook CRM integrations, and spam protection.',
    defaultPrice: 250,
    type: 'one_time',
    isActive: true,
    displayOrder: 7,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'svc-8',
    name: '1-Month Free Maintenance Package',
    description: 'Complimentary 30-day post-launch warranty, security monitoring, server health checks, daily backups, and priority support.',
    defaultPrice: 0,
    type: 'one_time',
    isActive: true,
    displayOrder: 8,
    createdAt: '2026-08-01T10:00:00.000Z'
  }
];

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  name: 'Brandidge',
  tagline: 'Bridging Brands to Growth',
  legalEntity: 'Brandidge Solutions B.V.',
  address: {
    street: 'Keizersgracht 421',
    city: 'Amsterdam',
    state: 'North Holland',
    postalCode: '1016 EK',
    country: 'Netherlands'
  },
  email: 'billing@brandridge.com',
  phone: '+31 (0) 20 894 3200',
  website: 'https://brandridge.com',
  vatNumber: 'NL864192831B01',
  kvkRegistration: '84920194',
  bankDetails: {
    bankName: 'ING Bank N.V.',
    accountHolder: 'Brandidge Solutions B.V.',
    iban: 'NL91 INGB 0401 9283 11',
    bic: 'INGBNL2A'
  },
  currency: 'EUR',
  currencySymbol: '€',
  defaultVatRate: 21,
  defaultPaymentTermsDays: 14,
  invoicePrefix: 'INV-2026-',
  quotePrefix: 'QT-2026-',
  autoRemindersEnabled: true,
  stripeEnabled: true
};

// Seed Users (Empty: No preconfigured login users)
export const SEED_USERS: AuthUser[] = [];

// Seed Customers
export const SEED_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    userId: 'user-marcus',
    fullName: 'Marcus Sterling',
    company: 'Lumina Aesthetics Clinic',
    email: 'marcus@lumina-aesthetics.com',
    phone: '+1 (415) 890-2134',
    websiteUrl: 'https://lumina-aesthetics.com',
    billingAddress: {
      street: '450 Sutter Street, Suite 1200',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94108',
      country: 'United States'
    },
    vatNumber: 'US-CA-941084920',
    taxExempt: true,
    status: 'active',
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'cust-2',
    userId: 'user-vance',
    fullName: 'Dr. Evelyn Vance',
    company: 'Apex Biome Diagnostics',
    email: 'dr.vance@apexbiome.com',
    phone: '+1 (617) 442-9901',
    websiteUrl: 'https://apexbiome.com',
    billingAddress: {
      street: '100 Binney Street',
      city: 'Cambridge',
      state: 'MA',
      postalCode: '02142',
      country: 'United States'
    },
    vatNumber: 'US-MA-021429910',
    taxExempt: true,
    status: 'active',
    createdAt: '2026-08-05T14:30:00.000Z'
  },
  {
    id: 'cust-3',
    userId: 'user-liam',
    fullName: 'Liam O’Connor',
    company: 'Vanguard Precision Manufacturing',
    email: 'liam@vanguardprecision.com',
    phone: '+1 (312) 778-4392',
    websiteUrl: 'https://vanguardprecision.com',
    billingAddress: {
      street: '222 W Merchandise Mart Plaza',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60654',
      country: 'United States'
    },
    vatNumber: 'US-IL-606541189',
    taxExempt: true,
    status: 'active',
    createdAt: '2026-08-10T09:15:00.000Z'
  },
  {
    id: 'cust-4',
    userId: 'user-sophia',
    fullName: 'Sophia Chen',
    company: 'Atelier Verve Haute Horlogerie',
    email: 'sophia@atelier-verve.com',
    phone: '+33 1 42 68 55 00',
    websiteUrl: 'https://atelier-verve.fr',
    billingAddress: {
      street: '18 Place Vendôme',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75001',
      country: 'France'
    },
    vatNumber: 'FR88930192844',
    taxExempt: false,
    status: 'active',
    createdAt: '2026-08-15T11:00:00.000Z'
  }
];

// Seed Projects
export const SEED_PROJECTS: CustomerProject[] = [
  {
    id: 'proj-1',
    customerId: 'cust-1',
    customerName: 'Marcus Sterling',
    companyName: 'Lumina Aesthetics Clinic',
    name: 'Lumina High-Converting VIP Booking Platform',
    domain: 'lumina-aesthetics.com',
    status: 'preview_ready',
    progressPercent: 75,
    previewUrl: 'https://preview.lumina-aesthetics.brandridge.dev',
    liveUrl: 'https://lumina-aesthetics.com',
    startDate: '2026-08-05',
    estimatedCompletionDate: '2026-09-02',
    techStack: ['Next.js 15', 'Tailwind CSS', 'PostgreSQL', 'Stripe Connect', 'Google Calendar API'],
    notes: 'Premium aesthetic clinic booking engine with automated SMS reminders and VIP membership deposits.',
    maintenanceActive: true,
    maintenancePlan: '1-Month Free Agency Warranty + Pro SLA',
    maintenanceEndDate: '2026-10-02',
    milestones: [
      { id: 'm1', title: 'Brand Direction & UX Wireframing', description: 'Luxury medical spa aesthetic wireframes approved.', status: 'completed', targetDate: '2026-08-10', completionDate: '2026-08-09' },
      { id: 'm2', title: 'Interactive Frontend & Booking Engine', description: 'Full responsive UI and appointment calendar setup.', status: 'completed', targetDate: '2026-08-20', completionDate: '2026-08-19' },
      { id: 'm3', title: 'Payment Gateways & SMS Integrations', description: 'Stripe deposit collection and Twilio SMS confirmations.', status: 'in_progress', targetDate: '2026-08-28' },
      { id: 'm4', title: 'Security Audit & Production Launch', description: 'Penetration testing, sub-second CDN routing, domain live cutover.', status: 'pending', targetDate: '2026-09-02' }
    ]
  },
  {
    id: 'proj-2',
    customerId: 'cust-2',
    customerName: 'Dr. Evelyn Vance',
    companyName: 'Apex Biome Diagnostics',
    name: 'Apex Biome Clinical Diagnostics & Portal',
    domain: 'apexbiome.com',
    status: 'in_development',
    progressPercent: 45,
    previewUrl: 'https://staging.apexbiome.brandridge.dev',
    liveUrl: 'https://apexbiome.com',
    startDate: '2026-08-12',
    estimatedCompletionDate: '2026-09-18',
    techStack: ['React', 'Node.js', 'Express', 'HIPAA-compliant Storage', 'Tailwind CSS'],
    notes: 'Clinical precision diagnostic platform with secure B2B lab ordering workflow.',
    maintenanceActive: true,
    maintenancePlan: '1-Month Free Agency Warranty Included',
    maintenanceEndDate: '2026-10-18',
    milestones: [
      { id: 'm21', title: 'Technical Architecture & Compliance Spec', description: 'High security data model and user consent workflows.', status: 'completed', targetDate: '2026-08-16', completionDate: '2026-08-15' },
      { id: 'm22', title: 'Interactive Lab Catalog & Order Wizard', description: 'Sample collection requisition builder with real-time pricing.', status: 'in_progress', targetDate: '2026-08-30' },
      { id: 'm23', title: 'Physician Portal & Report Downloads', description: 'Encrypted lab results PDF generation & viewing.', status: 'pending', targetDate: '2026-09-10' },
      { id: 'm24', title: 'Final Launch & Domain Switch', description: 'Global DNS migration and SSL hardening.', status: 'pending', targetDate: '2026-09-18' }
    ]
  },
  {
    id: 'proj-3',
    customerId: 'cust-4',
    customerName: 'Sophia Chen',
    companyName: 'Atelier Verve Haute Horlogerie',
    name: 'Atelier Verve Luxury Timepiece Catalog & Private Client Room',
    domain: 'atelier-verve.fr',
    status: 'planning',
    progressPercent: 20,
    previewUrl: 'https://preview.atelier-verve.brandridge.dev',
    liveUrl: 'https://atelier-verve.fr',
    startDate: '2026-08-18',
    estimatedCompletionDate: '2026-09-25',
    techStack: ['TypeScript', 'Vite', 'Three.js / WebGL 3D Showcase', 'Tailwind CSS'],
    notes: 'Ultra-luxury Swiss timepiece catalog with 3D product view and concierge booking.',
    maintenanceActive: false,
    milestones: [
      { id: 'm41', title: 'Visual Identity & High-Fi Prototypes', description: 'Bespoke dark aesthetic visual guidelines.', status: 'in_progress', targetDate: '2026-08-27' },
      { id: 'm42', title: '3D Watch Configurator', description: 'Interactive strap and dial visualizer.', status: 'pending', targetDate: '2026-09-10' },
      { id: 'm43', title: 'Concierge Portal & VIP Checkout', description: 'Private appointment scheduling for flagship salons.', status: 'pending', targetDate: '2026-09-25' }
    ]
  }
];

// Seed Quotes
export const SEED_QUOTES: Quote[] = [
  {
    id: 'qt-1',
    quoteNumber: 'QT-2026-001',
    customerId: 'cust-1',
    customerName: 'Marcus Sterling',
    company: 'Lumina Aesthetics Clinic',
    email: 'marcus@lumina-aesthetics.com',
    projectId: 'proj-1',
    title: 'Complete Luxury Digital Launch & VIP Booking Platform',
    items: [
      { id: 'qi-1', description: 'Custom High-Converting Web Architecture & VIP UI', quantity: 1, unitPrice: 3800, vatRate: 0, total: 3800 },
      { id: 'qi-2', description: 'Automated 24/7 Appointment & Deposit Engine', quantity: 1, unitPrice: 1200, vatRate: 0, total: 1200 },
      { id: 'qi-3', description: 'Local Medical SEO Architecture & Core Web Vitals <500ms', quantity: 1, unitPrice: 800, vatRate: 0, total: 800 },
      { id: 'qi-4', description: '1st Month Free Agency SLA & Infrastructure Care', quantity: 1, unitPrice: 0, vatRate: 0, total: 0 }
    ],
    subtotal: 5800,
    discountTotal: 800,
    vatTotal: 0,
    totalAmount: 5000,
    status: 'accepted',
    notes: 'Special multi-service bundled discount applied. Includes 1-month comprehensive warranty and Google Meet walkthrough.',
    terms: '50% deposit due upon kickoff, remaining 50% due at successful production launch. Sub-second speed guarantee included.',
    paymentPlanProposed: 'percentage_deposit',
    depositPercentage: 50,
    expiresAt: '2026-08-20',
    acceptedAt: '2026-08-04T16:20:00.000Z',
    acceptedBy: 'Marcus Sterling',
    signatureIp: '162.210.192.4',
    createdAt: '2026-08-02T11:00:00.000Z'
  },
  {
    id: 'qt-2',
    quoteNumber: 'QT-2026-002',
    customerId: 'cust-2',
    customerName: 'Dr. Evelyn Vance',
    company: 'Apex Biome Diagnostics',
    email: 'dr.vance@apexbiome.com',
    projectId: 'proj-2',
    title: 'Clinical Diagnostics Portal & Secure B2B Order Flow',
    items: [
      { id: 'qi-21', description: 'Diagnostic Service Requisition Engine & Lab Portal', quantity: 1, unitPrice: 5500, vatRate: 0, total: 5500 },
      { id: 'qi-22', description: 'Physician Secure Results Delivery Dashboard', quantity: 1, unitPrice: 2000, vatRate: 0, total: 2000 },
      { id: 'qi-23', description: 'Sub-second Edge Hosting & High Availability Setup', quantity: 1, unitPrice: 500, vatRate: 0, total: 500 }
    ],
    subtotal: 8000,
    discountTotal: 500,
    vatTotal: 0,
    totalAmount: 7500,
    status: 'accepted',
    notes: 'Tailored 3-stage milestone payment plan (30% / 40% / 30%).',
    terms: '30% upfront (€2,250), 40% upon staging lab portal completion (€3,000), 30% upon final production launch (€2,250).',
    paymentPlanProposed: 'milestone_installments',
    milestoneInstallments: [
      { label: '30% Upfront Kickoff Deposit', percentage: 30, amount: 2250, dueTrigger: 'Immediate Upon Signing' },
      { label: '40% Milestone 2 Staging Requisition Engine', percentage: 40, amount: 3000, dueTrigger: 'Upon Staging Approval' },
      { label: '30% Final Launch & DNS Cutover', percentage: 30, amount: 2250, dueTrigger: 'Upon Production Launch' }
    ],
    expiresAt: '2026-08-25',
    acceptedAt: '2026-08-11T09:45:00.000Z',
    acceptedBy: 'Dr. Evelyn Vance',
    signatureIp: '198.51.100.22',
    createdAt: '2026-08-08T15:30:00.000Z'
  },
  {
    id: 'qt-3',
    quoteNumber: 'QT-2026-003',
    customerId: 'cust-4',
    customerName: 'Sophia Chen',
    company: 'Atelier Verve Haute Horlogerie',
    email: 'sophia@atelier-verve.com',
    projectId: 'proj-3',
    title: 'Luxury 3D Timepiece Showcase & VIP Concierge Experience',
    items: [
      { id: 'qi-31', description: 'Haute Horlogerie Digital Showcase & WebGL 3D Viewer', quantity: 1, unitPrice: 6200, vatRate: 20, total: 7440 },
      { id: 'qi-32', description: 'VIP Concierge Consultation & Boutique Reservation System', quantity: 1, unitPrice: 1800, vatRate: 20, total: 2160 },
      { id: 'qi-33', description: 'Monthly Retainer: Dedicated Infrastructure & Content Care', quantity: 1, unitPrice: 250, vatRate: 20, total: 300, isRecurring: true, recurringInterval: 'monthly' }
    ],
    subtotal: 8250,
    discountTotal: 0,
    vatTotal: 1650,
    totalAmount: 9900,
    status: 'sent',
    notes: 'Draft proposal prepared after discovery call. Includes WebGL watch rendering and French VAT (20%).',
    terms: '50% deposit upon confirmation, 50% upon boutique release. Monthly retainer starts on delivery.',
    paymentPlanProposed: 'percentage_deposit',
    depositPercentage: 50,
    expiresAt: '2026-09-05',
    createdAt: '2026-08-19T14:00:00.000Z'
  }
];

// Seed Invoices & Installments
export const SEED_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-0001',
    quoteId: 'qt-1',
    customerId: 'cust-1',
    customerName: 'Marcus Sterling',
    company: 'Lumina Aesthetics Clinic',
    email: 'marcus@lumina-aesthetics.com',
    billingAddress: {
      street: '450 Sutter Street, Suite 1200',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94108',
      country: 'United States'
    },
    vatNumber: 'US-CA-941084920',
    projectId: 'proj-1',
    projectName: 'Lumina High-Converting VIP Booking Platform',
    items: [
      { id: 'ii-1', description: 'Custom High-Converting Web Architecture & VIP UI', quantity: 1, unitPrice: 3800, vatRate: 0, total: 3800 },
      { id: 'ii-2', description: 'Automated 24/7 Appointment & Deposit Engine', quantity: 1, unitPrice: 1200, vatRate: 0, total: 1200 },
      { id: 'ii-3', description: 'Local Medical SEO Architecture & Core Web Vitals <500ms', quantity: 1, unitPrice: 800, vatRate: 0, total: 800 }
    ],
    subtotal: 5800,
    discountTotal: 800,
    vatTotal: 0,
    totalAmount: 5000,
    amountPaid: 2500,
    balanceDue: 2500,
    status: 'partially_paid',
    paymentStructure: 'percentage_deposit',
    installments: [
      {
        id: 'inst-1',
        invoiceId: 'inv-1',
        installmentNumber: 1,
        label: '50% Upfront Kickoff Deposit',
        percentage: 50,
        amount: 2500,
        dueDate: '2026-08-06',
        status: 'paid',
        paidAt: '2026-08-06T14:12:00.000Z',
        paymentLinkId: 'pl_lumina_deposit_paid',
        paymentMethod: 'credit_card',
        transactionRef: 'tx_stripe_88492019'
      },
      {
        id: 'inst-2',
        invoiceId: 'inv-1',
        installmentNumber: 2,
        label: '50% Final Milestone: Production Launch',
        percentage: 50,
        amount: 2500,
        dueDate: '2026-09-02',
        status: 'pending',
        paymentLinkId: 'pl_lumina_final_launch'
      }
    ],
    issueDate: '2026-08-05',
    dueDate: '2026-09-02',
    notes: 'Thank you for choosing BrandRidge. Your project is currently 75% complete and on schedule for September 2nd launch.',
    paymentInstructions: 'Please pay online via the Customer Portal Pay Now button or wire to ING Bank N.V. NL91 INGB 0401 9283 11 referencing INV-2026-0001.',
    emailSentAt: '2026-08-05T10:30:00.000Z',
    emailDeliveryStatus: 'opened',
    createdAt: '2026-08-05T10:00:00.000Z'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-0002',
    quoteId: 'qt-2',
    customerId: 'cust-2',
    customerName: 'Dr. Evelyn Vance',
    company: 'Apex Biome Diagnostics',
    email: 'dr.vance@apexbiome.com',
    billingAddress: {
      street: '100 Binney Street',
      city: 'Cambridge',
      state: 'MA',
      postalCode: '02142',
      country: 'United States'
    },
    vatNumber: 'US-MA-021429910',
    projectId: 'proj-2',
    projectName: 'Apex Biome Clinical Diagnostics & Portal',
    items: [
      { id: 'ii-21', description: 'Diagnostic Service Requisition Engine & Lab Portal', quantity: 1, unitPrice: 5500, vatRate: 0, total: 5500 },
      { id: 'ii-22', description: 'Physician Secure Results Delivery Dashboard', quantity: 1, unitPrice: 2000, vatRate: 0, total: 2000 }
    ],
    subtotal: 7500,
    discountTotal: 0,
    vatTotal: 0,
    totalAmount: 7500,
    amountPaid: 2250,
    balanceDue: 5250,
    status: 'partially_paid',
    paymentStructure: 'milestone_installments',
    installments: [
      {
        id: 'inst-21',
        invoiceId: 'inv-2',
        installmentNumber: 1,
        label: '30% Milestone 1: Kickoff & Technical Architecture',
        percentage: 30,
        amount: 2250,
        dueDate: '2026-08-14',
        status: 'paid',
        paidAt: '2026-08-13T16:40:00.000Z',
        paymentLinkId: 'pl_apex_ms1',
        paymentMethod: 'bank_transfer',
        transactionRef: 'tx_ing_99401284'
      },
      {
        id: 'inst-22',
        invoiceId: 'inv-2',
        installmentNumber: 2,
        label: '40% Milestone 2: Staging Lab Catalog & Order Wizard',
        percentage: 40,
        amount: 3000,
        dueDate: '2026-08-30',
        status: 'pending',
        paymentLinkId: 'pl_apex_ms2'
      },
      {
        id: 'inst-23',
        invoiceId: 'inv-2',
        installmentNumber: 3,
        label: '30% Milestone 3: Production Delivery & Physician Portal',
        percentage: 30,
        amount: 2250,
        dueDate: '2026-09-18',
        status: 'pending',
        paymentLinkId: 'pl_apex_ms3'
      }
    ],
    issueDate: '2026-08-12',
    dueDate: '2026-09-18',
    notes: 'Milestone-based contract. Milestone 1 successfully completed and verified.',
    paymentInstructions: 'Electronic ACH / Wire to ING Bank N.V. NL91 INGB 0401 9283 11 or instant card payment in Customer Portal.',
    emailSentAt: '2026-08-12T11:00:00.000Z',
    emailDeliveryStatus: 'sent',
    createdAt: '2026-08-12T10:30:00.000Z'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2026-0003',
    customerId: 'cust-3',
    customerName: 'Liam O’Connor',
    company: 'Vanguard Precision Manufacturing',
    email: 'liam@vanguardprecision.com',
    billingAddress: {
      street: '222 W Merchandise Mart Plaza',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60654',
      country: 'United States'
    },
    vatNumber: 'US-IL-606541189',
    projectName: 'B2B RFQ Quoting Engine & CAD Catalog',
    items: [
      { id: 'ii-31', description: 'B2B RFQ Instant Pricing Calculator & CAD Viewer', quantity: 1, unitPrice: 3500, vatRate: 0, total: 3500 },
      { id: 'ii-32', description: 'Enterprise SEO & Industrial Supplier Directory Integration', quantity: 1, unitPrice: 1000, vatRate: 0, total: 1000 }
    ],
    subtotal: 4500,
    discountTotal: 0,
    vatTotal: 0,
    totalAmount: 4500,
    amountPaid: 4500,
    balanceDue: 0,
    status: 'paid',
    paymentStructure: 'full_upfront',
    installments: [
      {
        id: 'inst-31',
        invoiceId: 'inv-3',
        installmentNumber: 1,
        label: '100% Full Payment Upfront (5% Early Pay Bonus Applied)',
        percentage: 100,
        amount: 4500,
        dueDate: '2026-08-12',
        status: 'paid',
        paidAt: '2026-08-11T18:05:00.000Z',
        paymentLinkId: 'pl_vanguard_full',
        paymentMethod: 'credit_card',
        transactionRef: 'tx_stripe_99301284'
      }
    ],
    issueDate: '2026-08-10',
    dueDate: '2026-08-24',
    notes: 'Paid in full upon contract initiation. Thank you for your business.',
    paymentInstructions: 'Paid in full on Aug 11, 2026 via Stripe.',
    emailSentAt: '2026-08-10T12:00:00.000Z',
    emailDeliveryStatus: 'opened',
    createdAt: '2026-08-10T11:45:00.000Z'
  }
];

// Seed Payments
export const SEED_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    invoiceId: 'inv-1',
    invoiceNumber: 'INV-2026-0001',
    installmentId: 'inst-1',
    customerId: 'cust-1',
    customerName: 'Marcus Sterling',
    amount: 2500,
    currency: 'EUR',
    paymentMethod: 'credit_card',
    providerTxId: 'ch_3N8x7bF92Ksl2018',
    status: 'succeeded',
    paidAt: '2026-08-06T14:12:00.000Z',
    receiptUrl: 'https://pay.brandridge.com/receipt/rc_88492019'
  },
  {
    id: 'pay-2',
    invoiceId: 'inv-2',
    invoiceNumber: 'INV-2026-0002',
    installmentId: 'inst-21',
    customerId: 'cust-2',
    customerName: 'Dr. Evelyn Vance',
    amount: 2250,
    currency: 'EUR',
    paymentMethod: 'bank_transfer',
    providerTxId: 'sepa_99401284_ing',
    status: 'succeeded',
    paidAt: '2026-08-13T16:40:00.000Z',
    receiptUrl: 'https://pay.brandridge.com/receipt/rc_99401284'
  },
  {
    id: 'pay-3',
    invoiceId: 'inv-3',
    invoiceNumber: 'INV-2026-0003',
    installmentId: 'inst-31',
    customerId: 'cust-3',
    customerName: 'Liam O’Connor',
    amount: 4500,
    currency: 'EUR',
    paymentMethod: 'credit_card',
    providerTxId: 'ch_4M9y8aG03Ltm3129',
    status: 'succeeded',
    paidAt: '2026-08-11T18:05:00.000Z',
    receiptUrl: 'https://pay.brandridge.com/receipt/rc_99301284'
  }
];

// Seed Change Requests
export const SEED_CHANGE_REQUESTS: ChangeRequest[] = [
  {
    id: 'cr-1',
    projectId: 'proj-1',
    projectName: 'Lumina High-Converting VIP Booking Platform',
    customerId: 'cust-1',
    customerName: 'Marcus Sterling',
    title: 'Add VIP Gold Tier Concierge Badging to Specialist Profiles',
    description: 'We want our Senior Dermatologists to have a distinct "Master Injector / VIP Concierge" badge on the live booking calendar so patients know they offer evening consultations.',
    priority: 'medium',
    status: 'in_progress',
    adminNotes: 'Design mockup completed; currently wiring the dynamic filter in the consultation grid.',
    createdAt: '2026-08-20T14:30:00.000Z',
    updatedAt: '2026-08-21T09:15:00.000Z',
    estimatedHours: 4
  },
  {
    id: 'cr-2',
    projectId: 'proj-1',
    projectName: 'Lumina High-Converting VIP Booking Platform',
    customerId: 'cust-1',
    customerName: 'Marcus Sterling',
    title: 'Integrate Apple Pay / Google Pay One-Click Deposit',
    description: 'Can we allow clients to pay their $100 consultation booking hold with Apple Pay directly from Safari mobile?',
    priority: 'high',
    status: 'approved',
    adminNotes: 'Stripe Express Checkout Element enabled; testing domain verification.',
    createdAt: '2026-08-22T11:00:00.000Z',
    updatedAt: '2026-08-23T16:00:00.000Z',
    estimatedHours: 6
  },
  {
    id: 'cr-3',
    projectId: 'proj-2',
    projectName: 'Apex Biome Clinical Diagnostics & Portal',
    customerId: 'cust-2',
    customerName: 'Dr. Evelyn Vance',
    title: 'Add CLIA & CAP Accreditation Seals to Test Results Footer',
    description: 'Please ensure our laboratory CLIA number and CAP accreditation seals are rendered in the auto-generated PDF report headers.',
    priority: 'urgent',
    status: 'completed',
    adminNotes: 'High-res vector certification marks added to PDF generation template in release v1.0.4.',
    createdAt: '2026-08-17T09:00:00.000Z',
    updatedAt: '2026-08-18T15:20:00.000Z',
    estimatedHours: 2
  }
];

// Seed Audit Logs
export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    userId: 'user-admin',
    userEmail: 'admin@brandridge.com',
    action: 'ADMIN_SIGN_IN',
    entityType: 'AUTH',
    details: 'Administrator successfully authenticated from secure control node.',
    timestamp: '2026-08-24T04:55:00.000Z',
    ipAddress: '82.165.197.10'
  },
  {
    id: 'aud-2',
    userId: 'user-marcus',
    userEmail: 'marcus@lumina-aesthetics.com',
    action: 'QUOTE_ACCEPTED',
    entityType: 'QUOTE',
    entityId: 'qt-1',
    details: 'Customer Marcus Sterling accepted quotation QT-2026-001 (€5,000.00) with 50% deposit plan.',
    timestamp: '2026-08-04T16:20:00.000Z',
    ipAddress: '162.210.192.4'
  },
  {
    id: 'aud-3',
    userId: 'user-admin',
    userEmail: 'admin@brandridge.com',
    action: 'INVOICE_CREATED',
    entityType: 'INVOICE',
    entityId: 'inv-1',
    details: 'Generated invoice INV-2026-0001 with 2 installments for Lumina Aesthetics Clinic.',
    timestamp: '2026-08-05T10:00:00.000Z',
    ipAddress: '82.165.197.10'
  },
  {
    id: 'aud-4',
    userId: 'user-marcus',
    userEmail: 'marcus@lumina-aesthetics.com',
    action: 'PAYMENT_RECEIVED',
    entityType: 'PAYMENT',
    entityId: 'pay-1',
    details: 'Stripe webhook verified payment of €2,500.00 for Installment 1 (INV-2026-0001).',
    timestamp: '2026-08-06T14:12:00.000Z',
    ipAddress: 'Stripe-Webhook-Agent'
  },
  {
    id: 'aud-5',
    userId: 'user-vance',
    userEmail: 'dr.vance@apexbiome.com',
    action: 'CHANGE_REQUEST_SUBMITTED',
    entityType: 'CHANGE_REQUEST',
    entityId: 'cr-3',
    details: 'Dr. Evelyn Vance submitted change request: CLIA & CAP Accreditation Seals.',
    timestamp: '2026-08-17T09:00:00.000Z',
    ipAddress: '198.51.100.22'
  }
];

// Seed Email Logs
export const SEED_EMAIL_LOGS: EmailLog[] = [
  {
    id: 'eml-1',
    recipient: 'marcus@lumina-aesthetics.com',
    subject: 'BrandRidge — Quotation QT-2026-001 Ready for Review',
    templateType: 'new_quote',
    relatedEntityId: 'qt-1',
    status: 'sent',
    sentAt: '2026-08-02T11:05:00.000Z',
    previewSnippet: 'Marcus, your custom proposal for the Lumina Aesthetics Clinic VIP Booking Platform has been prepared.'
  },
  {
    id: 'eml-2',
    recipient: 'marcus@lumina-aesthetics.com',
    subject: 'Receipt: Kickoff Deposit Received (€2,500.00) — INV-2026-0001',
    templateType: 'payment_confirmation',
    relatedEntityId: 'pay-1',
    status: 'sent',
    sentAt: '2026-08-06T14:15:00.000Z',
    previewSnippet: 'We have received your payment of €2,500.00. Project development is officially active.'
  },
  {
    id: 'eml-3',
    recipient: 'dr.vance@apexbiome.com',
    subject: 'BrandRidge — Invoice INV-2026-0002 Milestone Schedule',
    templateType: 'new_invoice',
    relatedEntityId: 'inv-2',
    status: 'sent',
    sentAt: '2026-08-12T11:02:00.000Z',
    previewSnippet: 'Dr. Vance, your 3-stage milestone invoice INV-2026-0002 has been issued.'
  }
];

// Storage keys
const STORAGE_PREFIX = 'brandridge_portal_v2_';

export class PortalStore {
  private static getItem<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static setItem<T>(key: string, val: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
    } catch {
      // ignore
    }
  }

  // Users
  static getUsers(): AuthUser[] {
    return this.getItem<AuthUser[]>('users', SEED_USERS);
  }

  static saveUser(user: AuthUser): void {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    this.setItem('users', users);
  }

  // Customers
  static getCustomers(): CustomerProfile[] {
    return this.getItem<CustomerProfile[]>('customers', SEED_CUSTOMERS);
  }

  static getCustomerById(id: string): CustomerProfile | undefined {
    return this.getCustomers().find(c => c.id === id);
  }

  static saveCustomer(cust: CustomerProfile): void {
    const list = this.getCustomers();
    const idx = list.findIndex(c => c.id === cust.id);
    if (idx >= 0) {
      list[idx] = cust;
    } else {
      list.unshift(cust);
    }
    this.setItem('customers', list);
    this.logAudit({
      userId: 'system',
      userEmail: cust.email,
      action: idx >= 0 ? 'CUSTOMER_UPDATED' : 'CUSTOMER_CREATED',
      entityType: 'CUSTOMER',
      entityId: cust.id,
      details: `Customer profile for ${cust.fullName} (${cust.company}) was saved.`
    });
  }

  // Projects
  static getProjects(): CustomerProject[] {
    return this.getItem<CustomerProject[]>('projects', SEED_PROJECTS);
  }

  static getProjectsForCustomer(customerId: string): CustomerProject[] {
    return this.getProjects().filter(p => p.customerId === customerId);
  }

  static saveProject(project: CustomerProject): void {
    const list = this.getProjects();
    const idx = list.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      list[idx] = project;
    } else {
      list.unshift(project);
    }
    this.setItem('projects', list);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandridge.com',
      action: idx >= 0 ? 'PROJECT_UPDATED' : 'PROJECT_CREATED',
      entityType: 'PROJECT',
      entityId: project.id,
      details: `Project "${project.name}" status: ${project.status} (${project.progressPercent}%).`
    });
  }

  // Company Services & Extras Catalog
  static getCompanyServices(): CompanyService[] {
    return this.getItem<CompanyService[]>('company_services', SEED_COMPANY_SERVICES);
  }

  static getCompanyServiceById(id: string): CompanyService | undefined {
    return this.getCompanyServices().find(s => s.id === id);
  }

  static saveCompanyService(service: CompanyService): void {
    const services = this.getCompanyServices();
    const idx = services.findIndex(s => s.id === service.id);
    const updated = {
      ...service,
      updatedAt: new Date().toISOString()
    };
    if (idx >= 0) {
      services[idx] = updated;
    } else {
      updated.createdAt = new Date().toISOString();
      services.push(updated);
    }
    this.setItem('company_services', services);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandridge.com',
      action: idx >= 0 ? 'SERVICE_UPDATED' : 'SERVICE_CREATED',
      entityType: 'SETTINGS',
      entityId: service.id,
      details: `Service "${service.name}" saved. Default price: €${service.defaultPrice}, Active: ${service.isActive}.`
    });
  }

  static deleteCompanyService(id: string): { success: boolean; message?: string } {
    const services = this.getCompanyServices();
    const svc = services.find(s => s.id === id);
    if (!svc) return { success: false, message: 'Service not found.' };

    // Filter out
    const updated = services.filter(s => s.id !== id);
    this.setItem('company_services', updated);

    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandridge.com',
      action: 'SERVICE_DELETED',
      entityType: 'SETTINGS',
      entityId: id,
      details: `Service "${svc.name}" was deleted from catalog.`
    });

    return { success: true, message: `Service "${svc.name}" removed.` };
  }

  // Service Schema Validation
  static validateCompanyService(service: Partial<CompanyService>): { isValid: boolean; errors: string[]; validated?: CompanyService } {
    const errors: string[] = [];
    if (!service.name?.trim()) errors.push('Service name is required');
    const defaultPrice = Number(service.defaultPrice);
    if (isNaN(defaultPrice) || defaultPrice < 0) errors.push('Default price must be a non-negative number');
    
    if (errors.length > 0) return { isValid: false, errors };
    
    const validated: CompanyService = {
      id: service.id || `svc-${Date.now()}`,
      name: service.name!.trim(),
      description: service.description?.trim() || '',
      defaultPrice: defaultPrice || 0,
      type: service.type || 'one_time',
      recurringInterval: service.recurringInterval,
      isActive: service.isActive !== undefined ? service.isActive : true,
      displayOrder: Number(service.displayOrder) || 1,
      createdAt: service.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { isValid: true, errors: [], validated };
  }

  // Quote Schema Validation
  static validateQuote(quote: Partial<Quote>): { isValid: boolean; errors: string[]; validated?: Quote } {
    const errors: string[] = [];
    if (!quote.customerName?.trim()) errors.push('Customer name is required');
    if (!quote.email?.trim() || !quote.email.includes('@')) errors.push('Valid customer email is required');
    if (!quote.title?.trim()) errors.push('Quote title is required');
    if (!quote.items || quote.items.length === 0) errors.push('At least one line item or base project is required');

    if (errors.length > 0) return { isValid: false, errors };

    const validated: Quote = {
      id: quote.id || `qt-${Date.now()}`,
      quoteNumber: quote.quoteNumber || `QT-2026-${String(Date.now()).slice(-4)}`,
      version: quote.version || 1,
      versionHistory: quote.versionHistory || [],
      customerId: quote.customerId || 'custom',
      customerName: quote.customerName!.trim(),
      company: quote.company?.trim() || 'Direct Client',
      email: quote.email!.trim().toLowerCase(),
      projectId: quote.projectId,
      title: quote.title!.trim(),
      basePrice: quote.basePrice !== undefined ? Number(quote.basePrice) : 0,
      items: quote.items || [],
      subtotal: Number(quote.subtotal) || 0,
      discountType: quote.discountType || 'fixed',
      discountValue: Number(quote.discountValue) || 0,
      discountTotal: Number(quote.discountTotal) || 0,
      vatRate: quote.vatRate !== undefined ? Number(quote.vatRate) : 21,
      vatTotal: Number(quote.vatTotal) || 0,
      totalAmount: Number(quote.totalAmount) || 0,
      status: quote.status || 'draft',
      notes: quote.notes || '',
      terms: quote.terms || '',
      paymentPlanProposed: quote.paymentPlanProposed || 'two_installments',
      depositPercentage: quote.depositPercentage,
      milestoneInstallments: quote.milestoneInstallments,
      paymentSchedule: quote.paymentSchedule,
      expiresAt: quote.expiresAt || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      createdAt: quote.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { isValid: true, errors: [], validated };
  }

  // Pure Backend Engine for Payment Plan Schedules (1, 2, or 3 Installments)
  static generatePaymentPlanSchedule(
    totalAmount: number,
    paymentPlan: PaymentStructureType = 'two_installments',
    options?: {
      depositPercentage?: number;
      milestoneInstallments?: { label: string; percentage: number; amount?: number; dueTrigger?: string; dueDate?: string }[];
    }
  ): PaymentScheduleItem[] {
    const total = Math.max(0, Math.round(Number(totalAmount) * 100) / 100);
    const schedule: PaymentScheduleItem[] = [];

    if (paymentPlan === 'three_installments') {
      // 3 Installments: Equal 3-stage split (33.33% / 33.33% / 33.34%) with penny precision
      const p1 = Math.round((total / 3) * 100) / 100;
      const p2 = Math.round((total / 3) * 100) / 100;
      const p3 = Math.round((total - p1 - p2) * 100) / 100;

      schedule.push({
        installmentNumber: 1,
        label: '1st Installment: Kickoff & Architecture Deposit',
        percentage: 33.33,
        amount: p1,
        dueTrigger: 'Due Immediately Upon Signing',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        description: 'Initiates project sprint, wireframing, and design architecture.'
      });
      schedule.push({
        installmentNumber: 2,
        label: '2nd Installment: Staging Preview Approval',
        percentage: 33.33,
        amount: p2,
        dueTrigger: 'Due Upon Interactive Staging Approval',
        dueDate: new Date(Date.now() + 17 * 86400000).toISOString().split('T')[0],
        description: 'Released after full staging preview walkthrough and client approval.'
      });
      schedule.push({
        installmentNumber: 3,
        label: '3rd Installment: Production Live Cutover',
        percentage: 33.34,
        amount: p3,
        dueTrigger: 'Due Prior to Production Launch',
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        description: 'Final balance prior to domain DNS cutover, SEO verification, and warranty start.'
      });
    } else if (paymentPlan === 'two_installments') {
      // 2 Installments: Standard 50/50 Split
      const p1 = Math.round((total / 2) * 100) / 100;
      const p2 = Math.round((total - p1) * 100) / 100;

      schedule.push({
        installmentNumber: 1,
        label: 'Payment 1: 50% Kickoff Deposit',
        percentage: 50,
        amount: p1,
        dueTrigger: 'Due Immediately Upon Signing',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        description: 'Covers initial design, UI architecture, and development sprint kickoff.'
      });
      schedule.push({
        installmentNumber: 2,
        label: 'Payment 2: 50% Final Milestone',
        percentage: 50,
        amount: p2,
        dueTrigger: 'Due at Production Live Cutover',
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        description: 'Released upon final quality assurance, speed check, and live domain deployment.'
      });
    } else if (paymentPlan === 'percentage_deposit') {
      // Custom 2-stage percentage deposit (e.g. 30/70, 40/60, 60/40)
      const pct = Math.min(99, Math.max(1, options?.depositPercentage || 50));
      const p1 = Math.round((total * pct) / 100);
      const p2 = Math.round((total - p1) * 100) / 100;

      schedule.push({
        installmentNumber: 1,
        label: `Payment 1: ${pct}% Kickoff Deposit`,
        percentage: pct,
        amount: p1,
        dueTrigger: 'Due Immediately Upon Signing',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        description: `Upfront ${pct}% commitment deposit to begin development.`
      });
      schedule.push({
        installmentNumber: 2,
        label: `Payment 2: ${100 - pct}% Final Launch Balance`,
        percentage: 100 - pct,
        amount: p2,
        dueTrigger: 'Due at Production Live Cutover',
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        description: `Remaining ${100 - pct}% balance due upon production release.`
      });
    } else if (paymentPlan === 'milestone_installments' && options?.milestoneInstallments?.length) {
      // Custom Milestone Installments
      let runningSum = 0;
      const count = options.milestoneInstallments.length;

      options.milestoneInstallments.forEach((m, idx) => {
        const isLast = idx === count - 1;
        const instAmount = isLast 
          ? Math.round((total - runningSum) * 100) / 100
          : Math.round((total * m.percentage) / 100);
        runningSum += instAmount;

        schedule.push({
          installmentNumber: idx + 1,
          label: m.label || `Milestone ${idx + 1} (${m.percentage}%)`,
          percentage: m.percentage,
          amount: instAmount,
          dueTrigger: m.dueTrigger || `Milestone ${idx + 1} Completion`,
          dueDate: m.dueDate || new Date(Date.now() + (idx * 14 + 7) * 86400000).toISOString().split('T')[0],
          description: `Installment ${idx + 1} tied to milestone completion.`
        });
      });
    } else {
      // 1 Installment: 100% Full Payment
      schedule.push({
        installmentNumber: 1,
        label: 'Payment in Full (100%)',
        percentage: 100,
        amount: total,
        dueTrigger: 'Due Within 14 Days of Signing',
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        description: 'Single upfront invoice covering full project scope with priority scheduling.'
      });
    }

    return schedule;
  }

  // Quote Financial Calculation Engine (Strict store-side calculation)
  static calculateQuoteBreakdown(params: QuoteCalculationParams): QuoteCalculationResult {
    const settings = this.getCompanySettings();
    const vatRate = params.vatRate ?? settings.defaultVatRate ?? 21;
    const services = this.getCompanyServices();
    const items: QuoteItem[] = [];

    // 1. Base Website / Project Item (if basePrice > 0 or explicitly set)
    const basePrice = Math.max(0, Number(params.basePrice) || 0);
    if (basePrice > 0 || params.selectedExtras.length === 0) {
      items.push({
        id: `qi-base-${Date.now()}`,
        nameSnapshot: 'Base Website Architecture & Web Development',
        description: 'Base Website Architecture & High-Converting Engineering',
        quantity: 1,
        unitPrice: basePrice,
        vatRate,
        total: basePrice,
        itemType: 'base_project'
      });
    }

    // 2. Selected Extras with Custom Price per customer/project
    params.selectedExtras.forEach(extra => {
      const svc = services.find(s => s.id === extra.serviceId);
      if (svc) {
        const itemPrice = Math.max(0, Number(extra.customPrice) || 0);
        items.push({
          id: `qi-ext-${svc.id}-${Date.now()}`,
          serviceId: svc.id,
          nameSnapshot: svc.name,
          description: svc.name,
          quantity: 1,
          unitPrice: itemPrice,
          vatRate,
          total: itemPrice,
          isRecurring: svc.type === 'recurring',
          recurringInterval: svc.recurringInterval,
          itemType: 'service_extra'
        });
      }
    });

    // 3. Custom Line Items
    params.customItems.forEach((c, idx) => {
      if (c.description?.trim()) {
        const qty = Math.max(1, Number(c.quantity) || 1);
        const uPrice = Math.max(0, Number(c.unitPrice) || 0);
        const itemVat = c.vatRate !== undefined ? Number(c.vatRate) : vatRate;
        const lineTotal = Math.round(qty * uPrice * 100) / 100;
        items.push({
          id: `qi-cust-${Date.now()}-${idx}`,
          nameSnapshot: c.description.trim(),
          description: c.description.trim(),
          quantity: qty,
          unitPrice: uPrice,
          vatRate: itemVat,
          total: lineTotal,
          itemType: 'custom'
        });
      }
    });

    // 4. Subtotal calculation
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);

    // 5. Discount calculation (Fixed or Percentage)
    let discountTotal = 0;
    const discountVal = Math.max(0, Number(params.discountValue) || 0);
    if (params.discountType === 'percentage') {
      const pct = Math.min(100, discountVal);
      discountTotal = Math.round((subtotal * pct) / 100);
    } else {
      discountTotal = Math.min(subtotal, discountVal);
    }

    // 6. Tax / VAT calculation
    const amountAfterDiscount = Math.max(0, subtotal - discountTotal);
    const vatTotal = Math.round((amountAfterDiscount * vatRate) / 100);

    // 7. FINAL TOTAL (The absolute source of truth)
    const totalAmount = Math.max(0, amountAfterDiscount + vatTotal);

    // 8. Payment Installment Schedule (1, 2, or 3 installments) based on FINAL TOTAL
    const paymentSchedule = this.generatePaymentPlanSchedule(totalAmount, params.paymentPlan, {
      depositPercentage: params.depositPercentage,
      milestoneInstallments: params.milestoneInstallments
    });

    return {
      items,
      subtotal,
      discountTotal,
      vatTotal,
      totalAmount,
      installments: paymentSchedule,
      paymentSchedule
    };
  }

  // Quotes
  static getQuotes(): Quote[] {
    return this.getItem<Quote[]>('quotes', SEED_QUOTES);
  }

  static getQuotesForCustomer(customerId: string): Quote[] {
    return this.getQuotes().filter(q => q.customerId === customerId);
  }

  static saveQuote(quote: Quote, savedBy: string = 'System Admin'): Quote {
    const list = this.getQuotes();
    const existing = list.find(q => q.id === quote.id);

    // Ensure payment schedule is synchronized with the quote total
    const paymentSchedule = quote.paymentSchedule || this.generatePaymentPlanSchedule(
      quote.totalAmount, 
      quote.paymentPlanProposed,
      {
        depositPercentage: quote.depositPercentage,
        milestoneInstallments: quote.milestoneInstallments
      }
    );

    let quoteToSave: Quote = {
      ...quote,
      paymentSchedule,
      milestoneInstallments: paymentSchedule.map(p => ({
        label: p.label,
        percentage: p.percentage,
        amount: p.amount,
        dueTrigger: p.dueTrigger,
        dueDate: p.dueDate
      }))
    };

    // Quote Versioning & Immutability:
    // If quote exists and has already been sent or accepted, archive previous version in history and increment version
    if (existing && (existing.status === 'sent' || existing.status === 'accepted')) {
      const newVersion = (existing.version || 1) + 1;
      const historyRecord: QuoteVersionRecord = {
        version: existing.version || 1,
        quoteNumber: existing.quoteNumber,
        totalAmount: existing.totalAmount,
        subtotal: existing.subtotal,
        discountTotal: existing.discountTotal,
        vatTotal: existing.vatTotal,
        items: [...existing.items],
        paymentPlanProposed: existing.paymentPlanProposed,
        paymentSchedule: existing.paymentSchedule || [],
        savedAt: existing.updatedAt || existing.createdAt || new Date().toISOString(),
        savedBy: savedBy,
        notes: existing.notes
      };

      const updatedHistory = [...(existing.versionHistory || []), historyRecord];

      quoteToSave = {
        ...quoteToSave,
        id: `qt-${Date.now()}`,
        version: newVersion,
        versionHistory: updatedHistory,
        quoteNumber: `${existing.quoteNumber.split('-v')[0]}-v${newVersion}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.unshift(quoteToSave);
    } else if (existing) {
      const idx = list.findIndex(q => q.id === quote.id);
      quoteToSave.updatedAt = new Date().toISOString();
      list[idx] = quoteToSave;
    } else {
      quoteToSave.version = 1;
      quoteToSave.versionHistory = [];
      quoteToSave.createdAt = new Date().toISOString();
      quoteToSave.updatedAt = new Date().toISOString();
      list.unshift(quoteToSave);
    }

    this.setItem('quotes', list);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandridge.com',
      action: existing ? 'QUOTE_VERSIONED' : 'QUOTE_CREATED',
      entityType: 'QUOTE',
      entityId: quoteToSave.id,
      details: `Quotation ${quoteToSave.quoteNumber} (v${quoteToSave.version}) for ${quoteToSave.company} saved. Total: €${quoteToSave.totalAmount.toLocaleString()} (${quoteToSave.paymentPlanProposed.replace(/_/g, ' ')}).`
    });

    return quoteToSave;
  }

  static acceptQuote(quoteId: string, acceptedBy: string): { success: boolean; invoice?: Invoice } {
    const quotes = this.getQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return { success: false };

    quote.status = 'accepted';
    quote.acceptedAt = new Date().toISOString();
    quote.acceptedBy = acceptedBy;
    quote.signatureIp = 'Client-Verified-Portal';
    this.setItem('quotes', quotes);

    // Automatically generate invoice & payment plan from accepted quote
    const invoice = this.convertQuoteToInvoice(quote);

    this.logAudit({
      userId: quote.customerId,
      userEmail: quote.email,
      action: 'QUOTE_ACCEPTED',
      entityType: 'QUOTE',
      entityId: quote.id,
      details: `Quote ${quote.quoteNumber} accepted by ${acceptedBy}. Converted to invoice ${invoice.invoiceNumber} with ${invoice.installments.length} scheduled installment(s).`
    });

    this.sendEmail({
      recipient: quote.email,
      subject: `Quotation ${quote.quoteNumber} Confirmed — BrandRidge Digital`,
      templateType: 'quote_accepted',
      relatedEntityId: quote.id,
      previewSnippet: `Thank you for accepting Quote ${quote.quoteNumber}. Your invoice ${invoice.invoiceNumber} is now available.`
    });

    return { success: true, invoice };
  }

  static convertQuoteToInvoice(quote: Quote): Invoice {
    const invoices = this.getInvoices();
    const nextNum = invoices.length + 1;
    const invoiceNumber = `INV-2026-${String(nextNum).padStart(4, '0')}`;
    
    // Build installments based on the quote's generated payment schedule
    const schedule = quote.paymentSchedule || this.generatePaymentPlanSchedule(
      quote.totalAmount, 
      quote.paymentPlanProposed,
      {
        depositPercentage: quote.depositPercentage,
        milestoneInstallments: quote.milestoneInstallments
      }
    );

    const installments: Installment[] = schedule.map((item, idx) => ({
      id: `inst-${Date.now()}-${idx + 1}`,
      invoiceId: `inv-${Date.now()}`,
      installmentNumber: item.installmentNumber,
      label: item.label,
      percentage: item.percentage,
      amount: item.amount,
      dueDate: item.dueDate,
      status: 'pending',
      paymentLinkId: `pl_${invoiceNumber}_inst${idx + 1}`
    }));

    const customer = this.getCustomerById(quote.customerId);

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      quoteId: quote.id,
      customerId: quote.customerId,
      customerName: quote.customerName,
      company: quote.company,
      email: quote.email,
      billingAddress: customer?.billingAddress || {
        street: '100 Business Way',
        city: 'Amsterdam',
        state: 'NH',
        postalCode: '1016 EK',
        country: 'Netherlands'
      },
      vatNumber: customer?.vatNumber,
      projectId: quote.projectId,
      projectName: quote.title,
      items: quote.items.map(i => ({
        id: `inv-item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        serviceId: i.serviceId,
        description: i.nameSnapshot ? `${i.nameSnapshot}: ${i.description}` : i.description,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        vatRate: i.vatRate,
        total: i.total,
        isRecurring: i.isRecurring,
        recurringInterval: i.recurringInterval,
        itemType: i.itemType
      })),
      subtotal: quote.subtotal,
      discountTotal: quote.discountTotal,
      vatTotal: quote.vatTotal,
      totalAmount: quote.totalAmount,
      amountPaid: 0,
      balanceDue: quote.totalAmount,
      status: 'open',
      paymentStructure: quote.paymentPlanProposed,
      installments,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      notes: quote.notes,
      paymentInstructions: 'Pay securely online in your Customer Portal or transfer via SEPA IBAN NL91 INGB 0401 9283 11.',
      createdAt: new Date().toISOString()
    };

    invoices.unshift(newInvoice);
    this.setItem('invoices', invoices);
    return newInvoice;
  }

  // Invoices
  static getInvoices(): Invoice[] {
    return this.getItem<Invoice[]>('invoices', SEED_INVOICES);
  }

  static getInvoicesForCustomer(customerId: string): Invoice[] {
    return this.getInvoices().filter(inv => inv.customerId === customerId);
  }

  static saveInvoice(invoice: Invoice, sendEmailAfter: boolean = false): void {
    const list = this.getInvoices();
    const idx = list.findIndex(i => i.id === invoice.id);
    if (idx >= 0) {
      list[idx] = invoice;
    } else {
      list.unshift(invoice);
    }
    this.setItem('invoices', list);

    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandridge.com',
      action: idx >= 0 ? 'INVOICE_UPDATED' : 'INVOICE_CREATED',
      entityType: 'INVOICE',
      entityId: invoice.id,
      details: `Invoice ${invoice.invoiceNumber} for ${invoice.company} (€${invoice.totalAmount.toLocaleString()}) saved.`
    });

    if (sendEmailAfter) {
      this.sendEmail({
        recipient: invoice.email,
        subject: `BrandRidge — Invoice ${invoice.invoiceNumber} Issued (€${invoice.totalAmount.toLocaleString()})`,
        templateType: 'new_invoice',
        relatedEntityId: invoice.id,
        previewSnippet: `Hello ${invoice.customerName}, your invoice ${invoice.invoiceNumber} has been generated with flexible payment options.`
      });
    }
  }

  // Payments & Checkout
  static getPayments(): PaymentRecord[] {
    return this.getItem<PaymentRecord[]>('payments', SEED_PAYMENTS);
  }

  static getPaymentsForCustomer(customerId: string): PaymentRecord[] {
    return this.getPayments().filter(p => p.customerId === customerId);
  }

  static recordPayment(payment: {
    invoiceId: string;
    installmentId?: string;
    amount: number;
    paymentMethod: 'credit_card' | 'bank_transfer' | 'stripe' | 'ideal' | 'sepa';
  }): { success: boolean; paymentRecord: PaymentRecord } {
    const invoices = this.getInvoices();
    const invoice = invoices.find(i => i.id === payment.invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    const paymentRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      installmentId: payment.installmentId,
      customerId: invoice.customerId,
      customerName: invoice.customerName,
      amount: payment.amount,
      currency: 'EUR',
      paymentMethod: payment.paymentMethod,
      providerTxId: `tx_stripe_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      status: 'succeeded',
      paidAt: new Date().toISOString(),
      receiptUrl: `https://pay.brandridge.com/receipt/${invoice.invoiceNumber}-${Date.now()}`
    };

    // Update invoice calculations
    invoice.amountPaid += payment.amount;
    invoice.balanceDue = Math.max(0, invoice.totalAmount - invoice.amountPaid);
    
    if (invoice.balanceDue <= 0) {
      invoice.status = 'paid';
    } else {
      invoice.status = 'partially_paid';
    }

    // Update installment if specified
    if (payment.installmentId) {
      const inst = invoice.installments.find(ins => ins.id === payment.installmentId);
      if (inst) {
        inst.status = 'paid';
        inst.paidAt = new Date().toISOString();
        inst.paymentMethod = payment.paymentMethod;
        inst.transactionRef = paymentRecord.providerTxId;
      }
    }

    this.setItem('invoices', invoices);

    const payments = this.getPayments();
    payments.unshift(paymentRecord);
    this.setItem('payments', payments);

    this.logAudit({
      userId: invoice.customerId,
      userEmail: invoice.email,
      action: 'PAYMENT_RECORDED',
      entityType: 'PAYMENT',
      entityId: paymentRecord.id,
      details: `Recorded payment of €${payment.amount.toLocaleString()} for ${invoice.invoiceNumber} via ${payment.paymentMethod}.`
    });

    this.sendEmail({
      recipient: invoice.email,
      subject: `Payment Receipt: €${payment.amount.toLocaleString()} for ${invoice.invoiceNumber}`,
      templateType: 'payment_confirmation',
      relatedEntityId: invoice.id,
      previewSnippet: `Your payment of €${payment.amount.toLocaleString()} was successfully processed. Remaining balance: €${invoice.balanceDue.toLocaleString()}.`
    });

    return { success: true, paymentRecord };
  }

  // Change Requests
  static getChangeRequests(): ChangeRequest[] {
    return this.getItem<ChangeRequest[]>('change_requests', SEED_CHANGE_REQUESTS);
  }

  static getChangeRequestsForCustomer(customerId: string): ChangeRequest[] {
    return this.getChangeRequests().filter(cr => cr.customerId === customerId);
  }

  static saveChangeRequest(cr: ChangeRequest): void {
    const list = this.getChangeRequests();
    const idx = list.findIndex(c => c.id === cr.id);
    if (idx >= 0) {
      list[idx] = cr;
    } else {
      list.unshift(cr);
    }
    this.setItem('change_requests', list);

    this.logAudit({
      userId: cr.customerId,
      userEmail: cr.customerName,
      action: idx >= 0 ? 'CHANGE_REQUEST_UPDATED' : 'CHANGE_REQUEST_SUBMITTED',
      entityType: 'CHANGE_REQUEST',
      entityId: cr.id,
      details: `Change request "${cr.title}" status: ${cr.status} (Priority: ${cr.priority}).`
    });
  }

  // Audit Logs
  static getAuditLogs(): AuditLog[] {
    return this.getItem<AuditLog[]>('audit_logs', SEED_AUDIT_LOGS);
  }

  static logAudit(entry: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const list = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      ...entry,
      timestamp: new Date().toISOString(),
      ipAddress: entry.ipAddress || 'Client-Console'
    };
    list.unshift(newLog);
    // Keep max 500 logs in storage
    if (list.length > 500) list.pop();
    this.setItem('audit_logs', list);
  }

  // Email Logs
  static getEmailLogs(): EmailLog[] {
    return this.getItem<EmailLog[]>('email_logs', SEED_EMAIL_LOGS);
  }

  static sendEmail(params: Omit<EmailLog, 'id' | 'sentAt' | 'status'>): void {
    const list = this.getEmailLogs();
    const newLog: EmailLog = {
      id: `eml-${Date.now()}`,
      ...params,
      status: 'sent',
      sentAt: new Date().toISOString()
    };
    list.unshift(newLog);
    this.setItem('email_logs', list);
  }

  // Settings
  static getCompanySettings(): CompanySettings {
    return this.getItem<CompanySettings>('company_settings', DEFAULT_COMPANY_SETTINGS);
  }

  static saveCompanySettings(settings: CompanySettings): void {
    this.setItem('company_settings', settings);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandridge.com',
      action: 'SETTINGS_UPDATED',
      entityType: 'SETTINGS',
      details: 'Company invoicing, tax rules, and bank details updated.'
    });
  }

  // Active Session / Current User
  static getCurrentUser(): AuthUser | null {
    return this.getItem<AuthUser | null>('current_auth_user', null);
  }

  static setCurrentUser(user: AuthUser | null): void {
    this.setItem('current_auth_user', user);
  }

  static logout(): void {
    const user = this.getCurrentUser();
    if (user) {
      this.logAudit({
        userId: user.id,
        userEmail: user.email,
        action: 'USER_LOGOUT',
        entityType: 'AUTH',
        details: `User ${user.fullName} logged out.`
      });
    }
    this.setItem('current_auth_user', null);
  }

  // Admin Dashboard Session Token
  static getAdminToken(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('brandidge_dashboard_token') || localStorage.getItem('brandidge_dashboard_token');
  }

  static setAdminToken(token: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('brandidge_dashboard_token', token);
    localStorage.setItem('brandidge_dashboard_token', token);
  }

  static clearAdminToken(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem('brandidge_dashboard_token');
    localStorage.removeItem('brandidge_dashboard_token');
  }

  // Vacancies Store
  static getVacancies(): Vacancy[] {
    return this.getItem<Vacancy[]>('vacancies', SEED_VACANCIES);
  }

  static saveVacancy(vacancy: Vacancy): void {
    const list = this.getVacancies();
    const idx = list.findIndex(v => v.id === vacancy.id);
    const updated = {
      ...vacancy,
      updatedAt: new Date().toISOString()
    };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      updated.createdAt = new Date().toISOString();
      list.unshift(updated);
    }
    this.setItem('vacancies', list);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandidge.com',
      action: idx >= 0 ? 'VACANCY_UPDATED' : 'VACANCY_CREATED',
      entityType: 'JOB_VACANCY',
      entityId: vacancy.id,
      details: `Vacancy "${vacancy.title}" (${vacancy.department}) was saved.`
    });
  }

  static deleteVacancy(id: string): void {
    const list = this.getVacancies().filter(v => v.id !== id);
    this.setItem('vacancies', list);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandidge.com',
      action: 'VACANCY_DELETED',
      entityType: 'JOB_VACANCY',
      entityId: id,
      details: `Vacancy ${id} was removed.`
    });
  }

  static toggleVacancyPublish(id: string): boolean {
    const list = this.getVacancies();
    const item = list.find(v => v.id === id);
    if (!item) return false;
    item.isPublished = !item.isPublished;
    item.updatedAt = new Date().toISOString();
    this.setItem('vacancies', list);
    this.logAudit({
      userId: 'admin',
      userEmail: 'admin@brandidge.com',
      action: 'VACANCY_STATUS_CHANGED',
      entityType: 'JOB_VACANCY',
      entityId: id,
      details: `Vacancy "${item.title}" publish status set to ${item.isPublished}.`
    });
    return item.isPublished;
  }

  // Contact Messages Store
  static getContactMessages(): ContactMessage[] {
    return this.getItem<ContactMessage[]>('contact_messages', SEED_CONTACT_MESSAGES);
  }

  static saveContactMessage(msg: ContactMessage): void {
    const list = this.getContactMessages();
    const idx = list.findIndex(m => m.id === msg.id);
    if (idx >= 0) {
      list[idx] = msg;
    } else {
      list.unshift(msg);
    }
    this.setItem('contact_messages', list);
  }

  static markContactMessageRead(id: string, isRead: boolean): void {
    const list = this.getContactMessages();
    const item = list.find(m => m.id === id);
    if (item) {
      item.isRead = isRead;
      this.setItem('contact_messages', list);
    }
  }

  static deleteContactMessage(id: string): void {
    const list = this.getContactMessages().filter(m => m.id !== id);
    this.setItem('contact_messages', list);
  }
}

export const SEED_VACANCIES: Vacancy[] = [
  {
    id: 'vac-1',
    title: 'Senior Frontend Web Architect',
    department: 'Engineering',
    location: 'Amsterdam / Remote',
    type: 'full-time',
    experienceLevel: 'senior',
    salaryRange: '€65,000 - €85,000 / year',
    description: 'Lead the architecture of ultra-fast, conversion-optimized web applications for innovative high-growth startups and enterprises.',
    requirements: [
      '5+ years professional experience with React, TypeScript, and modern build tooling',
      'Proven expertise in Core Web Vitals optimization and sub-second load times',
      'Strong eye for micro-interactions, responsive design, and Tailwind CSS',
      'Experience building headless architectures and component design systems'
    ],
    responsibilities: [
      'Architect modular client and admin web systems',
      'Drive sub-second performance SLAs across all production websites',
      'Conduct rigorous code reviews and mentor engineers',
      'Collaborate directly with founders on technical project roadmaps'
    ],
    isPublished: true,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-20T14:30:00Z'
  },
  {
    id: 'vac-2',
    title: 'Lead UI/UX Product Designer',
    department: 'Design',
    location: 'Remote (EU / US Timezones)',
    type: 'full-time',
    experienceLevel: 'lead',
    salaryRange: '€60,000 - €80,000 / year',
    description: 'Design distinctive, award-winning visual identities and high-converting web interfaces that position new brands as industry leaders.',
    requirements: [
      '4+ years designing high-end digital products, SaaS, or luxury boutique websites',
      'Mastery of Figma, interactive prototyping, and design systems',
      'Deep understanding of conversion psychology and typographic hierarchy',
      'Portfolio demonstrating editorial typography and modern dark-mode aesthetics'
    ],
    responsibilities: [
      'Produce bespoke wireframes, interactive prototypes, and design specs',
      'Lead design discovery sessions with client executives',
      'Define brand identity guidelines, color palettes, and typographic tokens',
      'Partner closely with frontend engineers to ensure pixel-perfect fidelity'
    ],
    isPublished: true,
    createdAt: '2026-08-10T09:00:00Z',
    updatedAt: '2026-08-22T11:15:00Z'
  },
  {
    id: 'vac-3',
    title: 'Growth Marketing & SEO Specialist',
    department: 'Growth',
    location: 'Hybrid (Amsterdam)',
    type: 'contract',
    experienceLevel: 'mid',
    salaryRange: '€45,000 - €58,000 / year',
    description: 'Spearhead technical SEO audits, schema structures, and organic discovery strategies to ensure newly launched websites dominate search rankings.',
    requirements: [
      '3+ years in technical SEO, Google Search Console, and schema markup',
      'Track record ranking high-competition keywords in competitive niches',
      'Experience with international multi-lingual SEO (EN, NL, DE, ES)',
      'Familiarity with analytics pipelines and conversion funnel tracking'
    ],
    responsibilities: [
      'Audit sitemaps, structured data, canonicals, and Core Web Vitals impact',
      'Develop keyword maps and content strategies for clients',
      'Set up conversion tracking in Google Analytics 4 and custom dashboards',
      'Provide monthly search performance reports to client founders'
    ],
    isPublished: true,
    createdAt: '2026-08-15T12:00:00Z',
    updatedAt: '2026-08-24T16:00:00Z'
  },
  {
    id: 'vac-4',
    title: 'Junior Technical Writer & Content Strategist',
    department: 'Marketing',
    location: 'Remote',
    type: 'part-time',
    experienceLevel: 'junior',
    salaryRange: '€28,000 - €36,000 (pro-rata)',
    description: 'Produce high-clarity technical documentation, case studies, and compelling value propositions for client projects.',
    requirements: [
      '1+ years technical copywriting or content creation experience',
      'Exceptional written English with ability to translate tech into clear benefits',
      'Basic understanding of web technologies and digital marketing'
    ],
    responsibilities: [
      'Draft case study breakdowns for delivered client websites',
      'Write engaging copywriting drafts for new business clients',
      'Maintain documentation and agency knowledge bases'
    ],
    isPublished: false,
    createdAt: '2026-08-18T15:00:00Z',
    updatedAt: '2026-08-18T15:00:00Z'
  }
];

export const SEED_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'Sophia Martinez',
    email: 'sophia@aurapharma.com',
    company: 'Aura Pharma Innovations',
    phone: '+1 (415) 890-4100',
    websiteUrl: 'https://aurapharma.com',
    subject: 'Multi-Language Architecture & Rebranding',
    message: 'Hello Brandidge team, we are expanding our biotech diagnostics venture into the European market next quarter. We need a modern, multi-language web platform (EN, NL, DE) with sub-second page loads. Could we schedule a discovery call?',
    isRead: false,
    submittedAt: '2026-08-24T08:30:00Z'
  },
  {
    id: 'msg-2',
    fullName: 'Hendrik van Dijk',
    email: 'hendrik@dijkman-consulting.nl',
    company: 'Dijkman Consulting Group',
    phone: '+31 20 555 8920',
    websiteUrl: 'https://dijkman-consulting.nl',
    subject: 'Client Portal & Core Web Vitals Tuning',
    message: 'Good morning! Our current WordPress site is slow (FCP 3.2s) and fails mobile Core Web Vitals. We are interested in your decoupled architecture and customer portal for our B2B tax clients.',
    isRead: false,
    submittedAt: '2026-08-23T14:15:00Z'
  },
  {
    id: 'msg-3',
    fullName: 'Alexandre Dupont',
    email: 'a.dupont@atelier-luxe.fr',
    company: 'Atelier Dupont Haute Horlogerie',
    phone: '+33 1 42 68 55 12',
    websiteUrl: 'https://atelierdupont.fr',
    subject: 'Custom E-Commerce & Brand Identity',
    message: 'We are launching a limited collection of bespoke luxury timepieces. Looking for an ultra-clean, minimalist dark aesthetic with interactive 3D model support and Stripe checkout.',
    isRead: true,
    submittedAt: '2026-08-21T11:00:00Z'
  }
];
