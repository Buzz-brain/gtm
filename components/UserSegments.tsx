'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface UserSegment {
  id: string;
  name: string;
  size: number;
  demographics: {
    ageRange: string;
    income: string;
    location: string;
    interests: string[];
  };
  behavior: {
    adoptionRate: number;
    avgSpend: number;
    retention: number;
  };
  color: string;
}

interface UserSegmentsProps {
  segments: UserSegment[];
}

export default function UserSegments({ segments }: UserSegmentsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {segments.map((segment, index) => (
        <motion.div
          key={segment.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-white/40 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${segment.color} mr-2`}></div>
                <h3 className="text-lg font-semibold">{segment.name}</h3>
              </div>
              <Badge variant="outline">{segment.size}% of market</Badge>
            </div>

            {/* Demographics */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Demographics
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Age:</span> {segment.demographics.ageRange}
                </div>
                <div>
                  <span className="font-medium">Income:</span> {segment.demographics.income}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Location:</span> {segment.demographics.location}
                </div>
              </div>
              
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">Interests:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {segment.demographics.interests.map((interest, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Behavior Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  Adoption Rate
                </div>
                <span className="font-semibold text-green-600">
                  {segment.behavior.adoptionRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${segment.behavior.adoptionRate}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1 text-blue-600" />
                  Avg Spend/Month
                </div>
                <span className="font-semibold text-blue-600">
                  ₦{segment.behavior.avgSpend.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                  Retention Rate
                </div>
                <span className="font-semibold text-purple-600">
                  {segment.behavior.retention}%
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}