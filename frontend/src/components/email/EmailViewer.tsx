import { motion, AnimatePresence } from "framer-motion";
import { 
  Reply, 
  ReplyAll, 
  Forward, 
  Trash2, 
  Star, 
  MoreVertical,
  Paperclip,
  Download,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Email } from "./EmailList";

interface EmailViewerProps {
  email: Email | null;
  onClose: () => void;
  onStar: (id: string) => void;
  onDelete: (id: string) => void;
  onReply: () => void;
}

export function EmailViewer({ email, onClose, onStar, onDelete, onReply }: EmailViewerProps) {
  if (!email) {
    return (
      <div className="flex flex-1 items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">Select an email to read</p>
          <p className="text-sm text-muted-foreground/70">Choose from your inbox on the left</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={email.id}
        className="flex flex-1 flex-col overflow-hidden bg-card"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onReply}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Reply className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ReplyAll className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Forward className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onStar(email.id)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className={cn(
                "h-5 w-5",
                email.isStarred && "fill-yellow-400 text-yellow-400"
              )} />
            </motion.button>
            <motion.button
              onClick={() => onDelete(email.id)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreVertical className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="mb-4 font-display text-2xl font-semibold text-foreground">
            {email.subject}
          </h1>

          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-semibold text-primary-foreground">
              {email.from.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{email.from}</span>
                <span className="text-sm text-muted-foreground">&lt;{email.fromEmail}&gt;</span>
              </div>
              <p className="text-sm text-muted-foreground">
                to me · {format(email.date, "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-foreground leading-relaxed">
              Dear Student,
            </p>
            <p className="text-foreground leading-relaxed">
              {email.preview}
            </p>
            <p className="text-foreground leading-relaxed">
              This is an important announcement from Ardhi University regarding the upcoming academic activities. 
              Please ensure you review all the attached documents and respond accordingly before the deadline.
            </p>
            <p className="text-foreground leading-relaxed">
              For any queries, please contact the relevant department or visit the AMIS portal for more information.
            </p>
            <p className="text-foreground leading-relaxed mt-6">
              Best regards,<br />
              <strong>{email.from}</strong><br />
              Ardhi University
            </p>
          </div>

          {/* Attachments */}
          {email.hasAttachment && (
            <div className="mt-8 rounded-lg border border-border p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Paperclip className="h-4 w-4" />
                Attachments (2)
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    PDF
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">Academic_Calendar_2024.pdf</p>
                    <p className="text-xs text-muted-foreground">245 KB</p>
                  </div>
                  <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    DOC
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">Registration_Form.docx</p>
                    <p className="text-xs text-muted-foreground">89 KB</p>
                  </div>
                  <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
