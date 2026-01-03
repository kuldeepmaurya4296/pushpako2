export const mockFleet = [
  {
    id: '1',
    name: 'Pushpak H2-Standard',
    model: 'H2-STD-001',
    type: 'cargo', // cargo, passenger, special-mission
    status: 'active', // active, maintenance, retired
    location: 'Delhi Hub',
    purchaseDate: '2023-06-15',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10',
    flightHours: 2450,
    maxFlightHours: 5000,
    fuelType: 'hydrogen',
    capacity: { passengers: 0, cargo: 400 },
    range: 250, // km
    maxSpeed: 150, // km/h
    complianceStatus: 'compliant',
    insuranceExpiry: '2024-12-31',
    documents: ['certificate.pdf', 'manual.pdf', 'insurance.pdf'],
    performance: {
      efficiency: 95,
      reliability: 98,
      utilization: 85,
    },
    maintenanceLogs: [
      {
        id: 'log1',
        date: '2024-01-10',
        type: 'routine',
        description: 'Quarterly maintenance check',
        technician: 'Rajesh Kumar',
        cost: 2500,
        status: 'completed',
      },
    ],
    operationalLogs: [
      {
        id: 'op1',
        date: '2024-01-15',
        mission: 'Cargo delivery - Mumbai',
        duration: 2.5,
        fuelUsed: 15,
        status: 'completed',
      },
    ],
  },
  {
    id: '2',
    name: 'Pushpak H2-Premium',
    model: 'H2-PREM-002',
    type: 'passenger',
    status: 'active',
    location: 'Mumbai Hub',
    purchaseDate: '2023-08-20',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-04-05',
    flightHours: 1890,
    maxFlightHours: 5000,
    fuelType: 'hydrogen',
    capacity: { passengers: 4, cargo: 200 },
    range: 300,
    maxSpeed: 180,
    complianceStatus: 'compliant',
    insuranceExpiry: '2024-12-31',
    documents: ['certificate.pdf', 'manual.pdf', 'insurance.pdf'],
    performance: {
      efficiency: 97,
      reliability: 99,
      utilization: 78,
    },
    maintenanceLogs: [
      {
        id: 'log2',
        date: '2024-01-05',
        type: 'emergency',
        description: 'Propeller replacement',
        technician: 'Priya Sharma',
        cost: 8500,
        status: 'completed',
      },
    ],
    operationalLogs: [
      {
        id: 'op2',
        date: '2024-01-12',
        mission: 'VIP transport - Delhi',
        duration: 1.8,
        fuelUsed: 12,
        status: 'completed',
      },
    ],
  },
  {
    id: '3',
    name: 'Pushpak H2-Enterprise',
    model: 'H2-ENT-003',
    type: 'special-mission',
    status: 'maintenance',
    location: 'Maintenance Facility',
    purchaseDate: '2023-10-10',
    lastMaintenance: '2024-01-18',
    nextMaintenance: '2024-02-18',
    flightHours: 1250,
    maxFlightHours: 5000,
    fuelType: 'hydrogen',
    capacity: { passengers: 2, cargo: 300 },
    range: 400,
    maxSpeed: 200,
    complianceStatus: 'pending-review',
    insuranceExpiry: '2024-12-31',
    documents: ['certificate.pdf', 'manual.pdf', 'insurance.pdf'],
    performance: {
      efficiency: 94,
      reliability: 96,
      utilization: 65,
    },
    maintenanceLogs: [
      {
        id: 'log3',
        date: '2024-01-18',
        type: 'major',
        description: 'Fuel cell system overhaul',
        technician: 'Amit Patel',
        cost: 15000,
        status: 'in-progress',
      },
    ],
    operationalLogs: [
      {
        id: 'op3',
        date: '2024-01-08',
        mission: 'Medical supply delivery',
        duration: 3.2,
        fuelUsed: 18,
        status: 'completed',
      },
    ],
  },
];

export const fleetTypes = ['cargo', 'passenger', 'special-mission'];
export const fleetStatuses = ['active', 'maintenance', 'retired'];
export const complianceStatuses = ['compliant', 'pending-review', 'non-compliant'];

export const getFleetByType = (type) => {
  if (type === 'all') return mockFleet;
  return mockFleet.filter(asset => asset.type === type);
};

export const getFleetByStatus = (status) => {
  if (status === 'all') return mockFleet;
  return mockFleet.filter(asset => asset.status === status);
};

export const getFleetById = (id) => mockFleet.find(asset => asset.id === id);

export const getTotalFleetHours = () => mockFleet.reduce((sum, asset) => sum + asset.flightHours, 0);

export const getActiveFleetCount = () => mockFleet.filter(asset => asset.status === 'active').length;

export const getMaintenanceDueCount = () => {
  const now = new Date();
  return mockFleet.filter(asset => new Date(asset.nextMaintenance) <= now).length;
};