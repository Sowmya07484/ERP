import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Package, FileText, Wrench, 
  ShoppingCart, CreditCard, Truck, Search, Layers, 
  Factory, RefreshCcw, FileWarning, Quote, Bell, 
  Settings, Database, UserCheck, ChevronLeft, ChevronRight, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const modules = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'ERP Users', icon: Users, href: '/users' },
  { name: 'Products & Pricing', icon: Package, href: '/products' },
  { name: 'BOM', icon: Layers, href: '/bom' },
  { name: 'Installation', icon: Wrench, href: '/installation' },
  { name: 'Orders', icon: ShoppingCart, href: '/orders' },
  { name: 'Payments & Follow Up', icon: CreditCard, href: '/payments' },
  { name: 'Procurement', icon: Truck, href: '/procurement' },
  { name: 'Procurement Tracking', icon: Search, href: '/procurement-tracking' },
  { name: 'Raw Materials', icon: Database, href: '/raw-materials' },
  { name: 'Production', icon: Factory, href: '/production' },
  { name: 'Reorder', icon: RefreshCcw, href: '/reorder' },
  { name: 'Returns & Damage', icon: FileWarning, href: '/returns' },
  { name: 'Quotations', icon: Quote, href: '/quotations' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Configuration', icon: Settings, href: '/configuration' },
  { name: 'Data & Reports', icon: FileText, href: '/reports' },
  { name: 'Organization Users', icon: UserCheck, href: '/org-users' },
];

export function ERPSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border h-16">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-headline text-lg font-bold tracking-tight">ERP</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent">
        <ul className="space-y-1 px-2">
          {modules.map((module) => (
            <li key={module.name}>
              <Link 
                href={module.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group",
                  pathname === module.href 
                    ? "bg-primary text-primary-foreground" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                title={collapsed ? module.name : undefined}
              >
                <module.icon className={cn("w-5 h-5 shrink-0", pathname === module.href ? "text-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground")} />
                {!collapsed && <span className="text-sm font-medium">{module.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white">AR</div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold">Alex Rivera</span>
              <span className="text-[10px] text-sidebar-foreground/50">Super Admin</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
