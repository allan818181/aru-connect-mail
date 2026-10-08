//this component provides an overview of analytics for the admin dashboard
import { motion } from "framer-motion";
import { 
  Mail, 
  Users, 
  Send, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Building2,
  Clock,
  Megaphone
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// Sample data for charts and stats
const statsCards = [
  { 
    title: "Total Emails Sent", 
    value: "24,847", 
    change: "+12.5%", 
    isPositive: true, 
    icon: Send,
    color: "from-primary to-primary/80"
  },
  { 
    title: "Active Users", 
    value: "3,256", 
    change: "+8.2%", 
    isPositive: true, 
    icon: Users,
    color: "from-secondary to-secondary/80"
  },
  { 
    title: "Unread Messages", 
    value: "1,483", 
    change: "-5.1%", 
    isPositive: false, 
    icon: Mail,
    color: "from-amber-500 to-amber-500/80"
  },
  { 
    title: "Avg Response Time", 
    value: "2.4h", 
    change: "-18.3%", 
    isPositive: true, 
    icon: Clock,
    color: "from-emerald-500 to-emerald-500/80"
  },
];

const weeklyData = [
  { day: "Mon", emails: 1200, users: 450 },
  { day: "Tue", emails: 1800, users: 520 },
  { day: "Wed", emails: 2100, users: 580 },
  { day: "Thu", emails: 1600, users: 490 },
  { day: "Fri", emails: 2400, users: 620 },
  { day: "Sat", emails: 800, users: 280 },
  { day: "Sun", emails: 600, users: 210 },
];

const departmentData = [
  { name: "Architecture", value: 35, color: "hsl(210, 100%, 20%)" },
  { name: "Earth Sciences", value: 25, color: "hsl(180, 100%, 27%)" },
  { name: "Environmental", value: 20, color: "hsl(200, 80%, 50%)" },
  { name: "Spatial Planning", value: 15, color: "hsl(45, 90%, 55%)" },
  { name: "IHSS", value: 5, color: "hsl(0, 84%, 60%)" },
];

const recentActivity = [
  { action: "Bulk announcement sent", user: "Admin", time: "2 minutes ago", type: "announcement" },
  { action: "New user registered", user: "john.doe@students.aru.ac.tz", time: "15 minutes ago", type: "user" },
  { action: "System maintenance completed", user: "IT Department", time: "1 hour ago", type: "system" },
  { action: "Department report generated", user: "Academic Registry", time: "3 hours ago", type: "report" },
];

export function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor system performance and user activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="card-aru"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                stat.isPositive 
                  ? "bg-emerald-500/10 text-emerald-500" 
                  : "bg-destructive/10 text-destructive"
              }`}>
                {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Activity Chart */}
        <motion.div
          className="card-aru lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="mb-4 font-semibold text-foreground">Weekly Email Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="emailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 100%, 20%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(210, 100%, 20%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(180, 100%, 27%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(180, 100%, 27%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="emails" 
                  stroke="hsl(210, 100%, 20%)" 
                  fillOpacity={1} 
                  fill="url(#emailGradient)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(180, 100%, 27%)" 
                  fillOpacity={1} 
                  fill="url(#userGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Emails</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">Active Users</span>
            </div>
          </div>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          className="card-aru"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="mb-4 font-semibold text-foreground">Emails by Department</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {departmentData.slice(0, 3).map((dept) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-xs text-muted-foreground">{dept.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">{dept.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="card-aru"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="mb-4 font-semibold text-foreground">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                activity.type === "announcement" ? "bg-primary/10 text-primary" :
                activity.type === "user" ? "bg-secondary/10 text-secondary" :
                activity.type === "system" ? "bg-amber-500/10 text-amber-500" :
                "bg-muted text-muted-foreground"
              }`}>
                {activity.type === "announcement" ? <Megaphone className="h-5 w-5" /> :
                 activity.type === "user" ? <Users className="h-5 w-5" /> :
                 activity.type === "system" ? <Building2 className="h-5 w-5" /> :
                 <TrendingUp className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.user}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
