"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Users, Eye } from "lucide-react";

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState<any | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiBaseUrl}/api/history`);
        const data = await res.json();
        console.log(data)
        setHistoryData(data);
      } catch (err) {
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simulation History
            </span>
          </h1>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            Review your past simulations and insights.
          </p>
        </motion.div>

        {loading ? (
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
                Loading Simulations...
              </h3>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {historyData.map((simulation, index) => (
              <motion.div
                key={simulation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="flex flex-col h-full p-5 bg-white/90 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {simulation.timestamp
                          ? new Date(simulation.timestamp).toLocaleDateString()
                          : ""}
                      </div>
                      {simulation.category && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          {simulation.category}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {simulation.query || simulation.scenario}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center min-w-[100px] bg-blue-50 rounded px-2 py-1">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                        <span className="font-medium">Adoption:</span>
                        <span className="ml-1">
                          {simulation.metrics?.adoption_probability}
                        </span>
                      </div>
                      <div className="flex items-center min-w-[100px] bg-purple-50 rounded px-2 py-1">
                        <Users className="w-4 h-4 mr-1 text-blue-600" />
                        <span className="font-medium">Churn:</span>
                        <span className="ml-1">
                          {simulation.metrics?.churn_risk}
                        </span>
                      </div>
                      <div className="flex items-center min-w-[100px] bg-green-50 rounded px-2 py-1">
                        <span className="w-4 h-4 mr-1 text-purple-600">↗</span>
                        <span className="font-medium">Referral:</span>
                        <span className="ml-1">
                          {simulation.metrics?.referral_likelihood}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base mb-2 line-clamp-3">
                      {simulation.summary}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex justify-center items-center gap-2"
                      onClick={() => {
                        setSelectedSimulation(simulation);
                        setModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && historyData.length === 0 && (
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
                Start your first simulation in the dashboard to see your history
                here.
              </p>
            </Card>
          </motion.div>
        )}

        {/* Modal for simulation details */}
        {modalOpen && selectedSimulation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn max-h-screen overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-2 text-blue-700">
                Simulation Details
              </h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="font-semibold">Date:</span>{" "}
                {selectedSimulation.timestamp
                  ? new Date(selectedSimulation.timestamp).toLocaleString()
                  : "N/A"}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Scenario/Query:</span>{" "}
                {selectedSimulation.query || selectedSimulation.scenario}
              </div>
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded p-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">Adoption:</span>
                  <span className="ml-1">
                    {selectedSimulation.metrics?.adoption_probability}
                  </span>
                </div>
                <div className="bg-purple-50 rounded p-2 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium">Churn:</span>
                  <span className="ml-1">
                    {selectedSimulation.metrics?.churn_risk}
                  </span>
                </div>
                <div className="bg-green-50 rounded p-2 flex items-center">
                  <span className="w-4 h-4 mr-2 text-purple-600">↗</span>
                  <span className="font-medium">Referral:</span>
                  <span className="ml-1">
                    {selectedSimulation.metrics?.referral_likelihood}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Summary:</span>
                <p className="mt-1 text-gray-700 text-sm whitespace-pre-line">
                  {selectedSimulation.summary}
                </p>
              </div>
              {selectedSimulation.revenue_projection && (
                <div className="mb-4">
                  <span className="font-semibold">Revenue Projection:</span>
                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {Object.entries(selectedSimulation.revenue_projection).map(([month, value]) => (
                      <li key={month}>{month}: ${value as number}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedSimulation.customer_segments && (
                <div className="mb-4">
                  <span className="font-semibold">Customer Segments:</span>
                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {Object.entries(selectedSimulation.customer_segments).map(
                      ([segment, percent]) => (
                        <li key={segment}>
                          {segment}: {(percent as number) * 100}%
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {selectedSimulation.regional_heat && (
                <div className="mb-4">
                  <span className="font-semibold">Regional Heat:</span>
                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {Object.entries(selectedSimulation.regional_heat).map(
                      ([region, heat]) => (
                        <li key={region}>
                          {region}: {heat as string}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {/* Add more fields as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}