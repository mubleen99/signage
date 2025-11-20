import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Modern skeleton loader for table rows
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center space-x-4 p-4">
            <div className="h-4 bg-muted rounded w-1/6"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/5"></div>
            <div className="h-4 bg-muted rounded w-1/6"></div>
            <div className="h-4 bg-muted rounded w-1/8"></div>
            <div className="h-8 w-8 bg-muted rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Modern skeleton loader for cards
export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-card rounded-lg p-6 space-y-4 border">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-8 w-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Shimmer effect skeleton
export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-muted rounded", className)}>
      <div className="animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent h-full w-full"></div>
    </div>
  );
}

// Modern spinner with company branding
export function ModernSpinner({ 
  size = "default", 
  className,
  text 
}: { 
  size?: "sm" | "default" | "lg"
  className?: string
  text?: string
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className="relative">
        <Loader2 className={cn("animate-spin text-accent", sizeClasses[size])} />
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-accent/20 animate-pulse",
          sizeClasses[size]
        )} />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}

// Full page loading overlay
export function LoadingOverlay({ 
  isVisible, 
  text = "Loading...",
  backdrop = true 
}: { 
  isVisible: boolean
  text?: string
  backdrop?: boolean
}) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      backdrop && "bg-background/80 backdrop-blur-sm"
    )}>
      <div className="bg-card p-8 rounded-lg shadow-elevated border">
        <ModernSpinner size="lg" text={text} />
      </div>
    </div>
  );
}

// Progressive loading component
export function ProgressiveLoader({ 
  stages, 
  currentStage 
}: { 
  stages: string[]
  currentStage: number
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <ModernSpinner size="lg" />
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {stages[currentStage]}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentStage + 1}/{stages.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-red h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}