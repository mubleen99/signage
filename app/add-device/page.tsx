"use client";
import { useState } from "react";
import Image from "next/image";
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
import { Plus, Copy, Download, CheckCircle2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import raspberryPiDevice from "@/assets/raspberry-pi-device.jpg";

export default function AddDevice() {
  const [deviceName, setDeviceName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const { toast } = useToast();

  const generateApiKey = () => {
    const key = `sk_${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(key);
    setShowSetup(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName) return;
    generateApiKey();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Add New Device</h2>
          <p className="text-muted-foreground mt-2">
            Set up a new Raspberry Pi device to display your content
          </p>
        </div>

        {!showSetup ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Get Your Display Device</CardTitle>
                <CardDescription>
                  Choose how you'd like to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Image
                      src={raspberryPiDevice}
                      alt="Ctrl F2 Raspberry Pi Display Device"
                      className="w-full h-48 object-cover rounded-lg"
                      width={500}
                      height={192}
                    />
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Free Device with Annual Plan
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Sign up for an annual subscription and receive a
                            Ctrl F2 display device at no extra cost
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/5 border border-border">
                        <Check className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Buy Device + Monthly Plan
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Purchase the device upfront and pay for the service
                            monthly with flexible billing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold text-lg mb-3">
                      Device Specifications
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Raspberry Pi powered display
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Premium protective case with Ctrl F2 branding
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Pre-configured for plug-and-play setup
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        HDMI output for any display
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        WiFi enabled for remote management
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
                <CardDescription>
                  Enter the details for your new device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deviceName">Device Name</Label>
                    <Input
                      id="deviceName"
                      placeholder="e.g., Main Entrance Display"
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate API Key & Setup Instructions
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-6">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  Device Created Successfully
                </CardTitle>
                <CardDescription>
                  Your device "{deviceName}" has been created
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <Input value={apiKey} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep this key secure. You'll need it to configure your
                    device.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Setup Instructions</CardTitle>
                <CardDescription>
                  Follow these steps to set up your Raspberry Pi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Step 1: Download OS Image
                    </h3>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download SignageHub OS Image
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Custom Raspberry Pi OS image with pre-installed software
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Step 2: Flash SD Card
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Download and install Raspberry Pi Imager</li>
                      <li>Select the downloaded SignageHub OS image</li>
                      <li>Choose your SD card (8GB minimum)</li>
                      <li>Write the image to the SD card</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Step 3: Configure Device
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Insert the SD card into your Raspberry Pi</li>
                      <li>Power on the device</li>
                      <li>Connect to WiFi when prompted</li>
                      <li>
                        Enter your API key:{" "}
                        <code className="bg-muted px-1 rounded">{apiKey}</code>
                      </li>
                      <li>
                        The device will automatically register and start
                        displaying content
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Step 4: Verify Connection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Once configured, the device will appear in your devices
                      list as "online"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
