'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';

interface HeatmapData {
  regions: Array<{
    name: string;
    adoption: number;
    resistance: number;
    color: string;
  }>;
}

interface HeatmapComponentProps {
  data: HeatmapData;
}

export default function HeatmapComponent({ data }: HeatmapComponentProps) {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm border-white/40">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
        Market Adoption Heatmap
      </h3>
      
      {/* Mock Nigeria Map */}
      <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 mb-6">
        <div className="text-center py-12">
          <div className="w-64 h-40 mx-auto bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-600/40 animate-pulse"></div>
            <div className="z-10 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-blue-900">Nigeria Market Map</p>
              <p className="text-sm text-blue-700">Adoption Heatmap Visualization</p>
            </div>
            
            {/* Mock Regional Indicators */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-12 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-6 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.regions.map((region, index) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`p-4 rounded-lg ${region.color} border`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{region.name}</h4>
              <div className="flex items-center">
                {region.adoption > 60 ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Adoption Rate</span>
                <span className="font-semibold text-green-600">{region.adoption}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${region.adoption}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Resistance</span>
                <span className="font-semibold text-red-600">{region.resistance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${region.resistance}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}