import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
  FileText,
  CreditCard,
  FileBox,
  Briefcase,
  Users,
  Search,
  Filter,
  Download,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Reports() {
  const [revenuePeriod, setRevenuePeriod] = useState('This Month');
  const [sourcePeriod, setSourcePeriod] = useState('This Month');
  const [clientsPeriod, setClientsPeriod] = useState('This Month');

  const lineChartData = [
    { name: 'May 1', value: 500000 },
    { name: 'May 6', value: 800000 },
    { name: 'May 11', value: 1200000 },
    { name: 'May 16', value: 900000 },
    { name: 'May 21', value: 1500000 },
    { name: 'May 26', value: 1100000 },
    { name: 'May 31', value: 1800000 },
  ];

  const pieChartData = [
    { name: 'Project Payments', value: 7250000, color: '#3b82f6', percent: '57.2%' },
    { name: 'Retainer Contracts', value: 2850000, color: '#10b981', percent: '22.5%' },
    { name: 'Consulting Services', value: 1680000, color: '#f59e0b', percent: '13.3%' },
    { name: 'Training Programs', value: 650000, color: '#8b5cf6', percent: '5.1%' },
    { name: 'Other Income', value: 250000, color: '#06b6d4', percent: '2.0%' },
  ];

  const topClientsData = [
    { id: 1, name: 'Quick Capital Ltd', amount: '₦2,450,000', logo: 'QC', color: 'bg-blue-500 text-white' },
    { id: 2, name: 'SparkPoint Solutions', amount: '₦1,980,000', logo: 'SP', color: 'bg-orange-500 text-white' },
    { id: 3, name: 'GreenLife Farms', amount: '₦1,420,000', logo: 'GL', color: 'bg-emerald-600 text-white' },
    { id: 4, name: 'Studio X Conference', amount: '₦1,150,000', logo: 'SX', color: 'bg-zinc-900 text-white' },
    { id: 5, name: 'Alpha Tech NG', amount: '₦980,000', logo: 'AT', color: 'bg-blue-400 text-white' },
  ];

  const reportsData = [
    {
      name: 'Revenue Summary',
      desc: 'Overview of revenue and income',
      type: 'Summary',
      period: 'May 1 - May 31, 2025',
      lastGenerated: 'May 31, 2025, 8:30 AM',
      status: 'Completed',
      iconColor: 'text-blue-500 bg-blue-500/10'
    },
    {
      name: 'Payments Report',
      desc: 'All payments received',
      type: 'Detailed',
      period: 'May 1 - May 31, 2025',
      lastGenerated: 'May 31, 2025, 8:25 AM',
      status: 'Completed',
      iconColor: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      name: 'Invoices Report',
      desc: 'Invoice status and overview',
      type: 'Detailed',
      period: 'May 1 - May 31, 2025',
      lastGenerated: 'May 31, 2025, 8:20 AM',
      status: 'Completed',
      iconColor: 'text-amber-500 bg-amber-500/10'
    },
    {
      name: 'Project Performance',
      desc: 'Projects progress and revenue',
      type: 'Summary',
      period: 'May 1 - May 31, 2025',
      lastGenerated: 'May 31, 2025, 8:10 AM',
      status: 'Scheduled',
      iconColor: 'text-purple-500 bg-purple-500/10'
    },
    {
      name: 'Client Activity',
      desc: 'Client engagement and activity',
      type: 'Detailed',
      period: 'May 1 - May 31, 2025',
      lastGenerated: 'May 31, 2025, 8:00 AM',
      status: 'Completed',
      iconColor: 'text-cyan-500 bg-cyan-500/10'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Reports | Admin Dashboard" />

      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-gilroy font-bold text-text-primary mb-2">Reports</h1>
          <p className="text-text-secondary text-sm">Track performance and analyze key business metrics.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
          <div className="relative flex items-center w-full sm:w-auto">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="pl-9 pr-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm w-full sm:w-[240px] focus:ring-1 focus:ring-brand-red/50 focus:border-brand-red/50 outline-none transition-all"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-surface border border-bg-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-border transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Total Revenue</p>
              <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none mb-1">₦12,680,000</h3>
              <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.6% vs last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Total Payments</p>
              <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none mb-1">₦11,360,000</h3>
              <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14.2% vs last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <FileBox className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Total Invoices</p>
              <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none mb-1">₦12,950,000</h3>
              <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.7% vs last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Total Projects</p>
              <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none mb-1">78</h3>
              <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +9.0% vs last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-text-secondary text-[11px] font-medium mb-1">Total Clients</p>
              <h3 className="text-xl font-gilroy font-bold text-text-primary leading-none mb-1">78</h3>
              <p className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.3% vs last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Revenue Overview Chart */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Revenue Overview</h2>
            <button className="flex items-center gap-2 text-xs font-medium text-text-secondary bg-bg-base px-3 py-1.5 rounded-lg border border-bg-border">
              {revenuePeriod} <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="text-3xl font-gilroy font-bold text-text-primary mb-1">₦12,680,000</h3>
              <p className="text-sm text-text-secondary">Total Revenue</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-500 flex items-center gap-1 justify-end">
                <TrendingUp className="w-4 h-4" /> 18.6%
              </p>
              <p className="text-[11px] text-text-secondary mt-1">vs Apr 1 - Apr 30, 2025</p>
            </div>
          </div>

          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-bg-border" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'currentColor' }} 
                  className="text-text-secondary"
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'currentColor' }} 
                  className="text-text-secondary"
                  tickFormatter={(val) => `₦${(val/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-bg-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3b82f6' }}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary">
            <div className="w-3 h-1 bg-blue-500 rounded-full"></div>
            <span>Revenue (₦)</span>
          </div>
        </div>

        {/* Revenue by Source Chart */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-text-primary">Revenue by Source</h2>
            <button className="flex items-center gap-2 text-xs font-medium text-text-secondary bg-bg-base px-3 py-1.5 rounded-lg border border-bg-border">
              {sourcePeriod} <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          <div className="relative h-[200px] mb-8 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₦${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-bg-border)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-gilroy font-bold text-text-primary">₦12.68M</span>
              <span className="text-[11px] font-medium text-text-secondary">Total</span>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {pieChartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-text-secondary">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-text-primary">₦{(item.value/1000).toLocaleString()}K</span>
                  <span className="text-text-secondary text-[11px] w-8 text-right">{item.percent}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
            View full breakdown <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Top Clients */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Top Clients by Revenue</h2>
            <button className="flex items-center gap-2 text-xs font-medium text-text-secondary bg-bg-base px-3 py-1.5 rounded-lg border border-bg-border">
              {clientsPeriod} <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-5">
            {topClientsData.map((client, index) => (
              <div key={client.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-text-secondary w-4">{index + 1}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] ${client.color}`}>
                    {client.logo}
                  </div>
                  <span className="text-sm font-bold text-text-primary">{client.name}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">{client.amount}</span>
              </div>
            ))}
          </div>

          <button className="mt-8 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
            View all clients report <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reports Table */}
        <div className="bg-bg-surface border border-bg-border rounded-2xl flex flex-col overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-bg-border">
            <h2 className="text-lg font-bold text-text-primary">Report Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-bg-border bg-bg-base/50">
                  <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Report Name</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Period</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Last Generated</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {reportsData.map((report, idx) => (
                  <tr key={idx} className="hover:bg-bg-base/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${report.iconColor}`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">{report.name}</p>
                          <p className="text-[11px] text-text-secondary mt-0.5">{report.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-text-primary">{report.type}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[13px] text-text-primary">{report.period}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[13px] text-text-secondary">{report.lastGenerated}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-[11px] font-bold ${report.status === 'Completed' ? 'text-emerald-500' : 'text-blue-500'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-bg-border hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-bg-border hover:bg-bg-border text-text-secondary hover:text-text-primary transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 mt-auto">
            <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1 ml-4">
              View all reports <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
