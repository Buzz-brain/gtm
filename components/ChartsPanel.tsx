'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Workaround for recharts/React type incompatibility
const ResponsiveContainerAny = ResponsiveContainer as any;
const LineChartAny = LineChart as any;
const AreaChartAny = AreaChart as any;
const PieChartAny = PieChart as any;
const XAxisAny = XAxis as any;
const YAxisAny = YAxis as any;
const CartesianGridAny = CartesianGrid as any;
const TooltipAny = Tooltip as any;
const LineAny = Line as any;
const AreaAny = Area as any;
const PieAny = Pie as any;
const CellAny = Cell as any;

interface ChartData {
  adoptionCurve: Array<{ month: string; users: number; churn: number }>;
  revenueProjection: Array<{ month: string; revenue: number; costs: number }>;
  marketShare: Array<{ segment: string; value: number; color: string }>;
}

interface ChartsPanelProps {
  data: ChartData;
}

export default function ChartsPanel({ data }: ChartsPanelProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Adoption vs Churn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-4 sm:p-6 bg-white/50 backdrop-blur-sm border-white/40">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">User Adoption vs Churn Rate</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainerAny width="100%" height="100%">
              <LineChartAny data={data.adoptionCurve}>
                <CartesianGridAny strokeDasharray="3 3" opacity={0.3} />
                <XAxisAny dataKey="month" />
                <YAxisAny />
                <TooltipAny 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <LineAny 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="New Users"
                />
                <LineAny 
                  type="monotone" 
                  dataKey="churn" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="Churn Rate (%)"
                />
              </LineChartAny>
            </ResponsiveContainerAny>
          </div>
        </Card>
      </motion.div>

      {/* Revenue Projection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-4 sm:p-6 bg-white/50 backdrop-blur-sm border-white/40">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Revenue vs Costs Projection</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainerAny width="100%" height="100%">
              <AreaChartAny data={data.revenueProjection}>
                <CartesianGridAny strokeDasharray="3 3" opacity={0.3} />
                <XAxisAny dataKey="month" />
                <YAxisAny />
                <TooltipAny 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
                />
                <AreaAny
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="Revenue"
                />
                <AreaAny
                  type="monotone"
                  dataKey="costs"
                  stackId="2"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.3}
                  name="Costs"
                />
              </AreaChartAny>
            </ResponsiveContainerAny>
          </div>
          <div className="h-64">
            <ResponsiveContainerAny width="100%" height="100%">
              <PieChartAny>
                <PieAny
                  data={data.marketShare}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segment, value }: { segment: string; value: number }) => `${segment}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.marketShare.map((entry, index) => (
                    <CellAny key={`cell-${index}`} fill={entry.color} />
                  ))}
                </PieAny>
                <TooltipAny 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px'
                  }}
                />
              </PieChartAny>
            </ResponsiveContainerAny>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}