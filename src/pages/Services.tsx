import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [bikes, setBikes] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [servicesData, customersData, employeesData, bikesData] = await Promise.all([
      supabase.from("services").select(`
        *,
        customers(name),
        employees(name),
        bikes(model_name)
      `).order("service_date", { ascending: false }),
      supabase.from("customers").select("*"),
      supabase.from("employees").select("*"),
      supabase.from("bikes").select("*"),
    ]);

    if (servicesData.data) setServices(servicesData.data);
    if (customersData.data) setCustomers(customersData.data);
    if (employeesData.data) setEmployees(employeesData.data);
    if (bikesData.data) setBikes(bikesData.data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const serviceData = {
      customer_id: formData.get("customer_id") as string,
      employee_id: formData.get("employee_id") as string,
      bike_id: formData.get("bike_id") as string,
      description: formData.get("description") as string,
      cost: parseFloat(formData.get("cost") as string),
      status: formData.get("status") as string,
    };

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", editingService.id);
      
      if (!error) {
        toast({ title: "Service updated successfully" });
      }
    } else {
      const { error } = await supabase.from("services").insert(serviceData);
      
      if (!error) {
        toast({ title: "Service recorded successfully" });
      }
    }

    setIsOpen(false);
    setEditingService(null);
    fetchData();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground">Manage service records</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingService(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Record Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingService ? "Edit" : "Record"} Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="customer_id">Customer</Label>
                  <Select name="customer_id" defaultValue={editingService?.customer_id} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employee_id">Employee</Label>
                  <Select name="employee_id" defaultValue={editingService?.employee_id} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bike_id">Bike</Label>
                  <Select name="bike_id" defaultValue={editingService?.bike_id} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bike" />
                    </SelectTrigger>
                    <SelectContent>
                      {bikes.map((bike) => (
                        <SelectItem key={bike.id} value={bike.id}>
                          {bike.model_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingService?.description}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cost">Cost</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    step="0.01"
                    defaultValue={editingService?.cost}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingService?.status || "pending"} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  {editingService ? "Update" : "Record"} Service
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Bike</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{new Date(service.service_date).toLocaleDateString()}</TableCell>
                <TableCell>{service.customers?.name}</TableCell>
                <TableCell>{service.bikes?.model_name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>${service.cost}</TableCell>
                <TableCell>
                  <Badge variant={service.status === "completed" ? "default" : "secondary"}>
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingService(service);
                      setIsOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Services;