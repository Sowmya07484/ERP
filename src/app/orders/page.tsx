"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Download, Printer, MoreVertical } from "lucide-react";
import { mockOrders } from "@/lib/erp-data";

export default function OrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-none';
      case 'Ordered': return 'bg-blue-100 text-blue-700 border-none';
      case 'Production': return 'bg-orange-100 text-orange-700 border-none';
      default: return 'bg-slate-100 text-slate-700 border-none';
    }
  };

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Order Lifecycle</h1>
            <p className="text-muted-foreground">End-to-end sales order management and tracking.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Create Order
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search orders by customer or ID..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-bold text-xs">{order.orderNumber}</TableCell>
                  <TableCell className="font-medium">{order.customerName}</TableCell>
                  <TableCell className="text-sm">{order.productName}</TableCell>
                  <TableCell>{order.quantity} Units</TableCell>
                  <TableCell className="font-bold text-orange-600 font-mono">${order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="View Invoice"><FileText size={16} /></Button>
                      <Button variant="ghost" size="icon" title="Download PDF"><Download size={16} /></Button>
                      <Button variant="ghost" size="icon"><MoreVertical size={16} /></Button>
                    </div>
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
