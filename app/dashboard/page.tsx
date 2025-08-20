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

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface SimulationResult {
  adoption_probability: number;
  churn_risk: number;
  referral_likelihood: number;
  regional_heat: { [region: string]: string };
  adoption_curve: number[];
  retention_curve: number[];
  revenue_projection: {
    month_1: number;
    month_3: number;
    month_6: number;
    month_12: number;
  };
  customer_segments: {
    students: number;
    working_class: number;
    entrepreneurs: number;
  };
  satisfaction_score: number;
  break_even_point_months: number;
  industry_fit: string;
  summary: string;
  query: string;
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


    try {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiBaseUrl}/api/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario: query }),
      });
      if (!response.ok) throw new Error('Simulation failed');
  const data = await response.json();
  setCurrentResult({ ...data, query });
    } catch (error) {
      alert('Error running simulation. Please try again.');
    } finally {
      setIsSimulating(false);
      setQuery('');
    }

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
                    <HeatmapComponent
                      data={{
                        regions: Object.entries(currentResult.regional_heat).map(([name, heat]) => ({
                          name,
                          adoption: heat === "high" ? 0.8 : heat === "medium" ? 0.5 : 0.2,
                          resistance: heat === "low" ? 0.7 : heat === "medium" ? 0.4 : 0.1,
                          color: heat === "high" ? "bg-green-500" : heat === "medium" ? "bg-blue-500" : "bg-purple-500"
                        }))
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="charts" className="mt-4 sm:mt-6">
                    <ChartsPanel
                      data={{
                        adoptionCurve: currentResult.adoption_curve.map((val, idx) => ({
                          month: `Month ${idx + 1}`,
                          users: Math.round(val * 100),
                          churn: Math.round((currentResult.retention_curve[idx] ? 1 - currentResult.retention_curve[idx] : 0) * 100)
                        })),
                        revenueProjection: [
                          { month: "Month 1", revenue: currentResult.revenue_projection.month_1, costs: 0 },
                          { month: "Month 3", revenue: currentResult.revenue_projection.month_3, costs: 0 },
                          { month: "Month 6", revenue: currentResult.revenue_projection.month_6, costs: 0 },
                          { month: "Month 12", revenue: currentResult.revenue_projection.month_12, costs: 0 }
                        ],
                        marketShare: [
                          { segment: "Students", value: currentResult.customer_segments.students * 100, color: "#3B82F6" },
                          { segment: "Working Class", value: currentResult.customer_segments.working_class * 100, color: "#10B981" },
                          { segment: "Entrepreneurs", value: currentResult.customer_segments.entrepreneurs * 100, color: "#F59E42" }
                        ]
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="segments" className="mt-4 sm:mt-6">
                    <UserSegments
                      segments={[
                        { id: "students", name: "Students", size: currentResult.customer_segments.students * 100, demographics: { ageRange: "18-25", income: "Low", location: "Urban", interests: ["Education", "Tech"] }, behavior: { adoptionRate: currentResult.adoption_curve[2] * 100, avgSpend: 50, retention: currentResult.retention_curve[2] * 100 }, color: "bg-blue-500" },
                        { id: "working_class", name: "Working Class", size: currentResult.customer_segments.working_class * 100, demographics: { ageRange: "25-40", income: "Medium", location: "Urban", interests: ["Business", "Finance"] }, behavior: { adoptionRate: currentResult.adoption_curve[3] * 100, avgSpend: 100, retention: currentResult.retention_curve[3] * 100 }, color: "bg-green-500" },
                        { id: "entrepreneurs", name: "Entrepreneurs", size: currentResult.customer_segments.entrepreneurs * 100, demographics: { ageRange: "30-50", income: "High", location: "Urban", interests: ["Startups", "Networking"] }, behavior: { adoptionRate: currentResult.adoption_curve[4] * 100, avgSpend: 200, retention: currentResult.retention_curve[4] * 100 }, color: "bg-yellow-500" }
                      ]}
                    />
                  </TabsContent>

                  <TabsContent value="summary" className="mt-4 sm:mt-6">
                    <SummaryReport
                      adoption_probability={currentResult.adoption_probability}
                      churn_risk={currentResult.churn_risk}
                      referral_likelihood={currentResult.referral_likelihood}
                      regional_heat={currentResult.regional_heat}
                      summary={currentResult.summary}
                      query={currentResult.query}
                    />
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