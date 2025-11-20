import { cn } from "@/lib/utils";
import { Monitor } from "lucide-react";

interface DisplayContent {
  type: "image" | "text" | "video";
  content: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  style?: React.CSSProperties;
}

interface DisplayPreviewProps {
  contents: DisplayContent[];
  aspectRatio?: "16:9" | "16:10" | "4:3";
  className?: string;
}

export function DisplayPreview({ contents, aspectRatio = "16:9", className }: DisplayPreviewProps) {
  const aspectRatioClass = {
    "16:9": "aspect-[16/9]",
    "16:10": "aspect-[16/10]",
    "4:3": "aspect-[4/3]",
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      {/* Display Frame */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl">
        {/* Monitor Bezel */}
        <div className="relative bg-black rounded-2xl p-4 shadow-inner">
          {/* Screen */}
          <div className={cn("relative w-full bg-white overflow-hidden rounded-lg shadow-lg", aspectRatioClass[aspectRatio])}>
            {/* Content Layer */}
            <div className="absolute inset-0">
              {contents.map((item, index) => (
                <div
                  key={index}
                  className="absolute transition-all duration-300"
                  style={{
                    left: item.position?.x || 0,
                    top: item.position?.y || 0,
                    width: item.size?.width || "100%",
                    height: item.size?.height || "100%",
                    ...item.style,
                  }}
                >
                  {item.type === "image" && (
                    <img 
                      src={item.content} 
                      alt="Display content" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  {item.type === "text" && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <p className="text-4xl font-bold text-foreground text-center">{item.content}</p>
                    </div>
                  )}
                  {item.type === "video" && (
                    <video 
                      src={item.content} 
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Screen Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg"></div>
          </div>
        </div>

        {/* Monitor Stand */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
          <div className="w-32 h-8 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
          <div className="w-48 h-3 bg-slate-800 rounded-full mx-auto mt-1 shadow-xl"></div>
        </div>
      </div>

      {/* Display Info */}
      <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
        <Monitor className="w-4 h-4" />
        <span className="text-sm font-medium">Live Preview • {aspectRatio}</span>
      </div>
    </div>
  );
}
