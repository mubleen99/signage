import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Wifi, Battery, Cpu } from "lucide-react";

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  location: string;
  lastSeen: string;
}

interface DeviceStatusProps {
  devices?: Device[];
}

export function DeviceStatus({ devices = [] }: DeviceStatusProps) {
  const mockDevices: Device[] = devices.length > 0 ? devices : [
    {
      id: "1",
      name: "Display - Main Entrance",
      status: "online",
      location: "Lobby",
      lastSeen: "Just now",
    },
    {
      id: "2",
      name: "Display - Conference Room A",
      status: "online",
      location: "2nd Floor",
      lastSeen: "2 minutes ago",
    },
    {
      id: "3",
      name: "Display - Cafeteria",
      status: "offline",
      location: "1st Floor",
      lastSeen: "15 minutes ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          Connected Devices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{device.name}</h3>
                  <Badge variant={device.status === "online" ? "default" : "secondary"}>
                    {device.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{device.location}</p>
                <p className="text-xs text-muted-foreground">Last seen: {device.lastSeen}</p>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center gap-1">
                  <Wifi className={`w-4 h-4 ${device.status === "online" ? "text-success" : "text-muted-foreground"}`} />
                  <span className="text-xs text-muted-foreground">WiFi</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Battery className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">45%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
