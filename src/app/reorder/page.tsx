
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, AlertTriangle, ArrowRight } from "lucide-react";

export default function ReorderPage() {
  const lowStockItems = [
    { id: 'rs1', material: 'Industrial Lubricant', current: 45, min: 100, reorder: 200, supplier: 'ChemSolutions Inc' },
    { id: 'rs2', material: 'O-Rings Type-B', current: 12, min: 50, reorder: 100, supplier: 'Sealing Pro' },
  ];

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-headline">Auto-Reorder Management</h1>
            <p className="text-muted-foreground">Intelligent stock replenishment and supplier alerts.</p>
          </div>
          <Button className="gap-2">
            <RefreshCcw size={16} /> Run Replenishment Logic
          </Button>
        </div>

        <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex gap-3 items-start">
          <AlertTriangle className="text-orange-600 shrink-0" />
          <div>
            <h4 className="font-bold text-orange-900">Critical Stock Warning</h4>
            <p className="text-sm text-orange-700">2 items have fallen below safety thresholds. Production capacity may be affected within 48 hours.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Current Level</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Suggested Reorder</TableHead>
                <TableHead>Primary Supplier</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold">{item.material}</TableCell>
                  <TableCell className="text-red-600 font-bold">{item.current} units</TableCell>
                  <TableCell className="text-muted-foreground">{item.min} units</TableCell>
                  <TableCell className="font-bold">{item.reorder} units</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="gap-2">
                      Generate PO <ArrowRight size={14} />
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
