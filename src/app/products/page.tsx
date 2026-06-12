"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MoreVertical, Package } from "lucide-react";
import { mockProducts } from "@/lib/erp-data";

export default function ProductsPage() {
  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Products & Pricing</h1>
            <p className="text-muted-foreground">Master catalog of products and pricing engine.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Product
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search products, SKU or category..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead>Product Info</TableHead>
                <TableHead>SKU/Type</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Tax (GST)</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => {
                const taxAmount = (product.sellingPrice * product.gstPercent) / 100;
                const finalPrice = product.sellingPrice + taxAmount;

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                          <Package className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">{product.name}</span>
                          <span className="text-xs text-muted-foreground">{product.category}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <span className="font-medium">{product.sku}</span>
                        <span className="text-muted-foreground">{product.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">${product.costPrice}</TableCell>
                    <TableCell className="font-mono text-sm">${product.sellingPrice}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">{product.gstPercent}%</Badge>
                    </TableCell>
                    <TableCell className="font-bold text-orange-600 font-mono">${finalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={product.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}>
                        {product.status}
                      </Badge>
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
