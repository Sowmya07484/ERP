"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, Plus, Calculator, Trash } from "lucide-react";

const mockBOMItems = [
  { id: 'bi1', material: 'Grade A Steel', quantity: 2.5, unit: 'KG', cost: 65 },
  { id: 'bi2', material: 'Industrial Lubricant', quantity: 0.5, unit: 'Liters', cost: 15 },
  { id: 'bi3', material: 'Aluminum Casting', quantity: 1, unit: 'PCS', cost: 120 },
];

export default function BOMPage() {
  const totalCost = mockBOMItems.reduce((acc, item) => acc + (item.quantity * item.cost), 0);

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Bill of Materials (BOM)</h1>
            <p className="text-muted-foreground">Define product recipes and calculate manufacturing costs.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Create New BOM
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded text-orange-600"><Layers size={20} /></div>
                <div>
                  <CardTitle className="text-lg">Industrial Valve X1 - Configuration</CardTitle>
                  <p className="text-xs text-muted-foreground">Version 1.2.0 | Last updated yesterday</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus size={14} /> Add Component
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Raw Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead className="text-right">Total Cost</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBOMItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.material}</TableCell>
                      <TableCell>{item.quantity} {item.unit}</TableCell>
                      <TableCell className="font-mono text-xs">${item.cost}</TableCell>
                      <TableCell className="text-right font-bold font-mono">${(item.quantity * item.cost).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash size={14} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-none shadow-xl h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-500" />
                Cost Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Material Cost</span>
                  <span className="font-mono font-bold">${totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Estimated Labor (15%)</span>
                  <span className="font-mono font-bold">${(totalCost * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Overheads (5%)</span>
                  <span className="font-mono font-bold">${(totalCost * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 pt-4 flex justify-between">
                  <span className="font-bold">Total Unit BOM Cost</span>
                  <span className="font-mono font-bold text-orange-400 text-xl">${(totalCost * 1.2).toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800 rounded-lg space-y-2">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Pricing Insight</p>
                <p className="text-xs text-slate-300">Current Selling Price: <span className="text-white font-bold">$450.00</span></p>
                <p className="text-xs text-slate-300">Projected Margin: <span className="text-green-400 font-bold">{(((450 - (totalCost * 1.2)) / 450) * 100).toFixed(1)}%</span></p>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">Update Product Cost</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPShell>
  );
}
