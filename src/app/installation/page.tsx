"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, User, Clock, CheckCircle2 } from "lucide-react";
import { mockInstallations } from "@/lib/erp-data";

export default function InstallationPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-none';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-none';
      case 'Scheduled': return 'bg-slate-100 text-slate-700 border-none';
      case 'Delayed': return 'bg-red-100 text-red-700 border-none';
      default: return 'bg-slate-100 text-slate-700 border-none';
    }
  };

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline text-slate-900">Installation Tracking</h1>
            <p className="text-muted-foreground">Monitor on-site product installations and field service.</p>
          </div>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4" /> Schedule Installation
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search installations by customer or location..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInstallations.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-bold text-xs">{job.orderNumber}</TableCell>
                  <TableCell className="font-medium">{job.customer}</TableCell>
                  <TableCell className="text-sm">{job.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} className="text-orange-500" />
                      {job.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs">
                      <User size={12} className="text-slate-400" />
                      {job.technician}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} className="text-slate-400" />
                      {job.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                      View Log
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4">
            <h4 className="font-headline font-bold flex items-center gap-2">
              <CheckCircle2 className="text-orange-500" /> 
              Installation Quality
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Completion Rate</span>
                <span className="font-bold">94%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[94%]" />
              </div>
              <p className="text-xs text-slate-500">Based on 48 installations this quarter.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-headline font-bold text-slate-900">Upcoming Schedule</h4>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Valve Installation #20{i}</span>
                    <span className="text-xs text-muted-foreground">March 28, 2024</span>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ERPShell>
  );
}