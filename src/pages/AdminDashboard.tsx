import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, Phone, Mail, Clock, Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  requirement: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return false;
    }
    const { data: roleData } = await supabase
      .from("user_roles" as any)
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin");
      return false;
    }
    return true;
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enquiries" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load enquiries", variant: "destructive" });
    } else {
      setEnquiries((data as any) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth().then((ok) => {
      if (ok) fetchEnquiries();
    });
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("enquiries" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    } else {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast({ title: "Enquiry deleted" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase()))
  );

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground">{enquiries.length} total enquiries</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={fetchEnquiries} title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {search ? "No matching enquiries found" : "No enquiries yet"}
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((enquiry) => (
              <div
                key={enquiry.id}
                className="border border-border rounded-xl bg-card p-5 sm:p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-foreground truncate">
                      {enquiry.name}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                      <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Phone className="w-3.5 h-3.5" /> {enquiry.phone}
                      </a>
                      {enquiry.email && (
                        <a href={`mailto:${enquiry.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                          <Mail className="w-3.5 h-3.5" /> {enquiry.email}
                        </a>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {formatDate(enquiry.created_at)}
                      </span>
                    </div>
                    {enquiry.requirement && (
                      <p className="mt-3 text-sm text-foreground/80 bg-secondary rounded-lg p-3">
                        {enquiry.requirement}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "")}?text=Hi ${encodeURIComponent(enquiry.name)}, thank you for your enquiry at Al-Ameen Furniture!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors"
                      title="Reply on WhatsApp"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.389 0-4.636-.85-6.438-2.324l-.45-.37-3.1 1.04 1.04-3.1-.37-.45A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                    </a>
                    <button
                      onClick={() => handleDelete(enquiry.id)}
                      className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
