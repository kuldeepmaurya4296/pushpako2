export const mockTeam = [
  {
    id: '1',
    name: 'Arjun Mehta',
    role: 'Founder & Chief Executive Officer',
    bio: 'A seasoned aerospace executive with over two decades of experience in aircraft programs, strategic growth, and venture leadership.',
    image: '/team/arjun-mehta.jpg',
    email: 'arjun@pushpako2.com',
    linkedin: 'https://linkedin.com/in/arjun-mehta',
    twitter: 'https://twitter.com/arjun_mehta',
    department: 'Executive',
    joinDate: '2020-01-15',
    location: 'Delhi, India',
    skills: ['Strategic Leadership', 'Aerospace Engineering', 'Venture Capital', 'Team Building'],
    achievements: [
      'Led development of 5+ aircraft programs',
      'Raised $50M+ in funding',
      '15+ years in aerospace industry',
    ],
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Neha Rao',
    role: 'Chief Technology Officer',
    bio: 'An accomplished technologist and former avionics researcher specializing in autonomous flight systems and AI-driven aviation platforms.',
    image: '/team/neha-rao.jpg',
    email: 'neha@pushpako2.com',
    linkedin: 'https://linkedin.com/in/neha-rao',
    twitter: 'https://twitter.com/neha_rao_tech',
    department: 'Technology',
    joinDate: '2020-03-20',
    location: 'Bangalore, India',
    skills: ['AI/ML', 'Autonomous Systems', 'Avionics', 'Software Architecture'],
    achievements: [
      'PhD in Autonomous Systems',
      '10+ patents in AI aviation',
      'Former NASA researcher',
    ],
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Ravi Sharma',
    role: 'Head of Engineering',
    bio: 'Engineering leader with deep expertise in hydrogen propulsion, safety-critical systems, and next-generation aircraft design.',
    image: '/team/ravi-sharma.jpg',
    email: 'ravi@pushpako2.com',
    linkedin: 'https://linkedin.com/in/ravi-sharma-eng',
    twitter: 'https://twitter.com/ravi_sharma_eng',
    department: 'Engineering',
    joinDate: '2020-05-10',
    location: 'Hyderabad, India',
    skills: ['Hydrogen Propulsion', 'Aircraft Design', 'Safety Systems', 'Engineering Management'],
    achievements: [
      'Designed 3 hydrogen-powered aircraft',
      '20+ years in aerospace engineering',
      'Led teams of 50+ engineers',
    ],
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    name: 'Kuldeep Maurya',
    role: 'Software Developer',
    bio: 'Software developer focused on building scalable, high-performance web applications with clean architecture and reliable systems.',
    image: '/kuldeep-maurya.jpg',
    email: 'kuldeep@pushpako2.com',
    linkedin: 'https://linkedin.com/in/kuldeep-maurya',
    github: 'https://github.com/kuldeep-maurya',
    department: 'Engineering',
    joinDate: '2023-08-15',
    location: 'Delhi, India',
    skills: ['React', 'Node.js', 'Python', 'System Design', 'DevOps'],
    achievements: [
      'Built scalable web platforms',
      'Led development of 10+ projects',
      'Open source contributor',
    ],
    isActive: true,
    order: 4,
  },
  {
    id: '5',
    name: 'Priya Singh',
    role: 'Head of Operations',
    bio: 'Operations expert with extensive experience in scaling aviation businesses and managing complex supply chains.',
    image: '/team/priya-singh.jpg',
    email: 'priya@pushpako2.com',
    linkedin: 'https://linkedin.com/in/priya-singh-ops',
    department: 'Operations',
    joinDate: '2021-02-28',
    location: 'Mumbai, India',
    skills: ['Operations Management', 'Supply Chain', 'Quality Assurance', 'Process Optimization'],
    achievements: [
      'Scaled operations to 1000+ units',
      'Reduced costs by 30%',
      'Implemented ISO 9001 standards',
    ],
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    name: 'Dr. Vikram Patel',
    role: 'Chief Safety Officer',
    bio: 'Aviation safety expert with deep knowledge of regulatory frameworks and risk management in advanced air mobility.',
    image: '/team/vikram-patel.jpg',
    email: 'vikram@pushpako2.com',
    linkedin: 'https://linkedin.com/in/dr-vikram-patel',
    department: 'Safety',
    joinDate: '2020-11-15',
    location: 'Chennai, India',
    skills: ['Aviation Safety', 'Risk Management', 'Regulatory Compliance', 'Safety Engineering'],
    achievements: [
      'Developed safety standards for eVTOL',
      'Former FAA safety inspector',
      'Published 20+ safety research papers',
    ],
    isActive: true,
    order: 6,
  },
];

export const teamDepartments = ['Executive', 'Technology', 'Engineering', 'Operations', 'Safety', 'Marketing', 'Sales'];

export const getTeamByDepartment = (department) => {
  if (department === 'all') return mockTeam;
  return mockTeam.filter(member => member.department === department);
};

export const getActiveTeam = () => mockTeam.filter(member => member.isActive);

export const getTeamMemberById = (id) => mockTeam.find(member => member.id === id);

export const getTeamByOrder = () => [...mockTeam].sort((a, b) => a.order - b.order);

export const mockOrgChart = {
  ceo: '1', // Arjun Mehta
  cto: '2', // Neha Rao
  headEngineering: '3', // Ravi Sharma
  headOperations: '5', // Priya Singh
  chiefSafety: '6', // Dr. Vikram Patel
  softwareDev: '4', // Kuldeep Maurya
  reportsTo: {
    '2': '1', // CTO reports to CEO
    '3': '1', // Head Engineering reports to CEO
    '4': '3', // Software Dev reports to Head Engineering
    '5': '1', // Head Operations reports to CEO
    '6': '1', // Chief Safety reports to CEO
  },
};