"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Image, Type, Video, Plus } from "lucide-react";

interface ContentItem {
  id: string;
  type: "image" | "text" | "video";
  content: string;
}

interface ContentEditorProps {
  onContentChange: (contents: ContentItem[]) => void;
}

export function ContentEditor({ onContentChange }: ContentEditorProps) {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState("text");

  const addContent = (type: "image" | "text" | "video", content: string) => {
    const newContent: ContentItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
    };
    const updatedContents = [...contents, newContent];
    setContents(updatedContents);
    onContentChange(updatedContents);
  };

  const handleAddText = (text: string) => {
    if (text.trim()) {
      addContent("text", text);
    }
  };

  const handleAddImage = (url: string) => {
    if (url.trim()) {
      addContent("image", url);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Editor</CardTitle>
        <CardDescription>
          Add and customize content for your digital display
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Image
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-content">Text Content</Label>
              <Textarea
                id="text-content"
                placeholder="Enter your display text..."
                className="min-h-32"
              />
            </div>
            <Button
              onClick={(e) => {
                const textarea = document.getElementById(
                  "text-content"
                ) as HTMLTextAreaElement;
                handleAddText(textarea.value);
                textarea.value = "";
              }}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Text Layer
            </Button>
          </TabsContent>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <Button
              onClick={(e) => {
                const input = document.getElementById(
                  "image-url"
                ) as HTMLInputElement;
                handleAddImage(input.value);
                input.value = "";
              }}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Image Layer
            </Button>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                type="url"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            <Button
              onClick={(e) => {
                const input = document.getElementById(
                  "video-url"
                ) as HTMLInputElement;
                if (input.value.trim()) {
                  addContent("video", input.value);
                  input.value = "";
                }
              }}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Video Layer
            </Button>
          </TabsContent>
        </Tabs>

        {contents.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
              Active Layers ({contents.length})
            </h3>
            <div className="space-y-2">
              {contents.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {item.type === "text" && (
                      <Type className="w-4 h-4 text-primary" />
                    )}
                    {item.type === "image" && (
                      <Image className="w-4 h-4 text-primary" />
                    )}
                    {item.type === "video" && (
                      <Video className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-sm font-medium capitalize">
                      {item.type}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const updated = contents.filter((c) => c.id !== item.id);
                      setContents(updated);
                      onContentChange(updated);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
