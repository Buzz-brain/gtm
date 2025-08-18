interface SimulationResult {
  id: string;
  query: string;
  timestamp: Date;
  heatmapData: any;
  chartData: any;
  userSegments: any[];
  summary: string;
}

interface HistorySimulation {
  id: string;
  query: string;
  timestamp: Date;
  category: string;
  metrics: {
    adoption: number;
    targetUsers: string;
    projectedRevenue: string;
  };
  summary: string;
}

export function generateMockResults(query: string): SimulationResult {
  const id = Math.random().toString(36).substr(2, 9);
  
  // Mock heatmap data
  const heatmapData = {
    regions: [
      {
        name: 'Lagos',
        adoption: Math.floor(Math.random() * 40) + 60,
        resistance: Math.floor(Math.random() * 20) + 10,
        color: 'bg-green-50 border-green-200'
      },
      {
        name: 'Abuja',
        adoption: Math.floor(Math.random() * 30) + 50,
        resistance: Math.floor(Math.random() * 25) + 15,
        color: 'bg-blue-50 border-blue-200'
      },
      {
        name: 'Kano',
        adoption: Math.floor(Math.random() * 35) + 45,
        resistance: Math.floor(Math.random() * 30) + 20,
        color: 'bg-purple-50 border-purple-200'
      },
      {
        name: 'Port Harcourt',
        adoption: Math.floor(Math.random() * 25) + 55,
        resistance: Math.floor(Math.random() * 20) + 15,
        color: 'bg-orange-50 border-orange-200'
      }
    ]
  };

  // Mock chart data
  const chartData = {
    adoptionCurve: [
      { month: 'Jan', users: 1000, churn: 5 },
      { month: 'Feb', users: 2500, churn: 8 },
      { month: 'Mar', users: 4200, churn: 12 },
      { month: 'Apr', users: 6800, churn: 15 },
      { month: 'May', users: 9500, churn: 18 },
      { month: 'Jun', users: 12000, churn: 20 },
    ],
    revenueProjection: [
      { month: 'Jan', revenue: 50000, costs: 80000 },
      { month: 'Feb', revenue: 120000, costs: 150000 },
      { month: 'Mar', revenue: 200000, costs: 180000 },
      { month: 'Apr', revenue: 320000, costs: 220000 },
      { month: 'May', revenue: 480000, costs: 280000 },
      { month: 'Jun', revenue: 650000, costs: 320000 },
    ],
    marketShare: [
      { segment: 'Young Professionals', value: 35, color: '#3B82F6' },
      { segment: 'Students', value: 28, color: '#10B981' },
      { segment: 'SME Owners', value: 22, color: '#F59E0B' },
      { segment: 'Others', value: 15, color: '#8B5CF6' },
    ]
  };

  // Mock user segments
  const userSegments = [
    {
      id: '1',
      name: 'Tech-Savvy Millennials',
      size: 35,
      demographics: {
        ageRange: '25-35',
        income: '₦200k-500k',
        location: 'Urban centers',
        interests: ['Technology', 'Finance', 'Entrepreneurship', 'Social Media']
      },
      behavior: {
        adoptionRate: Math.floor(Math.random() * 20) + 70,
        avgSpend: Math.floor(Math.random() * 10000) + 15000,
        retention: Math.floor(Math.random() * 15) + 75
      },
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'University Students',
      size: 28,
      demographics: {
        ageRange: '18-25',
        income: '₦50k-150k',
        location: 'University towns',
        interests: ['Education', 'Gaming', 'Social Media', 'Budget Tools']
      },
      behavior: {
        adoptionRate: Math.floor(Math.random() * 25) + 60,
        avgSpend: Math.floor(Math.random() * 5000) + 5000,
        retention: Math.floor(Math.random() * 20) + 65
      },
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'Small Business Owners',
      size: 22,
      demographics: {
        ageRange: '30-45',
        income: '₦300k-1M',
        location: 'Commercial areas',
        interests: ['Business', 'Finance', 'Networking', 'Growth']
      },
      behavior: {
        adoptionRate: Math.floor(Math.random() * 15) + 65,
        avgSpend: Math.floor(Math.random() * 20000) + 25000,
        retention: Math.floor(Math.random() * 10) + 80
      },
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Rural Entrepreneurs',
      size: 15,
      demographics: {
        ageRange: '25-40',
        income: '₦100k-300k',
        location: 'Rural communities',
        interests: ['Agriculture', 'Trading', 'Mobile Money', 'Community']
      },
      behavior: {
        adoptionRate: Math.floor(Math.random() * 30) + 40,
        avgSpend: Math.floor(Math.random() * 8000) + 8000,
        retention: Math.floor(Math.random() * 25) + 60
      },
      color: 'bg-orange-500'
    }
  ];

  // Generate summary based on query keywords
  const generateSummary = (query: string): string => {
    const keywords = query.toLowerCase();
    let summary = `Based on your simulation for "${query}", our AI analysis reveals promising market potential. `;
    
    if (keywords.includes('fintech') || keywords.includes('finance')) {
      summary += "The fintech sector shows strong adoption patterns, particularly among urban millennials and SME owners. Key success factors include regulatory compliance, security measures, and strategic partnerships with established financial institutions.";
    } else if (keywords.includes('edtech') || keywords.includes('education')) {
      summary += "The education technology market demonstrates significant opportunity, especially in urban centers with high smartphone penetration. Student segments show high engagement but lower spending capacity, while professional development shows higher monetization potential.";
    } else if (keywords.includes('food') || keywords.includes('delivery')) {
      summary += "Food delivery services show strong market demand in major cities like Lagos and Abuja. Success depends on logistics optimization, restaurant partnerships, and competitive pricing strategies. Rural expansion presents longer-term opportunities.";
    } else {
      summary += "Your startup concept shows solid market validation with favorable adoption rates in key demographic segments. The analysis indicates strong potential for urban market penetration with opportunities for strategic expansion.";
    }
    
    return summary + " Consider focusing initial efforts on high-adoption regions while developing strategies to address resistance in challenging markets.";
  };

  return {
    id,
    query,
    timestamp: new Date(),
    heatmapData,
    chartData,
    userSegments,
    summary: generateSummary(query)
  };
}

export const mockHistoryData: HistorySimulation[] = [
  {
    id: '1',
    query: 'Launch a fintech app for small businesses in Nigeria',
    timestamp: new Date(Date.now() - 86400000 * 2),
    category: 'FinTech',
    metrics: {
      adoption: 78,
      targetUsers: '2.5M SMEs',
      projectedRevenue: '₦850M'
    },
    summary: 'Strong market opportunity with high adoption potential among urban SME owners. Key challenges include regulatory compliance and customer acquisition costs.'
  },
  {
    id: '2',
    query: 'Create a food delivery service in Abuja',
    timestamp: new Date(Date.now() - 86400000 * 5),
    category: 'Food Tech',
    metrics: {
      adoption: 65,
      targetUsers: '800K residents',
      projectedRevenue: '₦320M'
    },
    summary: 'Moderate market potential with strong demand in affluent neighborhoods. Competition from existing players presents challenges but opportunities exist in underserved areas.'
  },
  {
    id: '3',
    query: 'Build an AI tutoring platform for secondary schools',
    timestamp: new Date(Date.now() - 86400000 * 7),
    category: 'EdTech',
    metrics: {
      adoption: 72,
      targetUsers: '12M students',
      projectedRevenue: '₦1.2B'
    },
    summary: 'High market potential driven by educational digitization trends. Strong adoption expected among tech-savvy students and progressive schools.'
  },
  {
    id: '4',
    query: 'Launch a ride-sharing service for university campuses',
    timestamp: new Date(Date.now() - 86400000 * 10),
    category: 'Transportation',
    metrics: {
      adoption: 84,
      targetUsers: '3.2M students',
      projectedRevenue: '₦680M'
    },
    summary: 'Excellent market fit with high adoption rates among university students. Limited competition in campus-specific transportation creates significant opportunity.'
  },
  {
    id: '5',
    query: 'Create a digital marketplace for local artisans',
    timestamp: new Date(Date.now() - 86400000 * 14),
    category: 'E-Commerce',
    metrics: {
      adoption: 56,
      targetUsers: '1.8M artisans',
      projectedRevenue: '₦420M'
    },
    summary: 'Moderate adoption potential hampered by digital literacy challenges. Strong opportunity exists with proper training and support infrastructure.'
  }
];