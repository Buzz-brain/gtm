'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Users, Eye } from 'lucide-react';
import { mockHistoryData } from '@/lib/mockData';

export default function History() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simulation History
            </span>
          </h1>
          <p className="text-gray-600 mb-8">
            Review your past simulations and insights.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {mockHistoryData.map((simulation, index) => (
            <motion.div
              key={simulation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-white/40 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="mr-2">
                        {simulation.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {simulation.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {simulation.query}
                    </h3>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                        Adoption: {simulation.metrics.adoption}%
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-blue-600" />
                        Target: {simulation.metrics.targetUsers}
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 mr-1 text-purple-600">₦</span>
                        Revenue: {simulation.metrics.projectedRevenue}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2">
                      {simulation.summary}
                    </p>
                  </div>
                  
                  <div className="ml-4 flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {mockHistoryData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 bg-white/70 backdrop-blur-sm border-white/40 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Simulations Yet
              </h3>
              <p className="text-gray-600">
                Start your first simulation in the dashboard to see your history here.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}