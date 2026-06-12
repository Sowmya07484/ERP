"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Truck, Calendar, FileText, ChevronRight } from "lucide-react";
import { mockPurchaseOrders } from "@/lib/erp-data";

export default function ProcurementPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-green-100 text-green-700 border-none';
      case 'Ordered': return 'bg-blue-100 text-blue-700 border-none';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-none';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-none';
      default: return 'bg-slate-100 text-slate-700 border-none';
    }
  };

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline text-slate-900">Procurement Management</h1>
            <p className="text-muted-foreground">Manage purchase orders and supplier relationships.</p>
          </div>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4" /> Create Purchase Order
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Truck size={24} /></div>
            <div>
              <p className="text-sm text-muted-foreground">Active POs</p>
              <h4 className="text-2xl font-bold font-headline">12</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600"><Calendar size={24} /></div>
            <div>
              <p className="text-sm text-muted-foreground">Due This Week</p>
              <h4 className="text-2xl font-bold font-headline">4</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600"><FileText size={24} /></div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spend (MTD)</p>
              <h4 className="text-2xl font-bold font-headline">$42,850</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search POs, suppliers or materials..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPurchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-bold text-xs">{po.poNumber}</TableCell>
                  <TableCell className="font-medium">{po.supplier}</TableCell>
                  <TableCell>{po.material}</TableCell>
                  <TableCell>{po.quantity.toLocaleString()} units</TableCell>
                  <TableCell className="font-bold font-mono text-orange-600">${po.totalCost.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{po.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(po.status)}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-2">
                      Details <ChevronRight size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ERPShell>
  );
}