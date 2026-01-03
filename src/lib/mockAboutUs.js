export const mockAboutUs = {
  hero: {
    id: 'hero',
    title: 'About Pushpak O2',
    subtitle: 'Engineering the Future of Clean Air Mobility',
    description: 'Pushpak O2 is building hydrogen-electric aircraft that combine sustainability, autonomy, and aerospace-grade engineering.',
    backgroundImage: '/hero-drone-video.gif',
    ctaText: 'Explore Our Aircraft',
    ctaLink: '/aircraft',
  },
  vision: {
    id: 'vision',
    title: 'Our Vision',
    content: 'Aviation must evolve beyond fossil fuels and fixed infrastructure. Pushpak O2 exists to enable long-range, zero-emission air mobility using hydrogen-electric propulsion.',
    extendedContent: 'By integrating AI-driven autonomy and advanced energy systems, we are creating aircraft designed for real-world deployment.',
    image: '/hero-drone-video.gif',
  },
  values: [
    {
      id: 'sustainability',
      title: 'Sustainability',
      description: 'Zero-emission hydrogen propulsion aligned with global climate goals.',
      icon: 'Leaf',
    },
    {
      id: 'autonomy',
      title: 'Autonomy',
      description: 'AI-powered systems enabling safe, scalable, and intelligent flight.',
      icon: 'Brain',
    },
    {
      id: 'engineering',
      title: 'Engineering',
      description: 'Aerospace-grade design built for certification and long-term reliability.',
      icon: 'Plane',
    },
  ],
  footer: {
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/pushpako2', icon: 'Twitter' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/pushpako2', icon: 'Linkedin' },
      { platform: 'youtube', url: 'https://youtube.com/pushpako2', icon: 'Youtube' },
      { platform: 'github', url: 'https://github.com/pushpako2', icon: 'Github' },
    ],
    privacyPolicy: {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      lastUpdated: '2024-01-15',
    },
    faq: {
      title: 'FAQ',
      url: '/support-faq',
      lastUpdated: '2024-01-10',
    },
    support: {
      title: 'Support',
      url: '/support',
      email: 'support@pushpako2.com',
    },
    roadmap: {
      title: 'Roadmap',
      url: '/roadmap',
      lastUpdated: '2024-01-20',
    },
    companyInfo: {
      name: 'Pushpak O2 Aviation Pvt Ltd',
      address: 'Delhi, India',
      email: 'info@pushpako2.com',
      phone: '+91-11-1234-5678',
    },
  },
  stats: [
    {
      id: 'aircraft',
      label: 'Aircraft Delivered',
      value: '24',
      suffix: '',
    },
    {
      id: 'range',
      label: 'Flight Range',
      value: '400',
      suffix: 'km',
    },
    {
      id: 'efficiency',
      label: 'Energy Efficiency',
      value: '95',
      suffix: '%',
    },
    {
      id: 'safety',
      label: 'Safety Record',
      value: '99.9',
      suffix: '%',
    },
  ],
};

export const mockRoadmap = [
  {
    id: 'q1-2024',
    quarter: 'Q1 2024',
    title: 'Technology Validation',
    status: 'completed', // planned, in-progress, completed
    description: 'Complete validation of hydrogen-electric propulsion systems and autonomous flight controls.',
    milestones: [
      'Fuel cell certification',
      'Autonomous flight testing',
      'Safety system validation',
    ],
  },
  {
    id: 'q2-2024',
    quarter: 'Q2 2024',
    title: 'Production Ramp-up',
    status: 'in-progress',
    description: 'Scale manufacturing capabilities and establish supply chain partnerships.',
    milestones: [
      'Production facility expansion',
      'Supplier qualification',
      'Quality control systems',
    ],
  },
  {
    id: 'q3-2024',
    quarter: 'Q3 2024',
    title: 'Market Launch',
    status: 'planned',
    description: 'Launch commercial operations and begin customer deployments.',
    milestones: [
      'First commercial flights',
      'Customer training programs',
      'Service network establishment',
    ],
  },
  {
    id: 'q4-2024',
    quarter: 'Q4 2024',
    title: 'Global Expansion',
    status: 'planned',
    description: 'Expand operations internationally and introduce new aircraft models.',
    milestones: [
      'International certifications',
      'New market entries',
      'Product line expansion',
    ],
  },
];

export const getAboutUsSection = (sectionId) => {
  return mockAboutUs[sectionId] || null;
};

export const getRoadmapByStatus = (status) => {
  if (status === 'all') return mockRoadmap;
  return mockRoadmap.filter(item => item.status === status);
};