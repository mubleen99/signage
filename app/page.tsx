"use client";
import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Monitor,
  Plus,
  MoreVertical,
  Power,
  RefreshCw,
  Trash2,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  location: string;
  lastCheckIn: string;
  assignedPlaylist: string;
}

export default function Devices() {
  const [devices] = useState<Device[]>([
    {
      id: "1",
      name: "Main Entrance Display",
      status: "online",
      location: "Lobby",
      lastCheckIn: "2 minutes ago",
      assignedPlaylist: "Breakfast Menu",
    },
    {
      id: "2",
      name: "Conference Room A",
      status: "online",
      location: "2nd Floor",
      lastCheckIn: "5 minutes ago",
      assignedPlaylist: "Daily Specials",
    },
    {
      id: "3",
      name: "Cafeteria Display",
      status: "offline",
      location: "1st Floor",
      lastCheckIn: "15 minutes ago",
      assignedPlaylist: "Lunch Menu",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDevices = devices.filter((device) => {
    const query = searchQuery.toLowerCase();
    return (
      device.name.toLowerCase().includes(query) ||
      device.location.toLowerCase().includes(query) ||
      device.assignedPlaylist.toLowerCase().includes(query)
    );
  });

  const onlineCount = devices.filter((d) => d.status === "online").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Devices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {devices.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Online Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {onlineCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Offline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {devices.length - onlineCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                All Devices
              </CardTitle>
              <Link href="/add-device">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </Link>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search devices by name, location, or playlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Check-in</TableHead>
                  <TableHead>Assigned Playlist</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-8"
                    >
                      No devices found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/device/${device.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {device.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            device.status === "online" ? "default" : "secondary"
                          }
                        >
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.location}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.lastCheckIn}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.assignedPlaylist}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Power className="w-4 h-4 mr-2" />
                              Reboot
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
