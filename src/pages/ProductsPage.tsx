
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";

// Sample product data
const products = [
  { id: 1, name: "Product A", category: "Electronics", stock: 243, price: 799, status: "Active" },
  { id: 2, name: "Product B", category: "Clothing", stock: 164, price: 59, status: "Active" },
  { id: 3, name: "Product C", category: "Furniture", stock: 38, price: 349, status: "Low Stock" },
  { id: 4, name: "Product D", category: "Electronics", stock: 72, price: 1299, status: "Active" },
  { id: 5, name: "Product E", category: "Health", stock: 0, price: 49, status: "Out of Stock" },
  { id: 6, name: "Product F", category: "Food", stock: 216, price: 29, status: "Active" },
  { id: 7, name: "Product G", category: "Clothing", stock: 54, price: 129, status: "Active" },
  { id: 8, name: "Product H", category: "Electronics", stock: 12, price: 599, status: "Low Stock" }
];

// Sample category data for chart
const categoryData = [
  { name: "Electronics", count: 3 },
  { name: "Clothing", count: 2 },
  { name: "Furniture", count: 1 },
  { name: "Health", count: 1 },
  { name: "Food", count: 1 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold">{products.length}</p>
                <p className="text-xs text-muted-foreground">Across {categoryData.length} categories</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <p className="text-3xl font-bold">{products.filter(p => p.status === "Low Stock").length}</p>
                <p className="text-xs text-muted-foreground">Below minimum stock threshold</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-3xl font-bold">{products.filter(p => p.status === "Out of Stock").length}</p>
                <p className="text-xs text-muted-foreground">Needs immediate attention</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Product Distribution</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList className="mb-4">
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <BarChart 
                  data={categoryData} 
                  xKey="name" 
                  yKey="count" 
                  color="hsl(var(--primary))" 
                  height={240}
                />
              </TabsContent>
              <TabsContent value="table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Products</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryData.map((category) => (
                      <TableRow key={category.name}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell className="text-right">{category.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Products Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your product catalog</CardDescription>
              </div>
              <div className="flex w-full sm:w-auto items-center gap-2">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        product.status === "Active" ? "default" :
                        product.status === "Low Stock" ? "warning" :
                        "destructive"
                      } className={
                        product.status === "Active" ? "bg-green-500 hover:bg-green-600" :
                        product.status === "Low Stock" ? "bg-amber-500 hover:bg-amber-600" :
                        "bg-red-500 hover:bg-red-600"
                      }>
                        {product.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
