
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Globe, Shield, Database, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ConfigurationPage() {
  return (
    <ERPShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">System Configuration</h1>
          <p className="text-muted-foreground">Global ERP settings and organizational parameters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe size={18} className="text-orange-500" /> General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Multi-Currency Support</Label>
                  <p className="text-xs text-muted-foreground">Enable automatic exchange rate conversion.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>GST Compliance</Label>
                  <p className="text-xs text-muted-foreground">Apply regional tax rules to all invoices.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield size={18} className="text-orange-500" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Auth</Label>
                  <p className="text-xs text-muted-foreground">Enforce 2FA for all administrative roles.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-xs text-muted-foreground">Auto-logout after 30 minutes of inactivity.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-orange-600 hover:bg-orange-700">Save Configuration</Button>
        </div>
      </div>
    </ERPShell>
  );
}
