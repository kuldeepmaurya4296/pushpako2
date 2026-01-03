export const mockAnalytics = {
  overview: {
    totalUsers: 1234,
    activeUsers: 856,
    newUsersThisMonth: 89,
    totalRevenue: 45678,
    monthlyRevenue: 5678,
    conversionRate: 3.2,
    averageOrderValue: 2340,
    customerLifetimeValue: 8900,
  },
  traffic: {
    totalVisits: 45678,
    uniqueVisitors: 34567,
    pageViews: 123456,
    bounceRate: 42.3,
    avgSessionDuration: '3:24',
    topPages: [
      { page: '/aircraft', views: 5432, bounceRate: 35.2 },
      { page: '/technologies', views: 4321, bounceRate: 38.7 },
      { page: '/about-us', views: 3210, bounceRate: 45.1 },
      { page: '/services', views: 2890, bounceRate: 41.8 },
      { page: '/blogs', views: 2567, bounceRate: 48.3 },
    ],
    trafficSources: [
      { source: 'organic', visits: 23456, percentage: 51.3 },
      { source: 'direct', visits: 12345, percentage: 27.0 },
      { source: 'social', visits: 4567, percentage: 10.0 },
      { source: 'referral', visits: 3456, percentage: 7.6 },
      { source: 'email', visits: 1854, percentage: 4.1 },
    ],
  },
  userBehavior: {
    deviceBreakdown: [
      { device: 'desktop', users: 15678, percentage: 45.3 },
      { device: 'mobile', users: 12345, percentage: 35.7 },
      { device: 'tablet', users: 6789, percentage: 19.0 },
    ],
    browserBreakdown: [
      { browser: 'Chrome', users: 23456, percentage: 67.8 },
      { browser: 'Safari', users: 5678, percentage: 16.4 },
      { browser: 'Firefox', users: 3456, percentage: 10.0 },
      { browser: 'Edge', users: 2345, percentage: 6.8 },
    ],
    geographicData: [
      { country: 'India', users: 15678, percentage: 45.3 },
      { country: 'United States', users: 6789, percentage: 19.6 },
      { country: 'United Kingdom', users: 3456, percentage: 10.0 },
      { country: 'Germany', users: 2345, percentage: 6.8 },
      { country: 'Canada', users: 1890, percentage: 5.5 },
    ],
    userFlow: [
      { step: 'Homepage', users: 34567, dropoff: 0 },
      { step: 'Aircraft Page', users: 12345, dropoff: 64.3 },
      { step: 'Contact Form', users: 4567, dropoff: 63.0 },
      { step: 'Conversion', users: 1456, dropoff: 68.2 },
    ],
  },
  content: {
    blogPerformance: [
      { title: 'Future of Hydrogen Aviation', views: 1250, engagement: 8.5, shares: 45 },
      { title: 'Urban Air Mobility', views: 980, engagement: 7.2, shares: 32 },
      { title: 'Safety Standards', views: 756, engagement: 6.8, shares: 28 },
      { title: 'Economics of Air Taxis', views: 623, engagement: 9.1, shares: 52 },
      { title: 'Autonomous Flight', views: 892, engagement: 8.9, shares: 67 },
    ],
    popularTechnologies: [
      { name: 'Hydrogen Refueling', views: 2100, downloads: 890 },
      { name: 'Autonomous Flight', views: 4200, downloads: 1800 },
      { name: 'Smart Charging', views: 3400, downloads: 1250 },
      { name: 'Fleet Management', views: 3800, downloads: 1650 },
      { name: 'Vertical Takeoff', views: 5600, downloads: 2100 },
    ],
    serviceInquiries: [
      { service: 'Aircraft Solutions', inquiries: 45, conversion: 12 },
      { service: 'Fleet Operations', inquiries: 38, conversion: 8 },
      { service: 'Maintenance', inquiries: 29, conversion: 15 },
      { service: 'Custom Integrations', inquiries: 22, conversion: 6 },
      { service: 'Safety & Compliance', inquiries: 18, conversion: 9 },
    ],
  },
  performance: {
    pageLoadTimes: [
      { page: 'Homepage', loadTime: 1.2, score: 95 },
      { page: 'Aircraft', loadTime: 1.8, score: 88 },
      { page: 'Technologies', loadTime: 2.1, score: 82 },
      { page: 'Services', loadTime: 1.5, score: 92 },
      { page: 'Blogs', loadTime: 1.9, score: 85 },
    ],
    uptime: {
      overall: 99.9,
      last30Days: 99.95,
      incidents: 2,
    },
    errorRates: {
      404: 0.02,
      500: 0.01,
      jsErrors: 0.05,
    },
  },
  goals: {
    conversions: [
      { goal: 'Contact Form Submissions', completions: 156, rate: 3.2 },
      { goal: 'Newsletter Signups', completions: 89, rate: 1.8 },
      { goal: 'Service Inquiries', completions: 67, rate: 1.4 },
      { goal: 'Demo Requests', completions: 34, rate: 0.7 },
    ],
    revenue: {
      target: 50000,
      current: 45678,
      percentage: 91.4,
      trend: 'up',
    },
  },
  timeSeries: {
    visitors: [
      { date: '2024-01-01', visitors: 1234 },
      { date: '2024-01-02', visitors: 1456 },
      { date: '2024-01-03', visitors: 1345 },
      { date: '2024-01-04', visitors: 1567 },
      { date: '2024-01-05', visitors: 1423 },
      { date: '2024-01-06', visitors: 1678 },
      { date: '2024-01-07', visitors: 1534 },
    ],
    revenue: [
      { date: '2024-01-01', amount: 2340 },
      { date: '2024-01-02', amount: 3456 },
      { date: '2024-01-03', amount: 2890 },
      { date: '2024-01-04', amount: 4123 },
      { date: '2024-01-05', amount: 3789 },
      { date: '2024-01-06', amount: 4567 },
      { date: '2024-01-07', amount: 4234 },
    ],
  },
};

export const getAnalyticsMetric = (category, metric) => {
  return mockAnalytics[category]?.[metric] || null;
};

export const getTimeSeriesData = (metric, days = 7) => {
  return mockAnalytics.timeSeries[metric]?.slice(-days) || [];
};

export const calculateGrowthRate = (metric, period = 7) => {
  const data = getTimeSeriesData(metric, period + 1);
  if (data.length < 2) return 0;

  const current = data[data.length - 1][metric === 'revenue' ? 'amount' : 'visitors'];
  const previous = data[data.length - 2][metric === 'revenue' ? 'amount' : 'visitors'];

  return ((current - previous) / previous) * 100;
};