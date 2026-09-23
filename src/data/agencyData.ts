import { ServiceItem, ProcessStep, PricingPlan, MaintenancePlan, PortfolioProject, BlogPost, FaqItem, LeadSubmission, Testimonial } from '../types';

export const AGENCY_INFO = {
  name: "Brandidge",
  parentCompany: "Brandidge",
  tagline: "brandidge Bridging Brands to Growth.",
  subtitle: "We craft custom, lightning-fast, high-converting websites and digital foundations tailored to help new businesses launch, get found, build trust, and scale effortlessly.",
  promotionBadge: "100% Free Strategy Session • 1 Month Free Maintenance Included",
  supportEmail: "hello@brandidge.com",
  phone: "+1 (888) 782-7863",
  location: "San Francisco, CA & Global Remote",
  heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-aWIdIH5bUCECXp36NfAHVdGuxDa6DSATafKjVb6rdMGTEosIvrWvDAWtViAV4RS23WQIkVMiIQmlvmjKiWV7ItAFZtgdeE6jAI4zh8dcUxxg6GFSaGOusHd6jQb_Roe7kocVpPyDZd20IeIDJgIuJ5ykZrGFG2V43P9zGGBQo-nDDCF-Wki1fznASZFuPPsyvu11Pa6fAEYcJL1D8tgmqMFitjudZ78hh7_-U5HnMfgIlXJgiv1Nw",
  aboutImage: "/src/assets/images/brandidge_team_studio_1787512332915.jpg",
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step-1-discovery",
    stepNumber: "01",
    title: "Discovery",
    subtitle: "Understanding your vision, business objectives & target audience",
    description: "Every standout business starts with clarity. We kick off with a completely free 30-minute discovery session to deeply unpack your business model, customer pain points, competitor gaps, and brand ambitions.",
    deliverables: [
      "100% Free Technical & Strategy Discovery Call",
      "Competitor Landscape & Market Opportunity Audit",
      "User Persona & Customer Journey Mapping",
      "Technical Architecture & Feature Scope Definition"
    ],
    duration: "Day 1 – 3",
    iconName: "Compass",
    highlightBadge: "100% Free Consultation",
    milestoneQuote: "We align your business vision with tangible technical milestones before a single line of code is written.",
    keyOutputs: [
      { label: "Commitment", value: "Zero (100% Free Session)" },
      { label: "Outcome", value: "Crystal Clear Roadmap" },
      { label: "Timeline", value: "30-Min Live Deep Dive" }
    ]
  },
  {
    id: "step-2-proposal",
    stepNumber: "02",
    title: "Proposal & Tailored Pricing",
    subtitle: "Custom-tailored scope, transparent pricing & delivery roadmap",
    description: "Because every new business is unique, we never force rigid, one-size-fits-all packages. Following our free meeting, we present a transparent, itemized proposal detailing exact deliverables, timeline, and tailored investment options.",
    deliverables: [
      "Itemized Technical Specification Document",
      "Transparent Milestone-Based Pricing Options",
      "Interactive Wireframe Architecture & Sitemap",
      "Guaranteed Delivery Date Commitment"
    ],
    duration: "Day 4 – 6",
    iconName: "FileCheck2",
    highlightBadge: "Transparent Scoping",
    milestoneQuote: "No hidden charges or surprise invoices. Complete clarity on investment, deliverables, and timelines.",
    keyOutputs: [
      { label: "Clarity", value: "Itemized Deliverables" },
      { label: "Structure", value: "Fixed-Price Guarantee" },
      { label: "Kickoff", value: "Contract & Slack Setup" }
    ]
  },
  {
    id: "step-3-build",
    stepNumber: "03",
    title: "Build & Development",
    subtitle: "Modern UI/UX design systems, lightning-fast code & technical SEO",
    description: "Our engineering studio moves fast with agile sprints. We design high-converting visual systems and develop clean, responsive, sub-second web applications with embedded technical SEO and accessibility.",
    deliverables: [
      "Bespoke High-Fidelity UI/UX & Responsive Prototypes",
      "Clean TypeScript / React Modern Architecture",
      "Comprehensive On-Page & Technical SEO Foundation",
      "Headless CMS Configuration & Easy Content Controls"
    ],
    duration: "Week 2 – 4",
    iconName: "Code2",
    highlightBadge: "Sub-Second Speed",
    milestoneQuote: "We engineer ultra-fast websites that convert passive visitors into paying customers with zero bloat.",
    keyOutputs: [
      { label: "Speed", value: "< 0.8s Target LCP" },
      { label: "Quality", value: "100% Mobile Responsive" },
      { label: "Transparency", value: "Live Staging Previews" }
    ]
  },
  {
    id: "step-4-launch",
    stepNumber: "04",
    title: "Launch & Validation",
    subtitle: "Rigorous QA, DNS handover, Google indexing & analytics verification",
    description: "Launch day is executed with precision. We run automated cross-browser testing, verify conversion tracking and form pipelines, configure custom domains and SSL, and register your site with Google Search Console.",
    deliverables: [
      "Comprehensive Cross-Device & Cross-Browser QA",
      "DNS, Edge CDN & SSL Certificate Deployment",
      "Google Search Console & XML Sitemap Indexation",
      "Live Conversion Tracking & Form Pipeline Verification"
    ],
    duration: "Week 4 – 5",
    iconName: "Rocket",
    highlightBadge: "Zero Downtime",
    milestoneQuote: "Your new business goes live with instant indexation, verified analytics, and rock-solid edge security.",
    keyOutputs: [
      { label: "Security", value: "A+ SSL & Edge Shield" },
      { label: "Indexation", value: "Google & Schema Verified" },
      { label: "Handoff", value: "Full Admin Training" }
    ]
  },
  {
    id: "step-5-maintenance",
    stepNumber: "05",
    title: "Free 1-Month Maintenance",
    subtitle: "Post-launch peace of mind, continuous monitoring & optimization",
    description: "We never leave you hanging after launch. Every project includes 1 Full Month of Complimentary Maintenance ($450 value) — including 24/7 uptime monitoring, security patching, SEO audits, and developer tweaks.",
    deliverables: [
      "30 Days of 100% Complimentary Maintenance ($450 Value)",
      "24/7 Uptime & Performance Health Monitoring",
      "Automated Daily Cloud Backups & Instant Rollbacks",
      "Priority Developer Support for Quick Revisions & Tweaks"
    ],
    duration: "Post-Launch (30 Days Free)",
    iconName: "ShieldCheck",
    highlightBadge: "Included 100% Free",
    milestoneQuote: "Launch with confidence knowing your technical team is right beside you for your crucial first month in business.",
    keyOutputs: [
      { label: "Cost", value: "$0 (Included Free)" },
      { label: "Uptime SLA", value: "99.99% Availability" },
      { label: "Support", value: "Priority Dedicated Help" }
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-design-dev",
    title: "Web Design & Development",
    category: "Full Architecture",
    badge: "Core Engineering",
    description: "Custom UI/UX and high-performance front-end architecture built with modern headless tech, bespoke design systems, and lightning-fast load times.",
    deliverables: [
      "Custom responsive design system & UI prototype",
      "React/TypeScript static & dynamic architecture",
      "Tailored headless CMS integration & training",
      "Accessible (WCAG AA) component library",
      "Zero-fluff semantic HTML & Core Web Vitals < 0.8s"
    ],
    timeline: "3–6 weeks",
    idealFor: "High-growth brands needing authoritative digital presence",
    pricingNote: "Discussed in Free Call",
    colSpan: "col-span-1 md:col-span-2",
    iconName: "Code2"
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    category: "Organic Growth",
    badge: "High Visibility",
    description: "Technical SEO and programmatic search structure engineered to dominate high-intent keywords and drive organic qualified traffic.",
    deliverables: [
      "Deep technical site audit & structured JSON-LD data",
      "High-intent keyword matrix & competitor gap analysis",
      "Core Web Vitals & mobile crawlability fixes",
      "Local schema & Google Search Console indexing setup"
    ],
    timeline: "2–4 weeks",
    idealFor: "Businesses seeking reliable top-rank search acquisition",
    pricingNote: "Discussed in Free Call",
    colSpan: "col-span-1",
    iconName: "SearchCheck"
  },
  {
    id: "speed-tuning",
    title: "Speed & Performance Tuning",
    category: "System Speed",
    badge: "Sub-Second LCP",
    description: "Full audit and remediation of slow load times, bloated scripts, and poor caching to guarantee instantaneous page speeds.",
    deliverables: [
      "Asset minification, tree-shaking & WebP/AVIF compression",
      "Server edge caching & global CDN routing",
      "JavaScript execution & rendering pipeline optimization",
      "Elimination of cumulative layout shifts (CLS < 0.01)"
    ],
    timeline: "1–2 weeks",
    idealFor: "Existing sites suffering from high bounce rates and low conversion",
    pricingNote: "Discussed in Free Call",
    colSpan: "col-span-1",
    iconName: "Zap"
  },
  {
    id: "branding-identity",
    title: "Logo Design & Branding",
    category: "Visual Identity",
    badge: "Complete Identity",
    description: "Cohesive visual identity systems, typography scales, vector logo suites, and comprehensive brand books that command market trust.",
    deliverables: [
      "Primary, secondary & responsive mark variations",
      "Comprehensive typography & mathematical color hierarchy",
      "Exportable vector asset suite (SVG, PNG, PDF, Print)",
      "Digital Brand Guideline manual & component rules"
    ],
    timeline: "2–3 weeks",
    idealFor: "New ventures or companies undergoing strategic rebranding",
    pricingNote: "Discussed in Free Call",
    colSpan: "col-span-1 md:col-span-2",
    iconName: "Palette"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "foundation",
    name: "Foundation",
    tagline: "Essential architecture for growing businesses ready to establish market authority.",
    price: "$3,500",
    features: [
      "Custom 5-Page High-Speed Website",
      "Mobile-First Responsive Layout",
      "Basic On-Page SEO & Meta Architecture",
      "Fast DNS & Cloud Hosting Configuration",
      "Standard Contact & Lead Capture Forms",
      "14 Days Post-Launch Support"
    ],
    maintenanceIncluded: "1 Month Free Basic Maintenance Included",
    ctaText: "Select Foundation",
    popular: false
  },
  {
    id: "growth-bundle",
    name: "Web + SEO + Branding",
    tagline: "The complete flagship bundle: bespoke web design, deep technical SEO, and brand identity.",
    price: "$8,500",
    originalPrice: "$10,200",
    badge: "MAXIMUM VALUE • SAVE $1,700",
    featured: true,
    popular: true,
    features: [
      "Full Custom Website (Unlimited Core Pages)",
      "Advanced Technical & On-Page SEO Architecture",
      "Complete Logo Design & Brand Identity System",
      "Sub-Second Page Speeds & Optimized Core Web Vitals",
      "Custom CMS Setup & Tailored Client Video Training",
      "Structured Schema Data (JSON-LD) for Rich Snippets",
      "1 Month Free Premium Maintenance ($450 Value)",
      "Dedicated Slack Channel & Priority Tech Support"
    ],
    maintenanceIncluded: "1 Month Free Premium Maintenance Included",
    ctaText: "Book This Bundle"
  },
  {
    id: "architecture-enterprise",
    name: "Architecture Enterprise",
    tagline: "Bespoke digital systems and custom web application engineering for industry leaders.",
    price: "Custom",
    badge: "Custom Scoped",
    features: [
      "Bespoke Full-Stack Web App Development",
      "Enterprise SEO & Programmatic Content Systems",
      "Complex API Integrations & Database Architecture",
      "High-Load Redundancy & Global CDN Setup",
      "Dedicated Technical Architect & Account Manager",
      "Enterprise SLA with 99.99% Availability Guarantee"
    ],
    maintenanceIncluded: "Custom SLA & 24/7 Monitoring Included",
    ctaText: "Contact Architectural Sales"
  }
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: "maint-standard",
    name: "Standard Maintenance",
    price: "$150",
    billing: "per month",
    features: [
      "High-Performance Cloud Hosting & SSL",
      "Weekly Core, Plugin & Security Patches",
      "Daily Automated Cloud Backups",
      "24/7 Uptime Monitoring & Rapid Recovery",
      "Monthly Performance & Health Report"
    ]
  },
  {
    id: "maint-premium",
    name: "Premium Maintenance & SEO",
    price: "$450",
    billing: "per month",
    badge: "Recommended",
    features: [
      "Everything in Standard Maintenance",
      "Monthly Technical SEO Audit & Crawl Fixes",
      "2 Hours Dedicated Monthly Developer Time",
      "Keyword Ranking & Organic Traffic Tracking",
      "Priority 2-Hour Response SLA",
      "Continuous Core Web Vitals Optimization"
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "aura-financial",
    title: "Aura Financial Platform",
    client: "Aura Capital Group",
    category: "Fintech",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOK9_FBDJao0lxhJp9sl3x8047ZwgXTUxX_3E7HZBpERHHP-wFK9PZlfvc9SdFMFNiLR02_y_EiUTT2gOiC3eUwf_vzzkJTfw1JyL_zA1nB-McjZAV2gY-lVv2zG_E1OWAIvyyoPwgf51GJ_jr21_MOZr0JtAdea4rVZ-8uE4Omv75Sv4GgXlEvSm7imLXyra6d1apQSs8Vx8EiwUCWU8IeNkZPdiFsDzK3uJRaH-tmTfOeXPmwwHL8Q",
    colSpan: "col-span-1 lg:col-span-2",
    description: "Next-generation institutional wealth management portal with real-time portfolio telemetry, institutional security protocols, and sub-10ms response execution.",
    metrics: [
      { label: "Execution Latency", value: "-94%", trend: "180ms → 10ms" },
      { label: "System Availability", value: "99.999%", trend: "Zero downtime" },
      { label: "Transaction Throughput", value: "3.4x", trend: "12k tx/sec" }
    ],
    challenge: "Aura's legacy monolith suffered from query bottlenecking, complex client onboarding flows, and frequent degradation during market volatility spikes.",
    solution: "Re-engineered from ground up with event-driven microservices, distributed Redis caching, and a responsive React frontend utilizing zero-runtime Tailwind CSS.",
    architecturalHighlights: [
      "Event Sourcing with Kafka distributed streaming",
      "Kubernetes edge orchestration across 4 global regions",
      "Encrypted biometric auth layer with WebAuthn",
      "Sub-second Core Web Vitals with Grade-A Performance"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Redis", "Kafka", "PostgreSQL"],
    liveUrl: "https://aura-financial.demo"
  },
  {
    id: "nexus-routing",
    title: "Nexus Routing Logistics",
    client: "Nexus Global Fleet",
    category: "Logistics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa27NWSn4HoS1-FsgtK9_VxnBip_RK6oEzdvrm7k11evl1hLTqQGU7ARBX1GzrIAfPnV80sQqtSw6_vZ48Ac8dDEiGcAFqKT1PgT0mGvawLy1rRcL9xsBFakmzdf94aHdYQC8iwX4hSdr2kTWUmAzYLIslSTMqRgdZbW15IGMIue-K142byE-KXHqBIdBYVaOPQykEQ2zjvI6PcbZWl1zhOsJ3ISC2kEKATgbHmJlOxmhQslsrHEjR_Q",
    colSpan: "col-span-1",
    description: "Enterprise fleet telematics dashboard visualizing over 45,000 live freight vehicles with predictive ETA recalculation algorithms.",
    metrics: [
      { label: "Dispatch Efficiency", value: "+42%", trend: "Automated routing" },
      { label: "Fuel Cost Reduction", value: "-18%", trend: "Optimized paths" },
      { label: "Live Telemetry FPS", value: "60 FPS", trend: "WebGL rendering" }
    ],
    challenge: "Handling continuous GPS streams from thousands of moving vehicles without degrading the user interface or freezing browser rendering threads.",
    solution: "Implemented WebGL map canvas rendering, Web Workers for trajectory calculation, and high-frequency WebSocket backpressure management.",
    architecturalHighlights: [
      "Hardware-accelerated Mapbox GL integration with custom shaders",
      "Web Worker thread offloading for non-blocking geo-computations",
      "Binary Protobuf protocol over WebSockets for minimal payload size"
    ],
    techStack: ["React", "Mapbox GL", "WebSockets", "Protobuf", "Go", "Docker"],
    liveUrl: "https://nexus-fleet.demo"
  },
  {
    id: "vanguard-retail",
    title: "Vanguard Direct E-Commerce",
    client: "Vanguard Luxury Goods",
    category: "E-Commerce",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYLB5bnWLPpaSKHb8vLQm_uqyiLHsdWXbb8oVg2wvcMj_ra1pUprQthjuNHAm8n0_qMLtyaetISYBn_rcmgU6xf9L3URF7P7Ukma0xb5ZJ97WWgGErUf4KZLrmZO9S6i1yDl5PhFiNaQgI4pT5zg6blycQADjUrG8mFDKnPjgWJJC9ibCdsDLGeaO_cnreGl2xxFsSIK5duvwzqwzEuMgzHeyJEJt8LIEwGo56T4b8Qy8dXN0RBXKYoQ",
    colSpan: "col-span-1",
    description: "Headless luxury storefront optimized for ultra-high conversion, international multi-currency settlement, and instant product visualizers.",
    metrics: [
      { label: "Organic Traffic Growth", value: "+210%", trend: "Top 3 search rank" },
      { label: "Mobile Conversion Rate", value: "+68%", trend: "1.8% → 3.02%" },
      { label: "Page Load Time", value: "0.6s", trend: "Global average" }
    ],
    challenge: "The existing Shopify theme was laden with third-party app scripts, causing 4.2-second load times and severe cart abandonment on mobile.",
    solution: "Transitioned to a headless Shopify Storefront API implementation with edge server-side rendering, instant pre-fetching, and bespoke checkout styling.",
    architecturalHighlights: [
      "Edge-rendered product catalog with stale-while-revalidate caching",
      "Automated image pipeline serving next-gen AVIF imagery",
      "Dynamic multi-currency and tax localization engine"
    ],
    techStack: ["React", "Shopify Storefront API", "Tailwind CSS", "Vite", "Edge Workers"],
    liveUrl: "https://vanguard-luxury.demo"
  },
  {
    id: "vertex-analytics",
    title: "Vertex Analytics Engine",
    client: "Vertex Cloud AI",
    category: "SaaS",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEZXS63XNVBTC3cOpyLyAIvSul9cB3aE8bC01wESI06_6rK0dg6VZdmzQoV2Img32c133E-UE2ss_mCdPssBAZbPh6E0zrkNh7LwaBOFdqFEkfnSoNnY2eFHxNgd9Cq4-cLr3cC-iJkqV32DAq2UleLkn3WBu268u7aFJdH8mSlbN0dJ4iUB8TDheaPbddXBXPPqIkvTTaHqciNv0KcKN9Sq0msmOGW5CSB8ypOxtimNQuG1Gn156w7w",
    colSpan: "col-span-1 lg:col-span-2",
    description: "Cloud-native visual analytics workstation enabling enterprise data scientists to build, train, and deploy real-time forecasting pipelines.",
    metrics: [
      { label: "Data Pipeline Velocity", value: "5x", trend: "Parallel execution" },
      { label: "Enterprise Churn", value: "< 0.4%", trend: "Record retention" },
      { label: "Interactive Queries", value: "< 50ms", trend: "Columnar OLAP" }
    ],
    challenge: "Rendering dense interactive multidimensional datasets with hundreds of thousands of data points without UI frame drops.",
    solution: "Built a custom Canvas2D charting engine with virtualized data windows and progressive chunk rendering.",
    architecturalHighlights: [
      "Virtualized data viewport with zero DOM thrashing",
      "Dynamic schema generator with automatic type inference",
      "Collaborative multi-user session state synchronization"
    ],
    techStack: ["React", "TypeScript", "Canvas2D", "WebAssembly", "ClickHouse"],
    liveUrl: "https://vertex-ai.demo"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "architecting-modern-web-solutions",
    slug: "architecting-modern-web-solutions-for-high-end-agencies",
    title: "Architecting Modern Web Solutions for High-End Agencies",
    subtitle: "A deep dive into system performance, decoupled architecture, and zero-compromise SEO engineering.",
    author: {
      name: "Elena Rostova",
      role: "Lead Digital Architect & Founding Partner",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkJlZHvXz4Wa02pc8E84uo9j82xd2K9FuwW8fNSPbtT3uLYQ0MCViogyMeauT23xT93N8AnKHrEPvT4tLswGn6qTfKTCvlk2UtxOd1Dino_HQmc9QmweEmg1pU86kbUEbXexCqD0OawfhiyFhZ61Wxv19Kcvmi1kE-SGiRgJG8UUkupeCBaPL6H9_SdNvZ-hcKxS1eM0DCqUymKV4uRywVyy3iqp08q_tqRT2w0i4CvijbMJkurax9Nw"
    },
    publishedDate: "October 24, 2025",
    readTime: "7 min read",
    category: "Architecture & Performance",
    featuredImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYLB5bnWLPpaSKHb8vLQm_uqyiLHsdWXbb8oVg2wvcMj_ra1pUprQthjuNHAm8n0_qMLtyaetISYBn_rcmgU6xf9L3URF7P7Ukma0xb5ZJ97WWgGErUf4KZLrmZO9S6i1yDl5PhFiNaQgI4pT5zg6blycQADjUrG8mFDKnPjgWJJC9ibCdsDLGeaO_cnreGl2xxFsSIK5duvwzqwzEuMgzHeyJEJt8LIEwGo56T4b8Qy8dXN0RBXKYoQ",
    diagramImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHeP0gqajcnMqbyClgLLTxBcRjJ76IAzw96qnYM7SHh7TZVW4VL3i5if7mm75P8eRxib4NGPD-CDOoxn_NYA-2wJsFpuEQto71lMWRjuXDN75JK4BYIublpjLvt1aaErY9HGw38vGtrBumE0dQ_Ty63VkCS2Vixw_ygv329Wt75JMAjvwxH4PyhL3tGon2h0RvCiwJfaq1xq84MUFMgZKUElQCbLr-dvLSH0fXBHQh35np19n66IGUlA",
    summary: "Why traditional bloated WordPress templates fail modern search algorithms, and how decoupled, type-safe architectures generate compounding revenue.",
    content: {
      introduction: "In today's hyper-competitive digital landscape, web development can no longer be treated as mere digital paint on a generic template. The modern web requires an architectural discipline that balances sub-second responsiveness, structured search discovery, and long-term maintainability.",
      sections: [
        {
          heading: "1. The Hidden Cost of Monolithic Templates",
          body: "Most agencies deliver websites built on bloated drag-and-drop builders that inject hundreds of kilobytes of unused CSS and JavaScript. This directly undermines Google's Core Web Vitals (Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift). When page load exceeds 2 seconds, conversion drops by over 50%.",
          keyTakeaways: [
            "Over 73% of web page weight is unexecuted legacy code",
            "Core Web Vitals are now direct Google ranking factors",
            "Decoupled static generation delivers instantaneous edge speeds"
          ]
        },
        {
          heading: "2. Decoupled Architecture & Headless Precision",
          body: "By separating the presentation layer from the content management database, we achieve infinite scalability and bulletproof security. There is no SQL database exposed to the public internet, eliminating typical injection attacks while enabling global edge CDN caching.",
          codeSnippet: `// Standard Edge Cache Header Configuration
export const edgeConfig = {
  headers: {
    'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=86400',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  }
};`
        },
        {
          heading: "3. Semantic Schema and Structured Data as First-Class Citizens",
          body: "Search engines no longer merely index text strings; they parse semantic entities and knowledge graphs. Every page engineered at Nexus Arch includes rich JSON-LD schemas representing the organization, services, pricing matrices, and author authority.",
          keyTakeaways: [
            "Rich snippet eligibility increases CTR in SERPs by 35%",
            "Structured schema bridges the gap to AI search engines (Search Generative Experience)",
            "Automated sitemap generation ensures rapid crawl indexation"
          ]
        }
      ],
      conclusion: "When digital infrastructure is engineered with architectural rigor, marketing ROI ceases to be an elusive gamble and becomes a predictable, scalable asset for your enterprise."
    }
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: "free-meeting",
    question: "Is the initial strategy session really 100% free?",
    answer: "Yes, completely free with zero obligation. In our 30-minute discovery call, we analyze your new business goals, target audience, and website technical requirements, and outline a tailored roadmap. You will receive an exact bespoke proposal and timeline at no cost.",
    category: "Pricing"
  },
  {
    id: "pricing-structure",
    question: "Why do we discuss pricing during the scheduled meeting rather than fixed packages?",
    answer: "Every new business has distinct objectives, technical requirements, and growth trajectories. Rather than forcing you into rigid cookie-cutter tiers with features you don't need, we tailor the project scope and investment directly to what will generate maximum ROI for your business. We provide a transparent, itemized proposal immediately following our call.",
    category: "Pricing"
  },
  {
    id: "timeline",
    question: "What is the typical timeline for an end-to-end website build?",
    answer: "Most custom builds for new businesses are completed within 3 to 5 weeks from kickoff to deployment. Our process follows 5 clear steps: Discovery → Proposal → Build → Launch → 1 Month Free Maintenance.",
    category: "Process"
  },
  {
    id: "free-maintenance",
    question: "How does the '1 Month Free Maintenance' promotion work?",
    answer: "Every new build launched with Brandidge comes with 30 days of 100% complimentary maintenance ($450 value). This includes daily cloud backups, 24/7 uptime monitoring, security patching, SEO audits, and dedicated developer time for any adjustments. Zero lock-in.",
    category: "Maintenance"
  },
  {
    id: "seo-guarantees",
    question: "What is included in your Technical SEO implementation?",
    answer: "We engineer structured schema markup (JSON-LD), XML sitemaps, semantic HTML hierarchies, canonical tagging, OpenGraph metadata, image compression (AVIF/WebP), and sub-second load times (<0.8s) so your new business gets discovered quickly on Google.",
    category: "Technical"
  }
];

export const INITIAL_LEADS: LeadSubmission[] = [
  {
    id: "lead-101",
    fullName: "Marcus Sterling",
    email: "marcus@sterlingwealth.com",
    company: "Sterling Ventures",
    phone: "+1 (415) 890-2134",
    websiteUrl: "https://sterlingventures.io",
    serviceInterest: "New Business Digital Launch",
    budgetRange: "$7,500 - $12,000",
    timeline: "Within 3 weeks",
    primaryGoal: "Complete web build and technical SEO for new advisory launch",
    projectBrief: "Launching a new fintech advisory firm. Need high-converting, sub-second speed website with custom branding and client portal intake.",
    selectedDate: "2026-08-25",
    selectedTimeSlot: "10:00 AM PST",
    meetingStatus: "upcoming",
    meetingLink: "https://meet.google.com/brd-mste-str",
    callNotes: "High intent founder. Focus on Trust Signals, compliance badges, and fast booking CTA.",
    clientStage: "meeting_scheduled",
    status: "scheduled",
    submittedAt: "2026-08-24T02:30:00Z"
  },
  {
    id: "lead-102",
    fullName: "Dr. Evelyn Vance",
    email: "evelyn@biogenesis-labs.io",
    company: "BioGenesis Labs",
    phone: "+1 (617) 555-0199",
    websiteUrl: "https://biogenesis.io",
    serviceInterest: "Custom Web Application",
    budgetRange: "$15,000 - $22,000",
    timeline: "1-2 months",
    primaryGoal: "Intake portal and responsive brand architecture for bio venture",
    projectBrief: "Need clean, modern architecture with fast mobile performance, scientific data tables, and easy content editing.",
    selectedDate: "2026-08-26",
    selectedTimeSlot: "01:30 PM PST",
    meetingStatus: "upcoming",
    meetingLink: "https://meet.google.com/brd-evan-bio",
    callNotes: "Proposal drafted for Phase 1 & 2. Ready to sign master service agreement.",
    clientStage: "proposal_active",
    status: "proposal",
    submittedAt: "2026-08-23T09:15:00Z"
  },
  {
    id: "lead-103",
    fullName: "Liam O'Connor",
    email: "liam@apexlogistics.co",
    company: "Apex Global Logistics",
    phone: "+1 (312) 440-9821",
    websiteUrl: "https://apexlogistics.co",
    serviceInterest: "Custom 5-Page Conversion Website",
    budgetRange: "$6,000",
    timeline: "Completed (Launched)",
    primaryGoal: "Full responsive re-platform and Core Web Vitals optimization",
    projectBrief: "Migrated from legacy WordPress to decoupled high-performance Next.js architecture.",
    selectedDate: "2026-08-10",
    selectedTimeSlot: "11:30 AM PST",
    meetingStatus: "completed",
    callNotes: "Site launched on Aug 18. 1-Month Free Maintenance program currently active.",
    clientStage: "maintenance_active",
    maintenanceEndDate: "2026-09-18",
    contractValue: "$6,000",
    status: "won",
    submittedAt: "2026-08-08T16:00:00Z"
  },
  {
    id: "lead-104",
    fullName: "Sophia Chen",
    email: "sophia@novaaesthetic.com",
    company: "Nova Aesthetic Clinic",
    phone: "+1 (212) 789-5512",
    websiteUrl: "https://novaaesthetic.com",
    serviceInterest: "Brand Identity & Design System",
    budgetRange: "$4,500",
    timeline: "Within 2 weeks",
    primaryGoal: "Luxury brand mark, typographic guidelines, and clinic booking landing page",
    projectBrief: "High-end medical aesthetics studio in Manhattan. Requires luxury dark-mode aesthetics and instant booking sync.",
    selectedDate: "2026-08-24",
    selectedTimeSlot: "03:00 PM PST",
    meetingStatus: "upcoming",
    meetingLink: "https://meet.google.com/brd-nova-clin",
    callNotes: "Discovery meeting happening today. Prepare portfolio samples of luxury wellness clients.",
    clientStage: "meeting_scheduled",
    status: "scheduled",
    submittedAt: "2026-08-23T18:45:00Z"
  },
  {
    id: "lead-105",
    fullName: "Elena Rostova",
    email: "elena@vanguardrobotics.de",
    company: "Vanguard Robotics",
    phone: "+49 89 2018 4390",
    websiteUrl: "https://vanguardrobotics.de",
    serviceInterest: "Technical SEO & Performance Architecture",
    budgetRange: "$8,000",
    timeline: "Active Build (Sprint 2)",
    primaryGoal: "Multi-language European SEO and sub-0.8s load times across DACH region",
    projectBrief: "Autonomous warehouse robotics company expanding from Munich to global market.",
    selectedDate: "2026-08-14",
    selectedTimeSlot: "09:00 AM PST",
    meetingStatus: "completed",
    callNotes: "Kickoff complete. Wireframes approved, development 60% done.",
    clientStage: "in_development",
    contractValue: "$8,000",
    status: "won",
    submittedAt: "2026-08-12T11:20:00Z"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    quote: "Brandidge was the launchpad our new venture needed. The free strategy meeting gave us total clarity, and the 5-step process was flawless. Inbound leads grew by 210% in our first 60 days.",
    clientName: "David Vance",
    clientRole: "Founding Partner",
    company: "Aura Capital Group",
    metric: "+210% Inbound Leads",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "t2",
    quote: "The site speed and SEO architecture brought our new product to rank #1 on Google for high-intent keywords. The 1-month free maintenance made the launch completely stress-free.",
    clientName: "Sarah Lindqvist",
    clientRole: "VP of Growth",
    company: "Vanguard Direct",
    metric: "0.6s Speed & #1 Rank",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "t3",
    quote: "Starting a new business is overwhelming, but Brandidge's process from Discovery to Launch was the smoothest experience we've had with any technical team.",
    clientName: "Thomas Wright",
    clientRole: "Founder & CEO",
    company: "Kinetic Health",
    metric: "100% On-Time Delivery",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  }
];
