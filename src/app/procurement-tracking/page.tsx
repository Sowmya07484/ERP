
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck, MapPin, Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProcurementTrackingPage() {
  const shipments = [
    { id: 's1', po: 'PO-2024-002', carrier: 'FedEx Industrial', origin: 'Germany', current: 'In Transit - Customs', eta: '2024-03-25' },
    { id: 's2', po: 'PO-2024-005', carrier: 'Global Logistics', origin: 'China', current: 'At Port', eta: '2024-03-30' },
  ];

  return (
    <ERPShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Procurement Tracking</h1>
          <p className="text-muted-foreground">Real-time logistics and shipment status monitoring.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Enter PO number or tracking ID..." className="pl-10 h-12 text-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shipments.map((ship) => (
            <Card key={ship.id} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Truck size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{ship.po}</CardTitle>
                    <p className="text-xs text-muted-foreground">{ship.carrier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase text-muted-foreground">ETA</p>
                  <p className="font-bold text-orange-600">{ship.eta}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="w-0.5 h-8 bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                    <div className="w-0.5 h-8 bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Origin: {ship.origin}</span>
                      <span className="text-xs text-slate-400">Mar 10</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span>{ship.current}</span>
                      <span className="text-xs text-orange-600">Ongoing</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Destination: Central Hub</span>
                      <span className="text-xs text-slate-400">Scheduled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ERPShell>
  );
}
