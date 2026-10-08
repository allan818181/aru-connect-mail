import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  await new Promise((r) => setTimeout(r, 1500));

  // Admin credentials
  const adminEmail = "admin@aru.ac.tz";
  const adminPassword = "Admin1234";

  if (email === adminEmail && password === adminPassword) {
    toast({
      title: "Welcome Admin!",
      description: "You have successfully logged in as Admin.",
    });
    setIsLoading(false);
    navigate("/admin");
    return;
  }


    toast({
      title: "Welcome back!",
      description: "You have successfully logged in to CampusMail.",
    });

    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ARU Logo */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <img
          src="assets/AKTEUR_Ardhi-University_LOGO_400x400_200322.webp"
          alt="ARU Logo"
          className="h-16 drop-shadow-md"
        />
        <p className="text-sm font-semibold text-muted-foreground tracking-wide">
          ARU CAMPUSMAIL LOGIN
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5 backdrop-blur-xl bg-white/10 dark:bg-black/10 p-6 rounded-2xl border border-white/20 shadow-xl shadow-teal-500/10"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@aru.ac.tz"
              className="input-aru pl-12 focus:ring-2 focus:ring-aru-blue"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input-aru pl-12 pr-12 focus:ring-2 focus:ring-aru-teal"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 rounded border-border" />
            Remember me
          </label>
          <button type="button" className="text-sm text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-aru-blue to-aru-teal text-white font-semibold shadow-lg shadow-aru-teal/30 hover:opacity-90 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "Signing in..." : "Sign In"}
        </motion.button>

        {/* Register */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary font-medium hover:underline"
          >
            Register now
          </button>
        </p>
      </motion.form>
    </motion.div>
  );
}
