"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { KPICard } from "@/components/erp/kpi-card";

export default function PaymentsPage() {
  const mockPayments = [
    { id: 'pay1', invoice: 'INV-2024-001', customer: 'Global Manufacturing Inc.', amount: 5110, date: '2024-03-12', status: 'Paid', method: 'Bank Transfer' },
    { id: 'pay2', invoice: 'INV-2024-002', customer: 'Aero Dynamics', amount: 6220, date: '2024-03-18', status: 'Pending', method: 'Credit' },
  ];

  return (
    <ERPShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Payments & Follow Up</h1>
          <p className="text-muted-foreground">Manage accounts receivable and payment tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard title="Total Received" value="₹1,24,500" icon={CheckCircle2} trend={{ value: 15, isUp: true }} />
          <KPICard title="Outstanding" value="₹42,800" icon={Clock} />
          <KPICard title="Overdue" value="₹12,400" icon={DollarSign} iconClassName="bg-red-50" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((pay) => (
                <TableRow key={pay.id}>
                  <TableCell className="font-bold">{pay.invoice}</TableCell>
                  <TableCell>{pay.customer}</TableCell>
                  <TableCell className="font-mono">₹{pay.amount.toLocaleString()}</TableCell>
                  <TableCell>{pay.date}</TableCell>
                  <TableCell>{pay.method}</TableCell>
                  <TableCell>
                    <Badge variant={pay.status === 'Paid' ? 'default' : 'outline'} className={pay.status === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}>
                      {pay.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Send Reminder</Button>
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