"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Brain, Download, LineChart, FileSpreadsheet, FileText, Calendar } from "lucide-react";
import { useState } from "react";
import { intelligentFinancialForecast, type IntelligentFinancialForecastOutput } from "@/ai/flows/intelligent-financial-forecast";
import { mockLedger, mockRawMaterials } from "@/lib/erp-data";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [forecast, setForecast] = useState<IntelligentFinancialForecastOutput | null>(null);

  const handleGenerateForecast = async () => {
    setIsGenerating(true);
    try {
      // Mapping mock data to input schema
      const result = await intelligentFinancialForecast({
        ledgerHistory: mockLedger.map(l => ({
          date: l.date,
          account: l.account,
          debit: l.debit,
          credit: l.credit,
          reference: l.reference
        })),
        salesTrends: [
          { date: '2024-01-01', productName: 'Valve X1', quantitySold: 120, totalAmount: 54000 },
          { date: '2024-02-01', productName: 'Valve X1', quantitySold: 140, totalAmount: 63000 },
          { date: '2024-03-01', productName: 'Valve X1', quantitySold: 110, totalAmount: 49500 },
        ],
        inventoryLevels: mockRawMaterials.map(m => ({
          materialName: m.name,
          currentStock: m.stockQuantity,
          minimumQuantity: m.minQuantity,
          reorderQuantity: m.reorderQuantity
        })),
        forecastPeriodMonths: 3
      });
      setForecast(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Data & Reports</h1>
            <p className="text-muted-foreground">Unified financial and operational reporting suite.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><FileSpreadsheet size={16} /> Excel</Button>
            <Button variant="outline" className="gap-2"><FileText size={16} /> PDF</Button>
          </div>
        </div>

        <Card className="border-orange-200 bg-orange-50/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Brain size={120} className="text-orange-600" />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 text-orange-600">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Quantis Intelligence</span>
            </div>
            <CardTitle className="font-headline text-2xl">Smart Financial Forecaster</CardTitle>
            <CardDescription>
              Predict future cash flow and optimize procurement schedules using generative AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!forecast ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <p className="text-sm text-muted-foreground max-w-md">
                  Click the button below to analyze your ledger history, sales trends, and inventory levels for the next 3 months.
                </p>
                <Button 
                  onClick={handleGenerateForecast} 
                  disabled={isGenerating}
                  className="bg-orange-600 hover:bg-orange-700 h-12 px-8"
                >
                  {isGenerating ? "Analyzing Patterns..." : "Generate AI Forecast"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm space-y-3">
                  <h4 className="font-bold flex items-center gap-2"><LineChart className="w-4 h-4 text-orange-600" /> Cash Flow Prediction</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{forecast.cashFlowPrediction}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-600" /> Procurement Recommendations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {forecast.procurementRecommendations.map((rec, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-orange-600">{rec.materialName}</span>
                          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{rec.suggestedProcurementDate}</span>
                        </div>
                        <div className="text-xs font-medium">Qty: {rec.recommendedQuantity}</div>
                        <p className="text-[11px] text-muted-foreground italic">"{rec.reasoning}"</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="ghost" className="text-xs text-orange-600" onClick={() => setForecast(null)}>Reset Analysis</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="gl" className="w-full">
          <TabsList className="bg-slate-100 border-none p-1 mb-6">
            <TabsTrigger value="gl">General Ledger</TabsTrigger>
            <TabsTrigger value="pl">Profit & Loss</TabsTrigger>
            <TabsTrigger value="bs">Balance Sheet</TabsTrigger>
            <TabsTrigger value="trial">Trial Balance</TabsTrigger>
          </TabsList>

          <TabsContent value="gl" className="mt-0">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Ledger Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Debit</TableHead>
                      <TableHead className="text-right">Credit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLedger.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell className="font-medium">{entry.account}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{entry.reference}</TableCell>
                        <TableCell className="text-right font-mono">{entry.debit ? `$${entry.debit}` : '-'}</TableCell>
                        <TableCell className="text-right font-mono">{entry.credit ? `$${entry.credit}` : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="border-none shadow-sm">
                 <CardHeader><CardTitle className="text-lg">Monthly Revenue</CardTitle></CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                       <span className="text-sm">Gross Sales</span>
                       <span className="font-mono font-bold text-green-600">+$245,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                       <span className="text-sm">COGS (Cost of Goods Sold)</span>
                       <span className="font-mono font-bold text-red-600">-$120,400</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b bg-slate-50 px-2 rounded">
                       <span className="text-sm font-bold">Gross Profit</span>
                       <span className="font-mono font-bold">$124,600</span>
                    </div>
                 </CardContent>
               </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ERPShell>
  );
}
