
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const notifications = [
    { id: 'n1', type: 'critical', title: 'Low Stock Alert', msg: 'Steel Grade A is below minimum threshold.', time: '10m ago' },
    { id: 'n2', type: 'success', title: 'Payment Received', msg: 'Invoice INV-2024-001 has been cleared.', time: '1h ago' },
    { id: 'n3', type: 'info', title: 'Production Update', msg: 'Batch #44 has moved to quality check.', time: '2h ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="text-red-500" />;
      case 'success': return <CheckCircle className="text-green-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  return (
    <ERPShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Organization Alerts</h1>
            <p className="text-muted-foreground">Stay updated with critical enterprise events.</p>
          </div>
          <Badge variant="outline">4 Unread</Badge>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <Card key={n.id} className="border-none shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="p-2 bg-white rounded-full border shadow-sm">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-sm">{n.title}</h4>
                    <span className="text-[10px] text-muted-foreground font-mono">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{n.msg}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ERPShell>
  );
}
