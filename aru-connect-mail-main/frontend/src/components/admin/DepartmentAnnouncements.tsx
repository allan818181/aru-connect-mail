//page thart allows admin to create, edit, delete department announcements
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar,
  Building2,
  Users,
  X,
  Send,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  content: string;
  department: string;
  audience: string;
  createdAt: Date;
  status: "draft" | "published" | "scheduled";
  views: number;
}
// Initial dummy data for announcements which can be replaced with real data from backend
const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Semester Registration Deadline Extended",
    content: "The deadline for semester registration has been extended to December 20th, 2024.",
    department: "Academic Registry",
    audience: "All Students",
    createdAt: new Date(2024, 11, 10),
    status: "published",
    views: 2847,
  },
  {
    id: "2",
    title: "Library Operating Hours During Exams",
    content: "The university library will have extended hours during the examination period.",
    department: "Library Services",
    audience: "All Users",
    createdAt: new Date(2024, 11, 8),
    status: "published",
    views: 1523,
  },
  {
    id: "3",
    title: "System Maintenance - December 15",
    content: "Scheduled maintenance will occur on December 15th from 00:00 to 06:00 EAT.",
    department: "IT Department",
    audience: "All Users",
    createdAt: new Date(2024, 11, 6),
    status: "scheduled",
    views: 0,
  },
  {
    id: "4",
    title: "Research Grant Applications Now Open",
    content: "Faculty members can now apply for the 2025 research grant program.",
    department: "Research Office",
    audience: "Lecturers",
    createdAt: new Date(2024, 11, 5),
    status: "draft",
    views: 0,
  },
];

const departments = [
  "Academic Registry",
  "IT Department",
  "Library Services",
  "Finance Office",
  "Research Office",
  "Dean of Students",
  "All Departments",
];

const audiences = [
  "All Users",
  "All Students",
  "Lecturers",
  "Staff Only",
  "First Year Students",
  "Final Year Students",
];

export function DepartmentAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    department: "",
    audience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ title: "", content: "", department: "", audience: "" });
    setShowModal(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      department: announcement.department,
      audience: announcement.audience,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been removed.",
    });
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!formData.title || !formData.content || !formData.department || !formData.audience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingId) {
      setAnnouncements(announcements.map((a) =>
        a.id === editingId
          ? { ...a, ...formData, status }
          : a
      ));
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        status,
        views: 0,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }

    toast({
      title: status === "published" ? "Announcement Published!" : "Draft Saved",
      description: status === "published" 
        ? "Your announcement has been sent to the selected audience."
        : "Your announcement has been saved as a draft.",
    });

    setIsSubmitting(false);
    setShowModal(false);
  };

  const statusColors = {
    draft: "bg-muted text-muted-foreground",
    published: "bg-emerald-500/10 text-emerald-500",
    scheduled: "bg-amber-500/10 text-amber-500",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Department Announcements</h1>
          <p className="text-muted-foreground">Create and manage official announcements</p>
        </div>
        <motion.button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-5 w-5" />
          New Announcement
        </motion.button>
      </div>
       //thr announcements list how each announcement looks like
      {/* Announcements List */}
      <div className="grid gap-6 md:grid-cols-2">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            className="card-aru"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[announcement.status]}`}>
                    {announcement.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    {announcement.department}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {announcement.audience}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(announcement.createdAt, "MMM d, yyyy")}
                  </span>
                  {announcement.status === "published" && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {announcement.views.toLocaleString()} views
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(announcement)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
       //how the create/edit modal looks like 
      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-card"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-border p-4">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {editingId ? "Edit Announcement" : "Create Announcement"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4 p-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Announcement title"
                      className="input-aru"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="input-aru"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Audience</label>
                      <select
                        value={formData.audience}
                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                        className="input-aru"
                      >
                        <option value="">Select audience</option>
                        {audiences.map((aud) => (
                          <option key={aud} value={aud}>{aud}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your announcement..."
                      rows={4}
                      className="input-aru resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-border p-4">
                  <motion.button
                    onClick={() => handleSubmit("draft")}
                    disabled={isSubmitting}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Draft
                  </motion.button>
                  <motion.button
                    onClick={() => handleSubmit("published")}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-primary-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Publish
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
