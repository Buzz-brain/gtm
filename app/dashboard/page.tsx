'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, TrendingUp, Users, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeatmapComponent from '@/components/HeatmapComponent';
import ChartsPanel from '@/components/ChartsPanel';
import UserSegments from '@/components/UserSegments';
import SummaryReport from '@/components/SummaryReport';
import { generateMockResults } from '@/lib/mockData';

interface SimulationResult {
  id: string;
  query: string;
  timestamp: Date;
  heatmapData: any;
  chartData: any;
  userSegments: any[];
  summary: string;
}

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentResult, setCurrentResult] = useState<SimulationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSimulating(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResult = generateMockResults(query);
    setCurrentResult(mockResult);
    setIsSimulating(false);
    setQuery('');
  };

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
              Startup Simulation Dashboard
            </span>
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your startup hypothesis and get AI-powered insights instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-white/40 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Send className="w-5 h-5 mr-2 text-blue-600" />
                Simulation Input
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your startup idea or hypothesis:
                  </label>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., I want to launch an EdTech startup targeting university students in Lagos"
                    className="min-h-20 resize-none"
                    disabled={isSimulating}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSimulating || !query.trim()}
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Run Simulation
                    </>
                  )}
                </Button>
              </form>

              {/* Example Queries */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Example queries:</h3>
                <div className="space-y-2">
                  {[
                    "Launch a fintech app for small businesses in Nigeria",
                    "Create a food delivery service in Abuja",
                    "Build an AI tutoring platform for secondary schools"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(example)}
                      className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                      disabled={isSimulating}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {currentResult ? (
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-white/40">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Simulation Results</h2>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Query: "{currentResult.query}"
                  </p>
                </div>

                <Tabs defaultValue="heatmap" className="w-full">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="heatmap" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Heatmap
                    </TabsTrigger>
                    <TabsTrigger value="charts" className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Charts
                    </TabsTrigger>
                    <TabsTrigger value="segments" className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Segments
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Summary
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="heatmap" className="mt-6">
                    <HeatmapComponent data={currentResult.heatmapData} />
                  </TabsContent>

                  <TabsContent value="charts" className="mt-6">
                    <ChartsPanel data={currentResult.chartData} />
                  </TabsContent>

                  <TabsContent value="segments" className="mt-6">
                    <UserSegments segments={currentResult.userSegments} />
                  </TabsContent>

                  <TabsContent value="summary" className="mt-6">
                    <SummaryReport summary={currentResult.summary} />
                  </TabsContent>
                </Tabs>
              </Card>
            ) : (
              <Card className="p-12 bg-white/70 backdrop-blur-sm border-white/40 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Simulate Your Idea?
                </h3>
                <p className="text-gray-600">
                  Enter your startup hypothesis in the chat box to get instant AI-powered insights, 
                  market analysis, and revenue projections.
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}