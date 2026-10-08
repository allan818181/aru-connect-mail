import { motion } from "framer-motion";
import { 
  Inbox, 
  Send, 
  FileText, 
  Trash2, 
  Star, 
  Edit3, 
  Tag,
  Archive
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeFolder: string;
  onFolderChange: (folder: string) => void;
  onCompose: () => void;
}

const folders = [
  { id: "inbox", name: "Inbox", icon: Inbox, count: 12 },
  { id: "starred", name: "Starred", icon: Star, count: 3 },
  { id: "sent", name: "Sent", icon: Send, count: 0 },
  { id: "drafts", name: "Drafts", icon: FileText, count: 2 },
  { id: "archive", name: "Archive", icon: Archive, count: 0 },
  { id: "trash", name: "Trash", icon: Trash2, count: 0 },
];

const labels = [
  { id: "important", name: "Important", color: "bg-destructive" },
  { id: "academic", name: "Academic", color: "bg-aru-teal" },
  { id: "announcements", name: "Announcements", color: "bg-secondary" },
];

export function Sidebar({ activeFolder, onFolderChange, onCompose }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-glow p-4">
      
      {/* Compose Button */}
      <motion.button
        onClick={onCompose}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Edit3 className="h-5 w-5" />
        Compose
      </motion.button>

      {/* Folders */}
      <nav className="flex-1 space-y-2">
        {folders.map((folder) => (
          <motion.button
            key={folder.id}
            onClick={() => onFolderChange(folder.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left font-medium transition-all",
              activeFolder === folder.id
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground hover:shadow-soft"
            )}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <folder.icon className="h-5 w-5" />
            <span className="flex-1">{folder.name}</span>
            {folder.count > 0 && (
              <span className={cn(
                "min-w-[24px] rounded-full px-2 py-0.5 text-center text-xs font-semibold",
                activeFolder === folder.id
                  ? "bg-white/30 text-white"
                  : "bg-muted text-muted-foreground"
              )}>
                {folder.count}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Labels */}
      <div className="border-t border-border mt-6 pt-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Tag className="h-4 w-4" />
          Labels
        </h3>
        <div className="space-y-2">
          {labels.map((label) => (
            <button
              key={label.id}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              <span className={cn("h-3 w-3 rounded-full", label.color)} />
              {label.name}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Info */}
      <div className="border-t border-border mt-auto pt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Storage</span>
          <span className="font-medium text-foreground">2.4 GB / 15 GB</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow"
            initial={{ width: 0 }}
            animate={{ width: `${(2.4 / 15) * 100}%` }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </div>
      </div>
    </aside>
  );
}
