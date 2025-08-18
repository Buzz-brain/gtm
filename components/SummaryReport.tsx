'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';

interface SummaryReportProps {
  summary: string;
}

export default function SummaryReport({ summary }: SummaryReportProps) {
  // Mock structured insights for better presentation
  const insights = {
    viability: 85,
    risks: [
      'High competition in the fintech space',
      'Regulatory compliance requirements',
      'Customer acquisition costs'
    ],
    opportunities: [
      'Large unbanked population',
      'Growing smartphone adoption',
      'Government digital initiatives'
    ],
    recommendations: [
      'Focus on rural market penetration',
      'Partner with local banks for credibility',
      'Implement strong security measures'
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-4 sm:p-6 bg-white/50 backdrop-blur-sm border-white/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6 gap-2">
          <FileText className="w-6 h-6 mr-2 text-blue-600" />
          <h3 className="text-lg sm:text-xl font-semibold">AI-Generated Summary Report</h3>
        </div>

        {/* Viability Score */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base">Overall Viability Score</span>
            <Badge variant="secondary" className="text-base sm:text-lg px-2 sm:px-3 py-1">
              {insights.viability}/100
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-1000"
              style={{ width: `${insights.viability}%` }}
            ></div>
          </div>
        </div>

        {/* Main Summary */}
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Executive Summary</h4>
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
            {summary}
          </p>
        </div>

        {/* Key Insights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Risks */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <h5 className="font-semibold text-red-800">Key Risks</h5>
            </div>
            <ul className="space-y-1 text-sm text-red-700">
              {insights.risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <h5 className="font-semibold text-green-800">Opportunities</h5>
            </div>
            <ul className="space-y-1 text-sm text-green-700">
              {insights.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
              <h5 className="font-semibold text-blue-800">Recommendations</h5>
            </div>
            <ul className="space-y-1 text-sm text-blue-700">
              {insights.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            <h5 className="font-semibold text-blue-800">Recommended Next Steps</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
            <div className="flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2">1</span>
              Conduct detailed market research
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2">2</span>
              Build MVP for target segment
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2">3</span>
              Secure initial funding
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2">4</span>
              Test in pilot market
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}