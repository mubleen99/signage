"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DisplayPreview } from "@/components/DisplayPreview";
import { ContentEditor } from "@/components/ContentEditor";
import { DeviceStatus } from "@/components/DeviceStatus";
import { Monitor, Settings, Upload, Play } from "lucide-react";
import ctrlF2Logo from "@/assets/ctrlf2-logo.png";

interface ContentItem {
  id: string;
  type: "image" | "text" | "video";
  content: string;
}

const Index = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: "default",
      type: "text",
      content: "Welcome to Digital Signage",
    },
  ]);

  const handleContentChange = (newContents: ContentItem[]) => {
    setContents(newContents);
  };

  const displayContents = contents.map((item) => ({
    type: item.type,
    content: item.content,
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              <img
                src={"/ctrlf2-logo.png"}
                alt="Ctrl F2 Logo"
                className="h-20 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
                style={{
                  filter:
                    "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))",
                  transform: "perspective(1000px) rotateX(5deg)",
                }}
              />
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/90"
              >
                <Upload className="w-4 h-4 mr-2" />
                Deploy to Devices
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content Editor */}
          <div className="lg:col-span-1 space-y-6">
            <ContentEditor onContentChange={handleContentChange} />
            <DeviceStatus />
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Display Preview
                </h2>
                <p className="text-muted-foreground">
                  Real-time preview of your content
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Preview Mode
              </Button>
            </div>

            <DisplayPreview contents={displayContents} aspectRatio="16:9" />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">
                  Active Displays
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-success mb-1">2</div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-1">
                  {contents.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Content Layers
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
