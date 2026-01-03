export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    type: 'lead', // lead, subscriber, inquiry
    source: 'Stay Updated', // Stay Updated, Contact Us
    message: 'Interested in hydrogen-powered aircraft for urban transport.',
    status: 'new', // new, contacted, qualified, converted
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    tags: ['urban-transport', 'hydrogen'],
    followUpDate: '2024-01-20T10:00:00Z',
    assignedTo: 'admin',
    notes: 'High interest in enterprise solutions.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1-555-0456',
    type: 'inquiry',
    source: 'Contact Us',
    message: 'Looking for partnership opportunities in fleet management.',
    status: 'contacted',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    tags: ['partnership', 'fleet-management'],
    followUpDate: '2024-01-25T14:30:00Z',
    assignedTo: 'admin',
    notes: 'Enterprise client, follow up with demo.',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    phone: '+1-555-0789',
    type: 'subscriber',
    source: 'Stay Updated',
    message: 'Subscribe to newsletter for latest updates.',
    status: 'qualified',
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-08T11:20:00Z',
    tags: ['newsletter', 'general-interest'],
    followUpDate: null,
    assignedTo: 'admin',
    notes: 'Regular subscriber, send monthly updates.',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@techcorp.com',
    phone: '+1-555-0321',
    type: 'lead',
    source: 'Contact Us',
    message: 'Interested in technology licensing for autonomous systems.',
    status: 'new',
    createdAt: '2024-01-20T08:30:00Z',
    updatedAt: '2024-01-20T08:30:00Z',
    tags: ['technology-licensing', 'autonomous'],
    followUpDate: '2024-01-25T08:30:00Z',
    assignedTo: 'admin',
    notes: 'Tech company, potential licensing deal.',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@gov.org',
    phone: '+1-555-0654',
    type: 'inquiry',
    source: 'Contact Us',
    message: 'Government agency interested in defense applications.',
    status: 'contacted',
    createdAt: '2024-01-18T13:15:00Z',
    updatedAt: '2024-01-19T10:45:00Z',
    tags: ['government', 'defense'],
    followUpDate: '2024-02-01T13:15:00Z',
    assignedTo: 'admin',
    notes: 'Government contract opportunity.',
  },
];

export const userTypes = ['lead', 'subscriber', 'inquiry'];
export const userStatuses = ['new', 'contacted', 'qualified', 'converted'];
export const userSources = ['Stay Updated', 'Contact Us'];

export const getUsersByType = (type) => {
  if (type === 'all') return mockUsers;
  return mockUsers.filter(user => user.type === type);
};

export const getUsersByStatus = (status) => {
  if (status === 'all') return mockUsers;
  return mockUsers.filter(user => user.status === status);
};

export const getUserById = (id) => mockUsers.find(user => user.id === id);