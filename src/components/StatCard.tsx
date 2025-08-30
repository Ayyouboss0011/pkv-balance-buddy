import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "success" | "warning" | "primary";
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className
}: StatCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return val.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
      });
    }
    return val;
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 hover:shadow-md",
      variant === "success" && "border-success/20 bg-gradient-to-br from-success/5 to-success/10",
      variant === "warning" && "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10",
      variant === "primary" && "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === "success" && "bg-success/10 text-success",
            variant === "warning" && "bg-warning/10 text-warning", 
            variant === "primary" && "bg-primary/10 text-primary",
            variant === "default" && "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {formatValue(value)}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs font-medium",
              trend.value > 0 ? "text-success" : "text-destructive"
            )}>
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}