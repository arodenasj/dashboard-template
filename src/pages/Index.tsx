
import { BarChart3, CreditCard, Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { AreaChart } from "@/components/dashboard/area-chart";
import { BarChart } from "@/components/dashboard/bar-chart";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 3908 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
  { month: "Jul", revenue: 4300 },
  { month: "Aug", revenue: 5300 },
  { month: "Sep", revenue: 4500 },
  { month: "Oct", revenue: 6500 },
  { month: "Nov", revenue: 7500 },
  { month: "Dec", revenue: 8500 },
];

const productData = [
  { name: "Product A", sales: 4000 },
  { name: "Product B", sales: 3000 },
  { name: "Product C", sales: 2000 },
  { name: "Product D", sales: 2780 },
  { name: "Product E", sales: 1890 },
  { name: "Product F", sales: 2390 },
];

const recentActivities = [
  {
    id: 1,
    title: "New customer registered",
    time: "2 minutes ago",
    icon: "user" as const,
    description: "Jane Cooper signed up as a new customer"
  },
  {
    id: 2,
    title: "New order received",
    time: "1 hour ago",
    icon: "order" as const,
    description: "Order #12354 received for Product B"
  },
  {
    id: 3,
    title: "Product update",
    time: "5 hours ago",
    icon: "product" as const,
    description: "Product A inventory updated to 150 units"
  },
  {
    id: 4,
    title: "Task completed",
    time: "Yesterday",
    icon: "task" as const,
    description: "Monthly report generation completed"
  },
  {
    id: 5,
    title: "New comment",
    time: "2 days ago",
    icon: "message" as const,
    description: "New comment on sales report from Marketing team"
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Revenue" 
            value={formatCurrency(54200)} 
            change={12} 
            icon={<CreditCard className="h-4 w-4" />} 
          />
          <StatCard 
            title="Customers" 
            value="2,543" 
            change={8.1} 
            icon={<Users className="h-4 w-4" />} 
          />
          <StatCard 
            title="Products" 
            value="45" 
            change={-2.5} 
            icon={<Package className="h-4 w-4" />} 
          />
          <StatCard 
            title="Active Orders" 
            value="68" 
            change={15.3} 
            icon={<ShoppingBag className="h-4 w-4" />} 
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue trends for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">+12.5%</span>
                  </div>
                </div>
                <TabsContent value="chart" className="mt-2">
                  <AreaChart 
                    data={revenueData} 
                    xKey="month" 
                    yKey="revenue" 
                    yFormatter={formatCurrency} 
                  />
                </TabsContent>
                <TabsContent value="overview" className="mt-2">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                        <p className="font-medium">{formatCurrency(54200)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Average Monthly</p>
                        <p className="font-medium">{formatCurrency(4517)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">YoY Growth</p>
                        <p className="font-medium text-green-500">+12.5%</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">Revenue has been steadily increasing over the past year with a significant spike in March. Overall growth is positive at 12.5% year-over-year.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Top Products</CardTitle>
              <CardDescription>Sales performance by product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">Showing top 6 products by sales</div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <BarChart 
                data={productData} 
                xKey="name" 
                yKey="sales" 
                yFormatter={(value) => value.toString()} 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Activities */}
        <div className="grid grid-cols-1">
          <Card>
            <CardContent className="p-4 md:p-6">
              <RecentActivities activities={recentActivities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
