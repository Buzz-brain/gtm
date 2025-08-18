'use client';

import { useState, useRef } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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
  const [showModal, setShowModal] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Helper to detect mobile (Tailwind's md: is 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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

    // Show modal only on mobile
    if (window.innerWidth < 1024) {
      setShowModal(true);
    }
  };

  const handleViewResults = () => {
    setShowModal(false);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // Wait for modal to close
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Startup Simulation Dashboard
            </span>
          </h1>
          <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
            Enter your startup hypothesis and get AI-powered insights instantly.
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Feedback Modal (mobile/tablet only) */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[350px] rounded-xl">
              <DialogHeader>
                <DialogTitle>Simulation Complete!</DialogTitle>
              </DialogHeader>
              <div className="py-2 text-center">
                <p className="text-gray-700 mb-4">Your simulation results are ready.</p>
                <Button onClick={handleViewResults} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  View Results
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Chat Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-white/40 sticky top-24">
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
            ref={resultsRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 order-1 lg:order-2 mb-4 lg:mb-0"
          >
            {currentResult ? (
              <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-white/40">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">Simulation Results</h2>
                  <p className="text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-base">
                    Query: "{currentResult.query}"
                  </p>
                </div>

                {/* Responsive, scrollable, sticky tab bar on mobile */}
                <Tabs defaultValue="heatmap" className="w-full">
                  <div className="sticky top-16 z-10 bg-white/90 rounded-t-lg overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                    <TabsList className="flex w-full min-w-[400px] sm:min-w-0 sm:grid sm:grid-cols-4">
                      <TabsTrigger value="heatmap" className="flex items-center min-w-[90px] justify-center text-xs sm:text-base">
                        <MapPin className="w-4 h-4 mr-1" />
                        Heatmap
                      </TabsTrigger>
                      <TabsTrigger value="charts" className="flex items-center min-w-[90px] justify-center text-xs sm:text-base">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Charts
                      </TabsTrigger>
                      <TabsTrigger value="segments" className="flex items-center min-w-[90px] justify-center text-xs sm:text-base">
                        <Users className="w-4 h-4 mr-1" />
                        Segments
                      </TabsTrigger>
                      <TabsTrigger value="summary" className="flex items-center min-w-[90px] justify-center text-xs sm:text-base">
                        <FileText className="w-4 h-4 mr-1" />
                        Summary
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="heatmap" className="mt-4 sm:mt-6">
                    <HeatmapComponent data={currentResult.heatmapData} />
                  </TabsContent>

                  <TabsContent value="charts" className="mt-4 sm:mt-6">
                    <ChartsPanel data={currentResult.chartData} />
                  </TabsContent>

                  <TabsContent value="segments" className="mt-4 sm:mt-6">
                    <UserSegments segments={currentResult.userSegments} />
                  </TabsContent>

                  <TabsContent value="summary" className="mt-4 sm:mt-6">
                    <SummaryReport summary={currentResult.summary} />
                  </TabsContent>
                </Tabs>
              </Card>
            ) : (
              <Card className="p-8 sm:p-12 bg-white/70 backdrop-blur-sm border-white/40 text-center">
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