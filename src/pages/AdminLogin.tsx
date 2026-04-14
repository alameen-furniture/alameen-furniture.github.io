import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000;
const REMEMBER_ME_KEY = "admin_remember_me";
const REMEMBER_DURATION_DAYS = 7;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const loginAttempts = useRef(0);
  const lockoutUntil = useRef<number>(0);
  const navigate = useNavigate();

  // Check if user has a valid remembered session on mount
  useEffect(() => {
    const remembered = localStorage.getItem(REMEMBER_ME_KEY);
    if (remembered) {
      const { expiry } = JSON.parse(remembered);
      if (Date.now() < expiry) {
        // Session still valid, check if actually authenticated
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            navigate("/admin/dashboard");
          } else {
            localStorage.removeItem(REMEMBER_ME_KEY);
          }
        });
      } else {
        localStorage.removeItem(REMEMBER_ME_KEY);
        supabase.auth.signOut();
      }
    }
  }, [navigate]);

  const isLockedOut = () => {
    if (lockoutUntil.current && Date.now() < lockoutUntil.current) {
      const remaining = Math.ceil((lockoutUntil.current - Date.now()) / 60000);
      toast({ title: `Too many attempts. Try again in ${remaining} minute(s).`, variant: "destructive" });
      return true;
    }
    if (lockoutUntil.current && Date.now() >= lockoutUntil.current) {
      loginAttempts.current = 0;
      lockoutUntil.current = 0;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        loginAttempts.current += 1;
        if (loginAttempts.current >= MAX_LOGIN_ATTEMPTS) {
          lockoutUntil.current = Date.now() + LOCKOUT_DURATION_MS;
          toast({ title: "Account locked for 5 minutes due to too many failed attempts.", variant: "destructive" });
        } else {
          toast({ title: "Invalid email or password.", variant: "destructive" });
        }
        return;
      }

      // Check admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles" as any)
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        toast({ title: "Access denied. You are not an admin.", variant: "destructive" });
        return;
      }

      loginAttempts.current = 0;
      
      if (rememberMe) {
        localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify({
          expiry: Date.now() + REMEMBER_DURATION_DAYS * 24 * 60 * 60 * 1000,
        }));
      } else {
        localStorage.removeItem(REMEMBER_ME_KEY);
      }
      
      toast({ title: "Welcome back, Admin!" });
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({ title: "Login failed. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Enter your email first", variant: "destructive" });
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({ title: "Password reset email sent. Check your inbox." });
    } catch {
      // Don't reveal whether email exists
      toast({ title: "If this email is registered, a reset link has been sent." });
    }
  };

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage enquiries</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 border border-border rounded-xl bg-card p-8">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="pl-10 bg-secondary border-border focus:border-primary"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-secondary border-border focus:border-primary"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer select-none">
                Remember me for 7 days
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-full gold-glow gold-glow-hover"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;
