"use client";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  PlaySquare,
  Edit,
  Trash2,
  Image,
  Video,
  Menu,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlaylistItem {
  id: string;
  type: "menu" | "image" | "video";
  name: string;
  duration: number;
}

interface Playlist {
  id: string;
  name: string;
  items: PlaylistItem[];
  transition: string;
}

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Breakfast Menu",
      items: [
        { id: "1", type: "menu", name: "Morning Specials", duration: 10 },
        { id: "2", type: "image", name: "Coffee Promo", duration: 5 },
      ],
      transition: "fade",
    },
    {
      id: "2",
      name: "Lunch Menu",
      items: [
        { id: "3", type: "menu", name: "Daily Lunch", duration: 15 },
        { id: "4", type: "video", name: "Restaurant Tour", duration: 30 },
      ],
      transition: "slide",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const createPlaylist = () => {
    if (!newPlaylistName) return;

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      items: [],
      transition: "fade",
    };

    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName("");
    setShowCreateForm(false);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "menu":
        return <Menu className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Playlists</h2>
            <p className="text-muted-foreground mt-2">
              Create and manage content playlists for your displays
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Playlist
          </Button>
        </div>

        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Playlist</CardTitle>
              <CardDescription>
                Give your playlist a name to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Playlist name..."
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <Button onClick={createPlaylist}>Create</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlaySquare className="w-5 h-5 text-primary" />
                    <CardTitle>{playlist.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {playlist.items.length} items · {playlist.transition}{" "}
                  transition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Playlist Items */}
                <div className="space-y-2">
                  {playlist.items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <PlaySquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No items in this playlist</p>
                    </div>
                  ) : (
                    playlist.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded border border-border"
                      >
                        <span className="text-sm text-muted-foreground w-6">
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-2 flex-1">
                          {getItemIcon(item.type)}
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <Badge variant="outline">{item.duration}s</Badge>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Content Controls */}
                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-sm font-medium">Add Content</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menu1">Morning Specials</SelectItem>
                        <SelectItem value="menu2">Daily Lunch</SelectItem>
                        <SelectItem value="img1">Coffee Promo</SelectItem>
                        <SelectItem value="vid1">Restaurant Tour</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="number" placeholder="Duration (s)" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Playlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
