// Bulk Email Component for Admin Dashboard. this allows admins to compose and send bulk emails to selected user groups.
import React, { useReducer, useMemo } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Users, 
  Building2, 
  Upload, 
  Bold, 
  Italic, 
  Underline, 
  List,
  Link2,
  Image,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const recipientGroups = [
  { id: "all", name: "All Users", count: 3256, icon: Users },
  { id: "students", name: "All Students", count: 2847, icon: Users },
  { id: "lecturers", name: "All Lecturers", count: 245, icon: Users },
  { id: "staff", name: "Administrative Staff", count: 164, icon: Building2 },
];

const departments = [
  { id: "arch", name: "Architecture & Construction", count: 856 },
  { id: "earth", name: "Earth Sciences & Real Estate", count: 724 },
  { id: "env", name: "Environmental Science", count: 612 },
  { id: "spatial", name: "Spatial Planning", count: 485 },
  { id: "ihss", name: "Human Settlements Studies", count: 170 },
];

const recentBulkEmails = [
  { subject: "End of Year Message", recipients: 3256, status: "sent", time: "2 hours ago" },
  { subject: "System Maintenance Notice", recipients: 3256, status: "sent", time: "1 day ago" },
  { subject: "Holiday Schedule Update", recipients: 2847, status: "sent", time: "3 days ago" },
  { subject: "Research Grant Deadline", recipients: 245, status: "scheduled", time: "Tomorrow 9:00 AM" },
];

export function BulkEmail() {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const totalRecipients = () => {
    let count = 0;
    selectedGroups.forEach((groupId) => {
      const group = recipientGroups.find((g) => g.id === groupId);
      if (group) count += group.count;
    });
    selectedDepartments.forEach((deptId) => {
      const dept = departments.find((d) => d.id === deptId);
      if (dept) count += dept.count;
    });
    return count;
  };
   // Handlers for selecting/deselecting groups and departments
  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleDepartmentToggle = (deptId: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleSend = async () => {
    if (!subject || !body) {
      toast({
        title: "Error",
        description: "Please fill in the subject and message body.",
        variant: "destructive",
      });
      return;
    }

    if (selectedGroups.length === 0 && selectedDepartments.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one recipient group.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending with progress
    await new Promise((resolve) => setTimeout(resolve, 2500));

    toast({
      title: "Bulk Email Sent!",
      description: `Your message has been sent to ${totalRecipients().toLocaleString()} recipients.`,
    });

    setIsSending(false);
    setSubject("");
    setBody("");
    setSelectedGroups([]);
    setSelectedDepartments([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Bulk Email</h1>
        <p className="text-muted-foreground">Send emails to large groups of users at once</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose Section */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recipient Selection */}
          <motion.div
            className="card-aru"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="mb-4 font-semibold text-foreground">Select Recipients</h3>
            
            {/* Quick Groups */}
            <div className="mb-4">
              <p className="mb-2 text-sm text-muted-foreground">Quick Groups</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {recipientGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleGroupToggle(group.id)}
                    className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                      selectedGroups.includes(group.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <group.icon className="h-5 w-5" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.count.toLocaleString()} users</p>
                    </div>
                    {selectedGroups.includes(group.id) && (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <p className="mb-2 text-sm text-muted-foreground">By Department</p>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => handleDepartmentToggle(dept.id)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      selectedDepartments.includes(dept.id)
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {dept.name} ({dept.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Total Recipients */}
            {totalRecipients() > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {totalRecipients().toLocaleString()} recipients selected
                </span>
              </div>
            )}
          </motion.div>

          {/* Email Composition */}
          <motion.div
            className="card-aru"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4 font-semibold text-foreground">Compose Message</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject line"
                  className="input-aru"
                />
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 rounded-lg border border-border p-2">
                <button className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Bold className="h-4 w-4" />
                </button>
                <button className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Italic className="h-4 w-4" />
                </button>
                <button className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Underline className="h-4 w-4" />
                </button>
                <div className="mx-2 h-4 w-px bg-border" />
                <button className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <List className="h-4 w-4" />
                </button>
                <button className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Link2 className="h-4 w-4" />
                </button>
                <button className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Image className="h-4 w-4" />
                </button>
                <div className="mx-2 h-4 w-px bg-border" />
                <button className="flex items-center gap-2 rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Attach</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message Body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your message here..."
                  rows={8}
                  className="input-aru resize-none"
                />
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-amber-500">Important Notice</p>
                  <p className="text-sm text-amber-500/80">
                    Bulk emails will be sent in batches to avoid server overload. Large sends may take several minutes to complete.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <motion.button
                  onClick={() => setShowPreview(true)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Preview
                </motion.button>
                <motion.button
                  onClick={handleSend}
                  disabled={isSending}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2 font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Bulk Email
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Bulk Emails */}
        <motion.div
          className="card-aru h-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-4 font-semibold text-foreground">Recent Bulk Emails</h3>
          <div className="space-y-4">
            {recentBulkEmails.map((email, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <p className="font-medium text-foreground line-clamp-1">{email.subject}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {email.recipients.toLocaleString()} recipients
                  </span>
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    email.status === "sent" 
                      ? "bg-emerald-500/10 text-emerald-500" 
                      : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {email.status === "sent" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {email.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{email.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
