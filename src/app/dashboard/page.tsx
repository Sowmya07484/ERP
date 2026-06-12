"use client";

import { ERPShell } from "@/components/erp/shell";
import { KPICard } from "@/components/erp/kpi-card";
import { 
  ShoppingCart, Activity, Clock, DollarSign, TrendingUp, 
  TrendingDown, AlertCircle, Package, Factory, Truck
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const revenueData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
];

const orderStatusData = [
  { name: 'Pending', value: 400 },
  { name: 'Active', value: 300 },
  { name: 'Completed', value: 300 },
  { name: 'Cancelled', value: 200 },
];

const COLORS = ['#F97316', '#EA580C', '#FB923C', '#FDBA74'];

export default function DashboardPage() {
  return (
    <ERPShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Command Center</h1>
          <p className="text-muted-foreground">Real-time enterprise metrics and performance indicators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Orders" value="1,284" icon={ShoppingCart} trend={{ value: 12, isUp: true }} />
          <KPICard title="Active Orders" value="482" icon={Activity} />
          <KPICard title="Pending Orders" value="124" icon={Clock} />
          <KPICard title="Revenue" value="₹4,82,000" icon={DollarSign} trend={{ value: 8.5, isUp: true }} />
          <KPICard title="Expenses" value="₹2,10,400" icon={TrendingDown} />
          <KPICard title="Net Profit" value="₹2,71,600" icon={TrendingUp} trend={{ value: 4.2, isUp: true }} />
          <KPICard title="Stock Value" value="₹1.2Cr" icon={Package} />
          <KPICard title="Reorder Alerts" value="18" icon={AlertCircle} iconClassName="bg-red-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm border-none">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Revenue vs Profit (₹)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  <Area type="monotone" dataKey="revenue" stroke="#F97316" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                  <Area type="monotone" dataKey="profit" stroke="#EA580C" fillOpacity={0} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Order Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {orderStatusData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="production" className="w-full">
          <TabsList className="bg-white border mb-4">
            <TabsTrigger value="production">Production Status</TabsTrigger>
            <TabsTrigger value="procurement">Procurement</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          <TabsContent value="production" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="Total Production Cost" value="₹84,200" icon={Factory} />
                <KPICard title="Active Batches" value="12" icon={Activity} />
                <KPICard title="Completed Units" value="4,200" icon={Package} />
             </div>
          </TabsContent>
          <TabsContent value="procurement">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="Open Purchase Orders" value="8" icon={Truck} />
                <KPICard title="Transit Status" value="3 In Transit" icon={Activity} />
                <KPICard title="Total Spend" value="₹1,25,000" icon={DollarSign} />
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </ERPShell>
  );
}