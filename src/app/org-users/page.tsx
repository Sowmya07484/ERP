
"use client";

import { ERPShell } from "@/components/erp/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserCheck, ShieldCheck } from "lucide-react";

export default function OrgUsersPage() {
  const orgUsers = [
    { id: 'ou1', name: 'Jonathan Kent', role: 'Owner', access: 'All Modules', lastLogin: '10m ago', status: 'Active' },
    { id: 'ou2', name: 'Martha Wayne', role: 'Executive', access: 'Reports, Finance', lastLogin: '2h ago', status: 'Active' },
  ];

  return (
    <ERPShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-headline">Organization Users</h1>
            <p className="text-muted-foreground">High-level access management and executive permissions.</p>
          </div>
          <Button className="gap-2 bg-slate-900">
            <Plus size={16} /> Invite Executive
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-900 rounded-lg"><UserCheck size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Active Admins</p>
              <h4 className="text-2xl font-bold">4</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><ShieldCheck size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Custom Policies</p>
              <h4 className="text-2xl font-bold">12</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search executive users..." className="pl-10" />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>User Name</TableHead>
                <TableHead>Corporate Role</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-bold">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">{user.access}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{user.lastLogin}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Modify Access</Button>
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
