"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Boxes, AlertTriangle } from "lucide-react";
import { mockRawMaterials } from "@/lib/erp-data";
import { Progress } from "@/components/ui/progress";

export default function RawMaterialsPage() {
  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Raw Materials</h1>
            <p className="text-muted-foreground">Inventory tracking and stock management.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Material
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg"><Boxes className="text-blue-600" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stock Value</p>
                <h4 className="text-2xl font-bold font-headline">$142,500</h4>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-lg"><AlertTriangle className="text-orange-600" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <h4 className="text-2xl font-bold font-headline text-orange-600">4 Items</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search materials by name or supplier..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead>Material Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Purchase Cost</TableHead>
                <TableHead>Stock Value</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRawMaterials.map((material) => {
                const stockPercentage = Math.min((material.stockQuantity / (material.minQuantity * 3)) * 100, 100);
                const isLow = material.stockQuantity < material.minQuantity;
                const stockValue = material.stockQuantity * material.purchaseCost;

                return (
                  <TableRow key={material.id}>
                    <TableCell className="font-semibold">{material.name}</TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell className="w-[200px]">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                          <span>{material.stockQuantity} / {material.unit}</span>
                          {isLow && <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={10} /> REORDER</span>}
                        </div>
                        <Progress value={stockPercentage} className={isLow ? "bg-red-100" : "bg-slate-100"} />
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">${material.purchaseCost}/{material.unit}</TableCell>
                    <TableCell className="font-mono font-bold">${stockValue.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{material.supplier}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-orange-50">Procure</Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </ERPShell>
  );
}
