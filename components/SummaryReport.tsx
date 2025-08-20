'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';


interface SummaryReportProps {
  adoption_probability: number;
  churn_risk: number;
  referral_likelihood: number;
  regional_heat: { [region: string]: string };
  summary: string;
  query?: string;
}

export default function SummaryReport({ adoption_probability, churn_risk, referral_likelihood, regional_heat, summary, query }: SummaryReportProps) {
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

        {/* User Query */}
        {query && (
          <div className="mb-4">
            <span className="font-medium text-gray-700">User Query:</span>
            <span className="ml-2 text-gray-600 italic">{query}</span>
          </div>
        )}
        {/* Key Metrics */}
        <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="font-medium text-gray-700">Adoption Probability</span>
            <Badge variant="secondary" className="ml-2">{adoption_probability}</Badge>
          </div>
          <div>
            <span className="font-medium text-gray-700">Churn Risk</span>
            <Badge variant="secondary" className="ml-2">{churn_risk}</Badge>
          </div>
          <div>
            <span className="font-medium text-gray-700">Referral Likelihood</span>
            <Badge variant="secondary" className="ml-2">{referral_likelihood}</Badge>
          </div>
        </div>

        {/* Regional Heat */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Regional Heat</h4>
          <ul>
            {Object.entries(regional_heat).map(([region, heat]) => (
              <li key={region} className="text-sm text-gray-600">
                <strong>{region}:</strong> {heat}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Summary */}
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Executive Summary</h4>
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
            {summary}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}