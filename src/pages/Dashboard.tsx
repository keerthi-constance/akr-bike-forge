import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Users, ShoppingCart, Wrench, TrendingUp, Package } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalServices: 0,
    lowStock: 0,
    recentSalesAmount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [bikes, customers, sales, services] = await Promise.all([
        supabase.from("bikes").select("*", { count: "exact", head: true }),
        supabase.from("customers").select("*", { count: "exact", head: true }),
        supabase.from("sales").select("*"),
        supabase.from("services").select("*", { count: "exact", head: true }),
      ]);

      const lowStockBikes = await supabase
        .from("bikes")
        .select("*", { count: "exact", head: true })
        .lt("stock_quantity", 5);

      const recentSales = sales.data?.reduce((sum, sale) => sum + Number(sale.total_amount), 0) || 0;

      setStats({
        totalBikes: bikes.count || 0,
        totalCustomers: customers.count || 0,
        totalSales: sales.data?.length || 0,
        totalServices: services.count || 0,
        lowStock: lowStockBikes.count || 0,
        recentSalesAmount: recentSales,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Bikes",
      value: stats.totalBikes,
      icon: Bike,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Sales",
      value: stats.totalSales,
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Services",
      value: stats.totalServices,
      icon: Wrench,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Low Stock Alert",
      value: stats.lowStock,
      icon: Package,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Sales Revenue",
      value: `$${stats.recentSalesAmount.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AKR BIKE Management System</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;