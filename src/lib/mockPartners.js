export const mockPartners = [
  {
    id: 'partner1',
    name: 'TechCorp Industries',
    type: 'technology', // technology, manufacturing, service
    category: 'Charging Systems',
    status: 'active', // active, pending, terminated
    contactPerson: 'Alice Johnson',
    email: 'alice@techcorp.com',
    phone: '+1-555-0123',
    website: 'https://techcorp.com',
    agreementDate: '2023-06-15',
    agreementExpiry: '2025-06-15',
    contractValue: 500000,
    description: 'Leading provider of smart charging infrastructure for electric vehicles.',
    logo: '/partner-logos/techcorp.png',
    performance: {
      reliability: 98,
      delivery: 95,
      quality: 97,
      collaboration: 92,
    },
    projects: ['charging-system-v2', 'infrastructure-upgrade'],
    documents: ['agreement.pdf', 'nda.pdf', 'performance-review.pdf'],
    lastContact: '2024-01-10',
    nextReview: '2024-06-15',
    notes: 'Excellent collaboration on charging systems. Recommended for future projects.',
  },
  {
    id: 'partner2',
    name: 'HydrogenTech Solutions',
    type: 'technology',
    category: 'Fuel Systems',
    status: 'active',
    contactPerson: 'Bob Wilson',
    email: 'bob@hydrogentech.com',
    phone: '+1-555-0456',
    website: 'https://hydrogentech.com',
    agreementDate: '2023-08-20',
    agreementExpiry: '2025-08-20',
    contractValue: 750000,
    description: 'Specialized in hydrogen fuel cell technology and refueling systems.',
    logo: '/partner-logos/hydrogentech.png',
    performance: {
      reliability: 96,
      delivery: 93,
      quality: 95,
      collaboration: 88,
    },
    projects: ['hydrogen-refueling-v1', 'fuel-cell-optimization'],
    documents: ['partnership-agreement.pdf', 'tech-specs.pdf'],
    lastContact: '2024-01-08',
    nextReview: '2024-08-20',
    notes: 'Strong technical expertise. Some delivery delays but quality is excellent.',
  },
  {
    id: 'partner3',
    name: 'AeroManufacturing Inc',
    type: 'manufacturing',
    category: 'Aircraft Components',
    status: 'active',
    contactPerson: 'Carol Davis',
    email: 'carol@aeromfg.com',
    phone: '+1-555-0789',
    website: 'https://aeromfg.com',
    agreementDate: '2023-10-10',
    agreementExpiry: '2025-10-10',
    contractValue: 1200000,
    description: 'Precision manufacturing of aerospace components and assemblies.',
    logo: '/partner-logos/aeromfg.png',
    performance: {
      reliability: 99,
      delivery: 97,
      quality: 98,
      collaboration: 95,
    },
    projects: ['wing-assembly', 'propulsion-unit'],
    documents: ['manufacturing-agreement.pdf', 'quality-cert.pdf'],
    lastContact: '2024-01-15',
    nextReview: '2024-10-10',
    notes: 'Outstanding performance. Reliable partner for critical components.',
  },
  {
    id: 'partner4',
    name: 'SkyTech Services',
    type: 'service',
    category: 'Maintenance',
    status: 'pending',
    contactPerson: 'David Brown',
    email: 'david@skytech.com',
    phone: '+1-555-0321',
    website: 'https://skytech.com',
    agreementDate: '2024-01-20',
    agreementExpiry: '2026-01-20',
    contractValue: 300000,
    description: 'Comprehensive aircraft maintenance and support services.',
    logo: '/partner-logos/skyservices.png',
    performance: {
      reliability: 0,
      delivery: 0,
      quality: 0,
      collaboration: 0,
    },
    projects: [],
    documents: ['proposal.pdf'],
    lastContact: '2024-01-18',
    nextReview: '2024-07-20',
    notes: 'New partnership under review. Initial discussions promising.',
  },
  {
    id: 'partner5',
    name: 'DataFlow Analytics',
    type: 'technology',
    category: 'Data & Analytics',
    status: 'active',
    contactPerson: 'Eva Green',
    email: 'eva@dataflow.com',
    phone: '+1-555-0654',
    website: 'https://dataflow.com',
    agreementDate: '2023-11-05',
    agreementExpiry: '2025-11-05',
    contractValue: 400000,
    description: 'Advanced data analytics and AI solutions for aerospace applications.',
    logo: '/partner-logos/dataflow.png',
    performance: {
      reliability: 94,
      delivery: 96,
      quality: 93,
      collaboration: 90,
    },
    projects: ['fleet-analytics', 'predictive-maintenance'],
    documents: ['analytics-agreement.pdf', 'data-sharing.pdf'],
    lastContact: '2024-01-12',
    nextReview: '2024-11-05',
    notes: 'Good technical capabilities. Working on improving collaboration metrics.',
  },
];

export const partnerTypes = ['technology', 'manufacturing', 'service'];
export const partnerStatuses = ['active', 'pending', 'terminated'];

export const getPartnersByType = (type) => {
  if (type === 'all') return mockPartners;
  return mockPartners.filter(partner => partner.type === type);
};

export const getPartnersByStatus = (status) => {
  if (status === 'all') return mockPartners;
  return mockPartners.filter(partner => partner.status === status);
};

export const getPartnerById = (id) => mockPartners.find(partner => partner.id === id);

export const getTotalContractValue = () => mockPartners.reduce((sum, partner) => sum + partner.contractValue, 0);

export const getActivePartnersCount = () => mockPartners.filter(partner => partner.status === 'active').length;