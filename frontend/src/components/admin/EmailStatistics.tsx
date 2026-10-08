import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { TrendingUp, TrendingDown, Mail, Send, Inbox, Trash2 } from "lucide-react";
// Dummy data for charts and statistics
const monthlyData = [
  { month: "Jan", sent: 4500, received: 5200, deleted: 800 },
  { month: "Feb", sent: 5200, received: 5800, deleted: 950 },
  { month: "Mar", sent: 4800, received: 5400, deleted: 720 },
  { month: "Apr", sent: 6100, received: 6800, deleted: 1100 },
  { month: "May", sent: 5600, received: 6200, deleted: 880 },
  { month: "Jun", sent: 6800, received: 7500, deleted: 1200 },
  { month: "Jul", sent: 5900, received: 6400, deleted: 920 },
  { month: "Aug", sent: 4200, received: 4800, deleted: 650 },
  { month: "Sep", sent: 7200, received: 8100, deleted: 1350 },
  { month: "Oct", sent: 8500, received: 9200, deleted: 1580 },
  { month: "Nov", sent: 7800, received: 8600, deleted: 1420 },
  { month: "Dec", sent: 6200, received: 6900, deleted: 980 },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  emails: Math.floor(Math.random() * 500) + (i >= 8 && i <= 17 ? 300 : 50),
}));

const topSenders = [
  { name: "Academic Registry", emails: 2840, percentage: 18 },
  { name: "IT Department", emails: 2156, percentage: 14 },
  { name: "Finance Office", emails: 1892, percentage: 12 },
  { name: "Library Services", emails: 1654, percentage: 11 },
  { name: "Dean of Students", emails: 1423, percentage: 9 },
];

const emailTypes = [
  { type: "Academic Notices", count: 8420, icon: Mail, color: "bg-primary" },
  { type: "Administrative", count: 5680, icon: Send, color: "bg-secondary" },
  { type: "Announcements", count: 4250, icon: Inbox, color: "bg-amber-500" },
  { type: "Personal", count: 3120, icon: Mail, color: "bg-emerald-500" },
];

export function EmailStatistics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Email Statistics</h1>
        <p className="text-muted-foreground">Detailed analytics of email traffic and patterns</p>
      </div>

      {/* Email Type Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {emailTypes.map((type, index) => (
          <motion.div
            key={type.type}
            className="card-aru"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${type.color}`}>
                <type.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{type.count.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{type.type}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Statistics Chart */}
      <motion.div
        className="card-aru"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Monthly Email Traffic</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Sent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">Received</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Deleted</span>
            </div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="sent" fill="hsl(210, 100%, 20%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="received" fill="hsl(180, 100%, 27%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deleted" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Activity */}
        <motion.div
          className="card-aru"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="mb-4 font-semibold text-foreground">Hourly Email Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  interval={3}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="emails" 
                  stroke="hsl(180, 100%, 27%)" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Peak hours: 09:00 - 12:00 & 14:00 - 17:00
          </p>
        </motion.div>

        {/* Top Senders */}
        <motion.div
          className="card-aru"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="mb-4 font-semibold text-foreground">Top Email Senders</h3>
          <div className="space-y-4">
            {topSenders.map((sender, index) => (
              <div key={sender.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{sender.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{sender.emails.toLocaleString()} emails</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${sender.percentage}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
