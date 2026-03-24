import { motion, AnimatePresence } from "framer-motion";
import { Star, Paperclip, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  label?: "important" | "academic" | "announcements";
}

interface EmailListProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onStar: (id: string) => void;
}

const labelColors = {
  important: "bg-destructive",
  academic: "bg-primary",
  announcements: "bg-secondary",
};

export function EmailList({ emails, selectedId, onSelect, onStar }: EmailListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence>
        {emails.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <button
              onClick={() => onSelect(email.id)}
              className={cn(
                "flex w-full items-start gap-4 border-b border-border px-4 py-3 text-left transition-colors",
                selectedId === email.id
                  ? "bg-accent"
                  : "hover:bg-accent/50",
                !email.isRead && "bg-accent/30"
              )}
            >
              {/* Unread indicator */}
              <div className="flex flex-col items-center gap-2 pt-1">
                {!email.isRead && (
                  <Circle className="h-2 w-2 fill-primary text-primary" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStar(email.id);
                  }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      email.isStarred && "fill-yellow-400 text-yellow-400"
                    )}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "truncate text-sm",
                    !email.isRead ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}>
                    {email.from}
                  </span>
                  {email.label && (
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      labelColors[email.label]
                    )} />
                  )}
                </div>
                <p className={cn(
                  "truncate text-sm",
                  !email.isRead ? "font-medium text-foreground" : "text-foreground"
                )}>
                  {email.subject}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {email.preview}
                </p>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  "whitespace-nowrap text-xs",
                  !email.isRead ? "font-semibold text-primary" : "text-muted-foreground"
                )}>
                  {format(email.date, "MMM d")}
                </span>
                {email.hasAttachment && (
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
