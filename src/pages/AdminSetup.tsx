import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminExists, setAdminExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingAdmin = async () => {
      try {
        // Try to invoke the assign-admin function with a dummy check
        // The function itself checks if admin exists
        setChecking(false);
      } catch {
        setChecking(false);
      }
    };
    checkExistingAdmin();
  }, []);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast({ title: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      toast({ title: "Password must include at least one uppercase letter and one number.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("Signup failed");

      // Assign admin role via edge function
      const { data: roleResult, error: roleError } = await supabase.functions.invoke("assign-admin", {
        body: { user_id: data.user.id },
      });

      if (roleError) {
        console.error("Role assignment error:", roleError);
        toast({ title: "Admin already exists or setup failed.", variant: "destructive" });
        setAdminExists(true);
        return;
      }

      // Check if the function returned an error (admin already exists)
      if (roleResult?.error) {
        toast({ title: roleResult.error, variant: "destructive" });
        setAdminExists(true);
        return;
      }

      toast({ title: "Admin account created! Please verify your email before logging in." });
      navigate("/admin");
    } catch (err: any) {
      toast({ title: err.message || "Setup failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Checking setup status...</p>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Setup Complete</h1>
          <p className="text-muted-foreground mb-4">An admin account already exists.</p>
          <Button onClick={() => navigate("/admin")} className="rounded-full">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="font-serif text-3xl font-bold text-foreground text-center mb-2">Admin Setup</h1>
        <p className="text-muted-foreground text-center mb-8">Create your admin account (one-time setup)</p>
        <form onSubmit={handleSetup} className="space-y-5 border border-border rounded-xl bg-card p-8">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary border-border" autoComplete="email" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="bg-secondary border-border" autoComplete="new-password" />
            <p className="text-xs text-muted-foreground mt-1">Min 8 characters, one uppercase letter, one number</p>
          </div>
          <Button type="submit" disabled={loading} className="w-full py-5 rounded-full gold-glow">
            {loading ? "Creating..." : "Create Admin Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetup;
