"use client";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, Trash2, LayoutGrid, Monitor, Send } from "lucide-react";
import { DisplayPreview } from "@/components/DisplayPreview";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  image?: string;
}

export default function MenuBuilder() {
  const { toast } = useToast();
  const [selectedLayout, setSelectedLayout] = useState("single-column");
  const [selectedCategory, setSelectedCategory] = useState("breakfast");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      category: "breakfast",
      title: "Breakfast Burrito",
      description: "Eggs, bacon, cheese, and salsa wrapped in a warm tortilla",
      price: "8.99",
    },
    {
      id: "2",
      category: "lunch",
      title: "Club Sandwich",
      description: "Triple-decker with turkey, bacon, lettuce, and tomato",
      price: "12.99",
    },
  ]);

  const [currentItem, setCurrentItem] = useState<Partial<MenuItem>>({
    category: "breakfast",
    title: "",
    description: "",
    price: "",
  });

  const layouts = [
    { id: "single-column", name: "Single Column" },
    { id: "two-column", name: "Two Column" },
    { id: "three-column", name: "Three Column" },
    { id: "hero-items", name: "Hero Image + Items" },
    { id: "rotating", name: "Rotating Board" },
  ];

  const categories = [
    {
      id: "breakfast",
      name: "Breakfast",
      color: "bg-yellow-500/10 text-yellow-600",
    },
    { id: "lunch", name: "Lunch", color: "bg-green-500/10 text-green-600" },
    { id: "dinner", name: "Dinner", color: "bg-purple-500/10 text-purple-600" },
    { id: "drinks", name: "Drinks", color: "bg-blue-500/10 text-blue-600" },
    { id: "dessert", name: "Dessert", color: "bg-pink-500/10 text-pink-600" },
  ];

  const addMenuItem = () => {
    if (!currentItem.title || !currentItem.price || !currentItem.category)
      return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      category: currentItem.category,
      title: currentItem.title,
      description: currentItem.description || "",
      price: currentItem.price,
      image: currentItem.image,
    };

    setMenuItems([...menuItems, newItem]);
    setCurrentItem({
      category: selectedCategory,
      title: "",
      description: "",
      price: "",
    });
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Menu Builder</h2>
          <p className="text-muted-foreground mt-2">
            Create menus with categories, items, and choose layout templates
          </p>
        </div>

        {/* Layout Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              <CardTitle>Layout Templates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {layouts.map((layout) => (
                <Button
                  key={layout.id}
                  variant={selectedLayout === layout.id ? "default" : "outline"}
                  className="h-20 flex-col gap-2"
                  onClick={() => setSelectedLayout(layout.id)}
                >
                  <LayoutGrid className="w-5 h-5" />
                  <span className="text-xs">{layout.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Menu Item Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                Add Item to{" "}
                {categories.find((c) => c.id === selectedCategory)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={currentItem.category}
                  onValueChange={(value) =>
                    setCurrentItem({ ...currentItem, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Breakfast Burrito"
                  value={currentItem.title}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your menu item..."
                  value={currentItem.description}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="8.99"
                  value={currentItem.price}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, price: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              <Button onClick={addMenuItem} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add to Menu
              </Button>
            </CardContent>
          </Card>

          {/* Menu Items List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {categories.find((c) => c.id === selectedCategory)?.name} Items
                ({filteredItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No items in this category</p>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {item.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className={
                                  categories.find((c) => c.id === item.category)
                                    ?.color
                                }
                              >
                                {
                                  categories.find((c) => c.id === item.category)
                                    ?.name
                                }
                              </Badge>
                            </div>
                            <span className="text-primary font-semibold">
                              ${item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMenuItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Display Preview Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    Display Preview
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Real-time preview of your content
                  </p>
                </div>
                <Button
                  onClick={() => {
                    toast({
                      title: "Content Pushed Successfully",
                      description: "Content deployed to connected displays",
                    });
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Push to Displays
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DisplayPreview
                contents={[
                  {
                    type: "image",
                    content:
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
                  },
                ]}
                aspectRatio="16:9"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
