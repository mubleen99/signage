import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  statusVariant?: "default" | "secondary" | "destructive" | "outline";
  fields: Array<{
    label: string;
    value: ReactNode;
    fullWidth?: boolean;
  }>;
  actions?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MobileCard({
  title,
  subtitle,
  status,
  statusVariant = "secondary",
  fields,
  actions,
  className,
  onClick
}: MobileCardProps) {
  return (
    <Card 
      className={cn(
        "w-full transition-all duration-200 hover:shadow-md",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {status && (
            <Badge variant={statusVariant} className="ml-2 shrink-0">
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-3">
          {fields.map((field, index) => (
            <div 
              key={index}
              className={cn(
                "flex justify-between items-center",
                field.fullWidth && "col-span-full"
              )}
            >
              <span className="text-sm text-muted-foreground font-medium">
                {field.label}:
              </span>
              <div className="text-sm text-foreground font-medium ml-2">
                {field.value}
              </div>
            </div>
          ))}
        </div>
        
        {actions && (
          <div className="mt-4 pt-3 border-t flex gap-2 justify-end">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}