import { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = () => navigate("/");

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <img
          src="/assets/AKTEUR_Ardhi-University_LOGO_400x400_200322.webp"
          alt="ARU Logo"
          className="h-10 w-10 rounded-full object-cover shadow-sm"
        />
        <div>
          <h1 className="font-display text-lg font-bold text-foreground">CampusMail</h1>
          <p className="text-xs text-muted-foreground">Ardhi University</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-primary-foreground">
            MP
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-foreground">Mpambije</p>
            <p className="text-xs text-muted-foreground">mpambije@aru.ac.tz</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        {showDropdown && (
          <motion.div
            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-card py-2 shadow-card"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="py-2">
              <button
                onClick={() => handleNavigation("/profile")}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => handleNavigation("/setting")}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button
                onClick={() => handleNavigation("/help-support")}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </button>
            </div>
            <div className="border-t border-border pt-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
