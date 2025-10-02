import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bikes = () => {
  const [bikes, setBikes] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    const { data, error } = await supabase
      .from("bikes")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setBikes(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const bikeData = {
      model_name: formData.get("model_name") as string,
      brand: formData.get("brand") as string,
      type: formData.get("type") as string,
      price: parseFloat(formData.get("price") as string),
      stock_quantity: parseInt(formData.get("stock_quantity") as string),
    };

    if (editingBike) {
      const { error } = await supabase
        .from("bikes")
        .update(bikeData)
        .eq("id", editingBike.id);
      
      if (!error) {
        toast({ title: "Bike updated successfully" });
      }
    } else {
      const { error } = await supabase.from("bikes").insert(bikeData);
      
      if (!error) {
        toast({ title: "Bike added successfully" });
      }
    }

    setIsOpen(false);
    setEditingBike(null);
    fetchBikes();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bike?")) {
      const { error } = await supabase.from("bikes").delete().eq("id", id);
      
      if (!error) {
        toast({ title: "Bike deleted successfully" });
        fetchBikes();
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Bikes Inventory</h1>
            <p className="text-muted-foreground">Manage your bike inventory</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingBike(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Bike
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBike ? "Edit" : "Add"} Bike</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="model_name">Model Name</Label>
                  <Input
                    id="model_name"
                    name="model_name"
                    defaultValue={editingBike?.model_name}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    defaultValue={editingBike?.brand}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    name="type"
                    defaultValue={editingBike?.type}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingBike?.price}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    name="stock_quantity"
                    type="number"
                    defaultValue={editingBike?.stock_quantity}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingBike ? "Update" : "Add"} Bike
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bikes.map((bike) => (
              <TableRow key={bike.id}>
                <TableCell className="font-medium">{bike.model_name}</TableCell>
                <TableCell>{bike.brand}</TableCell>
                <TableCell>{bike.type}</TableCell>
                <TableCell>${bike.price}</TableCell>
                <TableCell>{bike.stock_quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingBike(bike);
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(bike.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Bikes;