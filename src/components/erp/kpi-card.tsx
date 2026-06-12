import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export function KPICard({ title, value, icon: Icon, trend, className, iconClassName }: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm bg-white", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold font-headline tracking-tight">{value}</h3>
            {trend && (
              <p className={cn(
                "text-xs flex items-center gap-1",
                trend.isUp ? "text-green-600" : "text-red-600"
              )}>
                {trend.isUp ? '↑' : '↓'} {trend.value}%
                <span className="text-muted-foreground ml-1">vs last month</span>
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl bg-orange-50", iconClassName)}>
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
