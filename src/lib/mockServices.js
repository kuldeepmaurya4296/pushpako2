export const mockServices = [
  {
    id: '1',
    title: 'Aircraft Solutions',
    slug: 'aircraft-solutions',
    description: 'Hydrogen-electric aircraft platforms optimized for cargo, logistics, and special mission operations.',
    category: 'Products',
    status: 'active', // active, development, discontinued
    icon: 'Plane',
    featuredImage: '/aircraft-enterprise.jpg',
    images: ['/aircraft-enterprise.jpg', '/aircraft-premium.jpg', '/aircraft-standard.jpg'],
    pricing: {
      standard: { price: 2500000, currency: 'USD', period: 'one-time' },
      premium: { price: 3200000, currency: 'USD', period: 'one-time' },
      enterprise: { price: 4500000, currency: 'USD', period: 'one-time' },
    },
    features: [
      'Hydrogen-electric propulsion',
      'Autonomous flight capability',
      'Cargo capacity up to 400kg',
      'Range up to 400km',
      'Vertical takeoff and landing',
      'Real-time monitoring',
    ],
    testimonials: [
      {
        id: 'test1',
        name: 'Rajesh Kumar',
        company: 'LogisticsCorp',
        rating: 5,
        comment: 'Exceptional performance and reliability. Transformed our delivery operations.',
        date: '2024-01-15',
      },
    ],
    specifications: {
      maxPayload: '400kg',
      range: '400km',
      endurance: '4 hours',
      maxSpeed: '200km/h',
      fuelType: 'Hydrogen',
      certification: 'Under review',
    },
    bookingUrl: '/contact-us?service=aircraft-solutions',
    inquirySystem: 'integrated', // integrated, external, none
    isPopular: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Fleet Operations',
    slug: 'fleet-operations',
    description: 'End-to-end fleet monitoring, operational analytics, and performance optimization.',
    category: 'Services',
    status: 'active',
    icon: 'Network',
    featuredImage: '/fleet-enterprise.jpg',
    images: ['/fleet-enterprise.jpg', '/fleet-premium.jpg', '/fleet-standard.png'],
    pricing: {
      basic: { price: 5000, currency: 'USD', period: 'monthly' },
      professional: { price: 15000, currency: 'USD', period: 'monthly' },
      enterprise: { price: 50000, currency: 'USD', period: 'monthly' },
    },
    features: [
      '24/7 fleet monitoring',
      'Real-time analytics dashboard',
      'Predictive maintenance alerts',
      'Performance optimization',
      'Cost tracking and reporting',
      'API integration',
    ],
    testimonials: [
      {
        id: 'test2',
        name: 'Priya Sharma',
        company: 'AeroFleet Ltd',
        rating: 5,
        comment: 'Comprehensive solution that gives us complete visibility into our operations.',
        date: '2024-01-10',
      },
    ],
    specifications: {
      monitoring: 'Real-time',
      analytics: 'AI-powered',
      integration: 'REST API',
      scalability: 'Unlimited fleet size',
      support: '24/7',
    },
    bookingUrl: '/contact-us?service=fleet-operations',
    inquirySystem: 'integrated',
    isPopular: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Maintenance & Lifecycle',
    slug: 'maintenance-lifecycle',
    description: 'Predictive maintenance systems and lifecycle management ensuring maximum aircraft uptime.',
    category: 'Services',
    status: 'active',
    icon: 'Wrench',
    featuredImage: '/aircraft-inspection.png',
    images: ['/aircraft-inspection.png', '/maintenance-facility.jpg'],
    pricing: {
      standard: { price: 2000, currency: 'USD', period: 'monthly' },
      premium: { price: 5000, currency: 'USD', period: 'monthly' },
      enterprise: { price: 15000, currency: 'USD', period: 'monthly' },
    },
    features: [
      'Predictive maintenance AI',
      'Automated scheduling',
      'Parts inventory management',
      'Compliance tracking',
      'Digital maintenance logs',
      'Performance analytics',
    ],
    testimonials: [
      {
        id: 'test3',
        name: 'Amit Patel',
        company: 'SkyMaintenance Inc',
        rating: 4,
        comment: 'Significantly reduced downtime and maintenance costs.',
        date: '2024-01-08',
      },
    ],
    specifications: {
      prediction: 'AI-based',
      automation: 'Full automated',
      compliance: 'Regulatory compliant',
      reporting: 'Real-time',
      integration: 'Fleet management',
    },
    bookingUrl: '/contact-us?service=maintenance-lifecycle',
    inquirySystem: 'integrated',
    isPopular: false,
    order: 3,
  },
  {
    id: '4',
    title: 'Safety & Compliance',
    slug: 'safety-compliance',
    description: 'Regulatory alignment, certification-ready systems, and aerospace-grade safety validation.',
    category: 'Services',
    status: 'active',
    icon: 'ShieldCheck',
    featuredImage: '/aircraft-inspection.png',
    images: ['/aircraft-inspection.png', '/safety-certification.jpg'],
    pricing: {
      consultation: { price: 5000, currency: 'USD', period: 'one-time' },
      certification: { price: 25000, currency: 'USD', period: 'one-time' },
      ongoing: { price: 3000, currency: 'USD', period: 'monthly' },
    },
    features: [
      'Regulatory compliance assessment',
      'Safety system validation',
      'Certification support',
      'Risk assessment',
      'Documentation management',
      'Audit preparation',
    ],
    testimonials: [
      {
        id: 'test4',
        name: 'Dr. Sarah Chen',
        company: 'Aviation Safety Board',
        rating: 5,
        comment: 'Expert guidance through complex certification processes.',
        date: '2024-01-12',
      },
    ],
    specifications: {
      standards: 'FAA/EASA compliant',
      assessment: 'Comprehensive',
      documentation: 'Digital management',
      support: 'Expert consultation',
      updates: 'Regulatory tracking',
    },
    bookingUrl: '/contact-us?service=safety-compliance',
    inquirySystem: 'integrated',
    isPopular: false,
    order: 4,
  },
  {
    id: '5',
    title: 'Custom Integrations',
    slug: 'custom-integrations',
    description: 'Mission-specific payloads, sensors, and aircraft customization tailored to client needs.',
    category: 'Services',
    status: 'active',
    icon: 'Plane',
    featuredImage: '/aircraft-premium.jpg',
    images: ['/aircraft-premium.jpg', '/custom-payload.jpg'],
    pricing: {
      basic: { price: 10000, currency: 'USD', period: 'one-time' },
      advanced: { price: 50000, currency: 'USD', period: 'one-time' },
      enterprise: { price: 150000, currency: 'USD', period: 'one-time' },
    },
    features: [
      'Custom payload integration',
      'Sensor installation',
      'Software customization',
      'Testing and validation',
      'Documentation and training',
      'Ongoing support',
    ],
    testimonials: [
      {
        id: 'test5',
        name: 'Michael Rodriguez',
        company: 'Special Ops Aviation',
        rating: 5,
        comment: 'Perfect customization for our specialized mission requirements.',
        date: '2024-01-18',
      },
    ],
    specifications: {
      customization: 'Full mission-specific',
      integration: 'Seamless',
      testing: 'Comprehensive',
      documentation: 'Complete',
      support: 'Dedicated team',
    },
    bookingUrl: '/contact-us?service=custom-integrations',
    inquirySystem: 'integrated',
    isPopular: false,
    order: 5,
  },
  {
    id: '6',
    title: 'Enterprise Deployment',
    slug: 'enterprise-deployment',
    description: 'Scalable deployment strategies for enterprise, defense, and government use cases.',
    category: 'Services',
    status: 'development',
    icon: 'Network',
    featuredImage: '/fleet-enterprise.jpg',
    images: ['/fleet-enterprise.jpg', '/enterprise-deployment.jpg'],
    pricing: {
      small: { price: 100000, currency: 'USD', period: 'one-time' },
      medium: { price: 500000, currency: 'USD', period: 'one-time' },
      large: { price: 2000000, currency: 'USD', period: 'one-time' },
    },
    features: [
      'Large-scale deployment planning',
      'Infrastructure setup',
      'Training programs',
      'Support network establishment',
      'Integration with existing systems',
      'Performance monitoring',
    ],
    testimonials: [],
    specifications: {
      scale: 'Enterprise-grade',
      planning: 'Strategic deployment',
      training: 'Comprehensive',
      support: 'Full-service',
      monitoring: '24/7',
    },
    bookingUrl: '/contact-us?service=enterprise-deployment',
    inquirySystem: 'integrated',
    isPopular: false,
    order: 6,
  },
];

export const serviceCategories = ['Products', 'Services'];
export const serviceStatuses = ['active', 'development', 'discontinued'];

export const getServicesByCategory = (category) => {
  if (category === 'all') return mockServices;
  return mockServices.filter(service => service.category === category);
};

export const getServicesByStatus = (status) => {
  if (status === 'all') return mockServices;
  return mockServices.filter(service => service.status === status);
};

export const getServiceById = (id) => mockServices.find(service => service.id === id);

export const getServiceBySlug = (slug) => mockServices.find(service => service.slug === slug);

export const getPopularServices = () => mockServices.filter(service => service.isPopular);

export const getServicesByOrder = () => [...mockServices].sort((a, b) => a.order - b.order);