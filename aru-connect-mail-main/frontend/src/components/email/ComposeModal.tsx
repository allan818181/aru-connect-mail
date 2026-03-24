import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  Paperclip, 
  Bold, 
  Italic, 
  Underline, 
  List,
  Link2,
  Image,
  Loader2,
  LucideProps
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Component ndogo kwa ajili ya input za wapokeaji
const RecipientInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; }) => (
  <div className="flex items-center border-b border-border px-4 py-2">
    <span className="w-12 text-sm text-muted-foreground">{label}</span>
    <input
      type="email"
      name={label.toLowerCase()}
      value={value}
      onChange={onChange}
      className="flex-1 bg-transparent text-sm text-foreground outline-none"
    />
  </div>
);

// Orodha ya icons za toolbar
const toolbarIcons: React.FC<LucideProps>[] = [Bold, Italic, Underline, List, Link2, Image];

export function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = async () => {
    if (!formData.to || !formData.subject) {
      toast({
        title: "Error",
        description: "Please fill in recipient and subject fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "Your email has been sent successfully.",
    });

    setIsSending(false);
    setFormData({ to: "", cc: "", bcc: "", subject: "", body: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed z-50 ${
            isFullscreen 
              ? "inset-4" 
              : isMinimized 
                ? "bottom-0 right-4 w-80" 
                : "bottom-0 right-4 w-[560px]"
          }`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className={`flex flex-col overflow-hidden rounded-t-xl border border-border bg-card/80 backdrop-blur-xl shadow-glow ${
            isFullscreen ? "h-full rounded-xl" : isMinimized ? "" : "h-[500px]"
          }`}>
            
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary px-4 py-3 shadow-glow">
              <h3 className="font-display text-sm font-semibold text-primary-foreground">New Message</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-white"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="rounded p-1 text-primary-foreground/80 transition-colors hover:bg-destructive hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Fields */}
                <div className="border-b border-border">
                  <div className="flex items-center border-b border-border px-4 py-2">
                    <span className="w-12 text-sm text-muted-foreground">To</span>
                    <input
                      name="to"
                      type="email"
                      value={formData.to}
                      onChange={handleChange}
                      placeholder="recipient@aru.ac.tz"
                      className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                    <div className="flex gap-2">
                      {!showCc && (
                        <button
                          onClick={() => setShowCc(true)}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Cc
                        </button>
                      )}
                      {!showBcc && (
                        <button
                          onClick={() => setShowBcc(true)}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Bcc
                        </button>
                      )}
                    </div>
                  </div>

                  {showCc && <RecipientInput label="Cc" value={formData.cc} onChange={handleChange} />}
                  {showBcc && <RecipientInput label="Bcc" value={formData.bcc} onChange={handleChange} />}

                  <div className="flex items-center px-4 py-2">
                    <span className="w-16 text-sm text-muted-foreground">Subject:</span>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1 border-b border-border px-4 py-2">
                  {toolbarIcons.map((Icon, idx) => (
                    <button
                      key={idx}
                      className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div className="flex-1 p-4">
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="h-full w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border p-4">
                  <motion.button
                    onClick={handleSend}
                    disabled={isSending}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2 font-medium text-primary-foreground shadow-soft transition-all hover:shadow-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSending ? "Sending..." : "Send"}
                  </motion.button>

                  <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Paperclip className="h-4 w-4" />
                    Attach
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
