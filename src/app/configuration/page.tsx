"use client";

import { ERPShell } from "@/components/erp/shell";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, Globe, Shield, Database, Bell, 
  UserCog, Lock, AppWindow, CheckCircle2, XCircle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const roles = [
  { name: "Super Admin", description: "Full system access, including billing and user deletion.", users: 1, status: "Active" },
  { name: "Executive", description: "Access to all reports and high-level financial data.", users: 3, status: "Active" },
  { name: "Manager", description: "Department-specific management permissions.", users: 8, status: "Active" },
  { name: "Operator", description: "Standard data entry and operational access.", users: 24, status: "Active" },
];

export default function ConfigurationPage() {
  return (
    <ERPShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">System Configuration</h1>
          <p className="text-muted-foreground">Global ERP settings, module status, and role-based access control.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCog size={18} className="text-orange-500" /> Role Management
              </CardTitle>
              <CardDescription>Define and manage organizational roles and their high-level permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.name}>
                      <TableCell className="font-bold">{role.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{role.description}</TableCell>
                      <TableCell className="text-center font-mono">{role.users}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                          {role.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-orange-600">Permissions</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AppWindow size={18} className="text-orange-500" /> Module Controls
              </CardTitle>
              <CardDescription className="text-slate-400">Enable or disable core ERP functionality.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">Inventory Engine</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Enabled</div>
                      </SelectItem>
                      <SelectItem value="disabled">
                        <div className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-500" /> Disabled</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">Procurement Module</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Enabled</div>
                      </SelectItem>
                      <SelectItem value="disabled">
                        <div className="flex items-center gap-2"><XCircle className="w-3 h-3 text-red-500" /> Disabled</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">AI Forecaster</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Enabled</div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center gap-2"><Settings className="w-3 h-3 text-yellow-500" /> Maintenance</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe size={18} className="text-orange-500" /> Regional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-2">
                <Label>Default Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR - Indian Rupee (₹)</SelectItem>
                    <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                    <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="flex flex-col gap-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="60">60 Minutes</SelectItem>
                  </SelectContent>
                </Select>
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