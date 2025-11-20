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
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Schedule {
  id: string;
  name: string;
  playlist: string;
  mealTime: "breakfast" | "lunch" | "dinner";
  days: string[];
  startTime: string;
  endTime: string;
}

export default function Schedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      name: "Morning Schedule",
      playlist: "Breakfast Menu",
      mealTime: "breakfast",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      startTime: "06:00",
      endTime: "11:00",
    },
    {
      id: "2",
      name: "Afternoon Schedule",
      playlist: "Lunch Menu",
      mealTime: "lunch",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      startTime: "11:00",
      endTime: "15:00",
    },
    {
      id: "3",
      name: "Evening Schedule",
      playlist: "Dinner Specials",
      mealTime: "dinner",
      days: ["Thu", "Fri", "Sat"],
      startTime: "17:00",
      endTime: "22:00",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const getMealTimeColor = (mealTime: string) => {
    switch (mealTime) {
      case "breakfast":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "lunch":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "dinner":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Schedule</h2>
            <p className="text-muted-foreground mt-2">
              Set up automatic playlist scheduling based on time and day
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Schedule
          </Button>
        </div>

        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create Schedule</CardTitle>
              <CardDescription>
                Define when specific playlists should be displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meal Time</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Playlist</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select playlist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast-menu">
                        Breakfast Menu
                      </SelectItem>
                      <SelectItem value="lunch-menu">Lunch Menu</SelectItem>
                      <SelectItem value="dinner-specials">
                        Dinner Specials
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <input
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <input
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Days of Week</label>
                <div className="flex gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <Button
                        key={day}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        {day}
                      </Button>
                    )
                  )}
                </div>
              </div>

              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Active Schedules
              </CardTitle>
              <Badge variant="outline">{schedules.length} schedules</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{schedule.name}</h3>
                        <Badge
                          variant="outline"
                          className={getMealTimeColor(schedule.mealTime)}
                        >
                          {schedule.mealTime}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Playlist: {schedule.playlist}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {schedule.days.map((day) => (
                            <Badge
                              key={day}
                              variant="secondary"
                              className="text-xs"
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
