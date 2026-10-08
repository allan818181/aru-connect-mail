import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Mail,
  LogIn,
  LogOut,
  UserPlus,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
// Dummy data for user activity logs with various actions and statuses
const activityLogs = [
  { id: 1, user: "john.doe@students.aru.ac.tz", action: "Login", ip: "192.168.1.45", time: new Date(2024, 11, 11, 9, 23), status: "success" },
  { id: 2, user: "sarah.mwanza@aru.ac.tz", action: "Email Sent", ip: "192.168.1.102", time: new Date(2024, 11, 11, 9, 18), status: "success" },
  { id: 3, user: "admin@aru.ac.tz", action: "Bulk Email", ip: "192.168.1.1", time: new Date(2024, 11, 11, 9, 15), status: "success" },
  { id: 4, user: "james.kimaro@students.aru.ac.tz", action: "Login Failed", ip: "10.0.0.55", time: new Date(2024, 11, 11, 9, 10), status: "failed" },
  { id: 5, user: "finance@aru.ac.tz", action: "Attachment Upload", ip: "192.168.1.78", time: new Date(2024, 11, 11, 9, 5), status: "success" },
  { id: 6, user: "library@aru.ac.tz", action: "Email Sent", ip: "192.168.1.92", time: new Date(2024, 11, 11, 8, 58), status: "success" },
  { id: 7, user: "new.student@students.aru.ac.tz", action: "Registration", ip: "172.16.0.33", time: new Date(2024, 11, 11, 8, 45), status: "success" },
  { id: 8, user: "it.support@aru.ac.tz", action: "Logout", ip: "192.168.1.15", time: new Date(2024, 11, 11, 8, 30), status: "success" },
  { id: 9, user: "unknown@external.com", action: "Login Failed", ip: "203.45.67.89", time: new Date(2024, 11, 11, 8, 22), status: "blocked" },
  { id: 10, user: "dean.students@aru.ac.tz", action: "Email Sent", ip: "192.168.1.50", time: new Date(2024, 11, 11, 8, 15), status: "success" },
];

const actionIcons: Record<string, typeof Mail> = {
  "Login": LogIn,
  "Login Failed": AlertCircle,
  "Logout": LogOut,
  "Email Sent": Mail,
  "Bulk Email": Mail,
  "Registration": UserPlus,
  "Attachment Upload": Download,
};

const statusColors: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-500",
  failed: "bg-amber-500/10 text-amber-500",
  blocked: "bg-destructive/10 text-destructive",
};

export function UserActivity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">User Activity</h1>
          <p className="text-muted-foreground">Monitor all user actions and system events</p>
        </div>
        <motion.button
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="h-4 w-4" />
          Export Logs
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user or action..."
            className="input-aru pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-aru w-40"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Activity Table */}
      <motion.div
        className="card-aru overflow-hidden p-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">IP Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => {
                const Icon = actionIcons[log.action] || Mail;
                return (
                  <motion.tr
                    key={log.id}
                    className="border-b border-border transition-colors hover:bg-muted/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-primary-foreground">
                          {log.user.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-foreground">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-muted-foreground">{log.ip}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {format(log.time, "MMM d, HH:mm")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[log.status]}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {activityLogs.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              Previous
            </button>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              1
            </button>
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              2
            </button>
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
