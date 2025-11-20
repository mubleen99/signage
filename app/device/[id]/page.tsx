"use client";

import { useSearchParams } from "next/navigation";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Power, RefreshCw, Activity, Monitor } from "lucide-react";

export default function DeviceDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";

  const device = {
    id,
    name: "Main Entrance Display",
    status: "online" as const,
    location: "Lobby",
    lastCheckIn: "2 minutes ago",
    assignedPlaylist: "Breakfast Menu",
    lastHeartbeat: "2024-01-15 14:32:00",
    uptime: "5 days, 3 hours",
    cpuUsage: "45%",
    memoryUsage: "62%",
    temperature: "52°C",
  };

  const logs = [
    { time: "14:32:00", level: "info", message: "Heartbeat successful" },
    {
      time: "14:31:45",
      level: "info",
      message: "Content updated successfully",
    },
    { time: "14:30:00", level: "info", message: "Heartbeat successful" },
    { time: "14:25:12", level: "warn", message: "High CPU usage detected" },
    { time: "14:20:00", level: "info", message: "Heartbeat successful" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {device.name}
            </h2>
            <p className="text-muted-foreground mt-1">{device.location}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Power className="w-4 h-4 mr-2" />
              Reboot
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Update
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={device.status === "online" ? "default" : "secondary"}
              >
                {device.status}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{device.uptime}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{device.cpuUsage}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{device.temperature}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="logs">
              <Activity className="w-4 h-4 mr-2" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Monitor className="w-4 h-4 mr-2" />
              Screen Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Device Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  {logs.map((log, i) => (
                    <div
                      key={i}
                      className="p-3 bg-muted/30 rounded border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-muted-foreground">
                          {log.time}
                        </span>
                        <Badge
                          variant={
                            log.level === "warn" ? "secondary" : "outline"
                          }
                          className="uppercase text-xs"
                        >
                          {log.level}
                        </Badge>
                        <span className="flex-1">{log.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Current Screen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Monitor className="w-12 h-12 mx-auto mb-2" />
                    <p>Screenshot preview will appear here</p>
                    <p className="text-sm mt-1">
                      Last updated: {device.lastHeartbeat}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Last Check-in
                </dt>
                <dd className="text-sm mt-1">{device.lastCheckIn}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Last Heartbeat
                </dt>
                <dd className="text-sm mt-1">{device.lastHeartbeat}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Assigned Playlist
                </dt>
                <dd className="text-sm mt-1">{device.assignedPlaylist}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Memory Usage
                </dt>
                <dd className="text-sm mt-1">{device.memoryUsage}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
