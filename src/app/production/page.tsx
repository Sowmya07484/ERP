
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Factory, Settings, Play, Pause, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductionPage() {
  const activeBatches = [
    { id: 'b1', name: 'Valve X1 Batch #44', progress: 65, status: 'Running', machine: 'CNC-01', units: 150 },
    { id: 'b2', name: 'Casting M2 Batch #12', progress: 30, status: 'Delayed', machine: 'MOLD-04', units: 500 },
  ];

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-headline">Production Floor</h1>
            <p className="text-muted-foreground">Monitor real-time manufacturing and batch progress.</p>
          </div>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
            <Play size={16} /> Start New Batch
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeBatches.map((batch) => (
            <Card key={batch.id} className="border-none shadow-md overflow-hidden">
              <div className="h-1 bg-orange-500" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{batch.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Settings size={12} /> {batch.machine} • {batch.units} Units
                    </div>
                  </div>
                  <Badge variant={batch.status === 'Running' ? 'default' : 'destructive'} className="rounded-sm">
                    {batch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>PROGRESS</span>
                    <span>{batch.progress}%</span>
                  </div>
                  <Progress value={batch.progress} className="h-2" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Pause size={14} /> Pause
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <AlertCircle size={14} /> Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Factory className="text-orange-500" /> Resource Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Energy Load', val: '84%' },
              { label: 'Labor Hours', val: '1,240h' },
              { label: 'Idle Machines', val: '3' },
              { label: 'Efficiency', val: '92.4%' }
            ].map((stat) => (
              <div key={stat.label} className="p-3 bg-slate-800 rounded-lg">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold font-headline">{stat.val}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ERPShell>
  );
}
