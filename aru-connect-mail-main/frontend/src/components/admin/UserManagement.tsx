import { useState } from "react";
import { motion } from "framer-motion";

import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Mail,
  Shield,
  UserX,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "lecturer" | "staff" | "admin";
  department: string;
  status: "active" | "inactive" | "suspended";
  lastActive: string;
  emailsCount: number;
}
// Dummy data for users in the system which can be replaced with real data from backend
const users: User[] = [
  { id: "1", name: "John Doe", email: "john.doe@students.aru.ac.tz", role: "student", department: "Architecture", status: "active", lastActive: "2 min ago", emailsCount: 156 },
  { id: "2", name: "Dr. Sarah Mwanza", email: "s.mwanza@aru.ac.tz", role: "lecturer", department: "Earth Sciences", status: "active", lastActive: "15 min ago", emailsCount: 847 },
  { id: "3", name: "James Kimaro", email: "j.kimaro@students.aru.ac.tz", role: "student", department: "Environmental", status: "inactive", lastActive: "3 days ago", emailsCount: 42 },
  { id: "4", name: "Prof. Anna Lyimo", email: "a.lyimo@aru.ac.tz", role: "lecturer", department: "Spatial Planning", status: "active", lastActive: "1 hour ago", emailsCount: 1205 },
  { id: "5", name: "Admin User", email: "admin@aru.ac.tz", role: "admin", department: "IT Department", status: "active", lastActive: "Just now", emailsCount: 3420 },
  { id: "6", name: "Grace Mushi", email: "g.mushi@aru.ac.tz", role: "staff", department: "Library", status: "active", lastActive: "30 min ago", emailsCount: 589 },
  { id: "7", name: "Peter Massawe", email: "p.massawe@students.aru.ac.tz", role: "student", department: "Architecture", status: "suspended", lastActive: "1 week ago", emailsCount: 23 },
  { id: "8", name: "Mary Joseph", email: "m.joseph@aru.ac.tz", role: "staff", department: "Finance", status: "active", lastActive: "5 min ago", emailsCount: 732 },
];

const roleColors = {
  student: "bg-blue-500/10 text-blue-500",
  lecturer: "bg-purple-500/10 text-purple-500",
  staff: "bg-amber-500/10 text-amber-500",
  admin: "bg-emerald-500/10 text-emerald-500",
};

const statusColors = {
  active: "text-emerald-500",
  inactive: "text-muted-foreground",
  suspended: "text-destructive",
};
// Main User Management Component
export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage all CampusMail users</p>
        </div>
        <motion.button
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-5 w-5" />
          Add User
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card-aru">
          <p className="text-2xl font-bold text-foreground">{users.length}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
        <div className="card-aru">
          <p className="text-2xl font-bold text-emerald-500">
            {users.filter((u) => u.status === "active").length}
          </p>
          <p className="text-sm text-muted-foreground">Active</p>
        </div>
        <div className="card-aru">
          <p className="text-2xl font-bold text-muted-foreground">
            {users.filter((u) => u.status === "inactive").length}
          </p>
          <p className="text-sm text-muted-foreground">Inactive</p>
        </div>
        <div className="card-aru">
          <p className="text-2xl font-bold text-destructive">
            {users.filter((u) => u.status === "suspended").length}
          </p>
          <p className="text-sm text-muted-foreground">Suspended</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="input-aru pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="input-aru w-40"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="lecturer">Lecturers</option>
            <option value="staff">Staff</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <motion.div
          className="flex items-center gap-4 rounded-lg bg-accent p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-medium text-foreground">
            {selectedUsers.length} user(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-background">
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-background">
              <Shield className="h-4 w-4" />
              Change Role
            </button>
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">
              <UserX className="h-4 w-4" />
              Suspend
            </button>
          </div>
        </motion.div>
      )}

      {/* Users Table */}
      <motion.div
        className="card-aru overflow-hidden p-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleAllUsers}
                    className="h-4 w-4 rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Department</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Emails</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Last Active</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  className="border-b border-border transition-colors hover:bg-muted/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-primary-foreground">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{user.department}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.status === "active" ? (
                        <CheckCircle2 className={`h-4 w-4 ${statusColors[user.status]}`} />
                      ) : (
                        <XCircle className={`h-4 w-4 ${statusColors[user.status]}`} />
                      )}
                      <span className={`text-sm capitalize ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{user.emailsCount.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              Previous
            </button>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              1
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
