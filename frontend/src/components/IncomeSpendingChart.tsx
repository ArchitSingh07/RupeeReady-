import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface ChartData {
  month: string;
  income: number;
  spending: number;
}

interface IncomeSpendingChartProps {
  data: ChartData[];
}

export function IncomeSpendingChart({ data }: IncomeSpendingChartProps) {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalSpending = data.reduce((sum, item) => sum + item.spending, 0);
  const netChange = totalIncome - totalSpending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Income & Spending Trends</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
            <span className="text-sm text-gray-400">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
            <span className="text-sm text-gray-400">Spending</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30">
          <p className="text-xs text-gray-400 mb-2">Total Income</p>
          <p className="text-2xl text-teal-400">
            {formatIndianCurrency(totalIncome)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
          <p className="text-xs text-gray-400 mb-2">Total Spending</p>
          <p className="text-2xl text-orange-400">
            {formatIndianCurrency(totalSpending)}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${netChange >= 0 ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30' : 'bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30'} border`}>
          <p className="text-xs text-gray-400 mb-2">Net Change</p>
          <div className="flex items-center gap-2">
            {netChange >= 0 ? (
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <p className={`text-2xl ${netChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatIndianCurrency(Math.abs(netChange))}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="line" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
          <TabsTrigger 
            value="line" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-teal-400 text-gray-400"
          >
            Trend
          </TabsTrigger>
          <TabsTrigger 
            value="bar" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-teal-400 text-gray-400"
          >
            Comparison
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="line" className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                stroke="rgba(255, 255, 255, 0.2)"
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                stroke="rgba(255, 255, 255, 0.2)"
                tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#F5F5F5'
                }}
                formatter={(value: number) => formatIndianCurrency(value)}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="url(#incomeGradient)" 
                strokeWidth={3}
                dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#14B8A6' }}
              />
              <Line 
                type="monotone" 
                dataKey="spending" 
                stroke="url(#spendingGradient)" 
                strokeWidth={3}
                dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#FF6B35' }}
              />
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="bar" className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                stroke="rgba(255, 255, 255, 0.2)"
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                stroke="rgba(255, 255, 255, 0.2)"
                tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#F5F5F5'
                }}
                formatter={(value: number) => formatIndianCurrency(value)}
              />
              <Bar dataKey="income" fill="url(#incomeBarGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="spending" fill="url(#spendingBarGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="incomeBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="spendingBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
