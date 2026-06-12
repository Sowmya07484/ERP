"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Send, CheckCircle, Clock } from "lucide-react";
import { mockQuotations } from "@/lib/erp-data";

export default function QuotationsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-700 border-none';
      case 'Sent': return 'bg-blue-100 text-blue-700 border-none';
      case 'Draft': return 'bg-slate-100 text-slate-700 border-none';
      case 'Expired': return 'bg-red-100 text-red-700 border-none';
      default: return 'bg-slate-100 text-slate-700 border-none';
    }
  };

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline text-slate-900">Quotations</h1>
            <p className="text-muted-foreground">Manage sales estimates and proposals.</p>
          </div>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4" /> New Quotation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Drafts</p>
              <FileText size={16} className="text-slate-400" />
            </div>
            <h4 className="text-2xl font-bold">5</h4>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Sent</p>
              <Send size={16} className="text-blue-500" />
            </div>
            <h4 className="text-2xl font-bold">12</h4>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Accepted</p>
              <CheckCircle size={16} className="text-green-500" />
            </div>
            <h4 className="text-2xl font-bold">8</h4>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Expiring Soon</p>
              <Clock size={16} className="text-orange-500" />
            </div>
            <h4 className="text-2xl font-bold">3</h4>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search quotations by customer or quote ID..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Quote #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product/Service</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockQuotations.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-bold text-xs">{quote.quoteNumber}</TableCell>
                  <TableCell className="font-medium">{quote.customer}</TableCell>
                  <TableCell className="text-sm">{quote.product}</TableCell>
                  <TableCell className="font-bold font-mono text-orange-600">${quote.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{quote.validUntil}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quote.status)}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Convert to Order</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
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