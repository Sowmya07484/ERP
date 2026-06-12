
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileWarning, RotateCcw, ShieldAlert, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  const returns = [
    { id: 'ret1', order: 'ORD-2024-001', product: 'Industrial Valve X1', reason: 'Defective Seal', status: 'Inspecting', date: '2024-03-15' },
    { id: 'ret2', order: 'ORD-2023-992', product: 'Steel Casting M2', reason: 'Incorrect Specs', status: 'Refunded', date: '2024-03-10' },
  ];

  return (
    <ERPShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Returns & Damage</h1>
          <p className="text-muted-foreground">Manage RMAs, defect reporting, and inventory adjustments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><ShieldAlert size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase text-red-800 tracking-wider">Defect Rate</p>
              <h4 className="text-2xl font-bold">1.2% <span className="text-xs text-green-600">↓ 0.4%</span></h4>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><RotateCcw size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase text-blue-800 tracking-wider">Active RMAs</p>
              <h4 className="text-2xl font-bold">5</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map((ret) => (
                <TableRow key={ret.id}>
                  <TableCell className="font-bold">{ret.order}</TableCell>
                  <TableCell>{ret.product}</TableCell>
                  <TableCell className="text-xs italic">{ret.reason}</TableCell>
                  <TableCell>{ret.date}</TableCell>
                  <TableCell>
                    <Badge variant={ret.status === 'Refunded' ? 'default' : 'secondary'} className={ret.status === 'Refunded' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}>
                      {ret.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Inspect</Button>
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
