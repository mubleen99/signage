import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Home,
  Plus,
  Menu,
  PlaySquare,
  Calendar,
  Settings,
  Users,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ctrlF2Logo from "@/assets/ctrlf2-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

function AppSidebar() {
  const pathname = usePathname() || "/";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const navItems = [
    { path: "/", icon: Home, label: "Devices" },
    { path: "/add-device", icon: Plus, label: "Add Device" },
    { path: "/menus", icon: Menu, label: "Menu Builder" },
    { path: "/playlists", icon: PlaySquare, label: "Playlists" },
    { path: "/schedule", icon: Calendar, label: "Schedule" },
    { path: "/manage-users", icon: Users, label: "Manage Users" },
  ];

  return (
    <Sidebar
      className={cn(
        "border-r border-border transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarContent>
        {/* Logo in Sidebar */}
        <div
          className={cn(
            "p-6 border-b border-border bg-gradient-to-b from-card to-background",
            isCollapsed && "px-3"
          )}
        >
          <Link
            href="/"
            className="flex flex-col items-center gap-3 hover:opacity-90 transition-all duration-300"
          >
            <Image
              src={ctrlF2Logo}
              alt="Ctrl F2 Logo"
              width={isCollapsed ? 48 : 80}
              height={isCollapsed ? 48 : 80}
              className={cn(
                "w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-300",
                isCollapsed ? "h-12" : "h-20"
              )}
              style={{
                filter:
                  "drop-shadow(0 6px 10px rgba(0, 0, 0, 0.2)) drop-shadow(0 12px 20px rgba(0, 0, 0, 0.3))",
              }}
            />
            {!isCollapsed && (
              <>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Digital Signage
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Powered by Innovation
                  </p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50"></div>
              </>
            )}
          </Link>
        </div>

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent className={cn(isCollapsed && "px-2")}>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className={cn(
                          "flex items-center rounded-lg transition-all duration-200 hover:scale-105",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md",
                          isCollapsed
                            ? "justify-center p-4 w-14 h-14 mx-auto"
                            : "gap-3 px-4 py-3"
                        )}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <Icon
                          className={cn(
                            "flex-shrink-0 transition-all duration-200",
                            isCollapsed ? "w-7 h-7" : "w-5 h-5"
                          )}
                        />
                        {!isCollapsed && (
                          <span className="font-medium">{item.label}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle Button */}
        <div
          className={cn(
            "mt-auto p-4 border-t border-border",
            isCollapsed && "px-2"
          )}
        >
          <SidebarTrigger>
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <span className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Collapse
              </span>
            )}
          </SidebarTrigger>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export function Layout({ children }: LayoutProps) {
  const navItems = [
    { path: "/", icon: Home, label: "Devices" },
    { path: "/add-device", icon: Plus, label: "Add Device" },
    { path: "/menus", icon: Menu, label: "Menu Builder" },
    { path: "/playlists", icon: PlaySquare, label: "Playlists" },
    { path: "/schedule", icon: Calendar, label: "Schedule" },
    { path: "/manage-users", icon: Users, label: "Manage Users" },
  ];
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="hover:bg-muted rounded-md p-2 transition-colors" />
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

          {/* Footer */}
          <footer className="border-t border-border bg-card/30 mt-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Column */}
                <div className="space-y-4">
                  <Image
                    src={"/ctrlf2-logo.png"}
                    alt="Ctrl F2 Logo"
                    width={160}
                    height={64}
                    className="h-16 w-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
                    style={{
                      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                      transform: "perspective(800px) rotateX(3deg)",
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Professional digital signage solutions for modern businesses
                  </p>
                </div>

                {/* Product Links */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">
                    Product
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Devices
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/menus"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Menu Builder
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/playlists"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Playlists
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/schedule"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Schedule
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">
                    Company
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">
                    Contact
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <a
                        href="mailto:support@ctrlf2.com"
                        className="hover:text-primary transition-colors"
                      >
                        support@ctrlf2.com
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <a
                        href="tel:+1234567890"
                        className="hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>San Francisco, CA</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} Ctrl F2. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
