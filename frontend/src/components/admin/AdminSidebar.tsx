import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Activity, 
  Megaphone, 
  Send,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
// Admin Sidebar Component
interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "overview", name: "Overview", icon: LayoutDashboard },
  { id: "statistics", name: "Email Statistics", icon: BarChart3 },
  { id: "users", name: "User Management", icon: Users },
  { id: "activity", name: "User Activity", icon: Activity },
  { id: "announcements", name: "Announcements", icon: Megaphone },
  { id: "bulk-email", name: "Bulk Email", icon: Send },
];

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card/50">
      {/* Admin Badge */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Admin Panel</p>
            <p className="text-xs text-muted-foreground">System Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
              activeSection === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </motion.button>
        ))}
      </nav>
      // we add this section for help or support info so that admins can easily reach out if they need assistance
      {/* Help Section */}
      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium text-foreground">Need Help?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Contact IT support for admin assistance
          </p>
          <button className="mt-3 text-xs font-medium text-primary hover:underline">
            it.support@aru.ac.tz
          </button>
        </div>
      </div>
    </aside>
  );
}
