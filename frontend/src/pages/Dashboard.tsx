import { useMemo, useState, useReducer } from "react";
import { Header } from "@/components/email/Header";
import { Sidebar } from "@/components/email/Sidebar";
import { EmailList, type Email } from "@/components/email/EmailList";
import { EmailViewer } from "@/components/email/EmailViewer";
import { ComposeModal } from "@/components/email/ComposeModal";
import { Footer } from "@/components/layout/Footer";

// Sample email data which would typically come from an API
const sampleEmails: Email[] = [
  {
    id: "1",
    from: "Academic Registry",
    fromEmail: "registry@aru.ac.tz",
    subject: "Important: Semester Registration Deadline",
    preview:
      "Dear Student, This is to remind you that the deadline for semester registration is approaching...",
    date: new Date(2024, 11, 10),
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    label: "important",
  },
  {
    id: "2",
    from: "Dr. samia",
    fromEmail: "s.mwanza@aru.ac.tz",
    subject: "RE: Research Proposal Feedback",
    preview:
      "I have reviewed your research proposal and would like to schedule a meeting to discuss...",
    date: new Date(2024, 11, 9),
    isRead: false,
    isStarred: false,
    hasAttachment: true,
    label: "academic",
  },
  {
    id: "3",
    from: "ARUSO",
    fromEmail: "aruso@students.aru.ac.tz",
    subject: "Annual Sports Day - Registration Open",
    preview:
      "We are excited to announce that registration for the Annual Sports Day is now open...",
    date: new Date(2024, 11, 8),
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    label: "announcements",
  },
  // Add more emails as needed
];

type EmailAction =
  | { type: "STAR"; payload: string }
  | { type: "DELETE"; payload: string };

function emailsReducer(state: Email[], action: EmailAction): Email[] {
  switch (action.type) {
    case "STAR":
      return state.map((e) =>
        e.id === action.payload ? { ...e, isStarred: !e.isStarred } : e
      );
    case "DELETE":
      return state.filter((e) => e.id !== action.payload);
    default:
      return state;
  }
}

export default function Dashboard() {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  const [emails, dispatch] = useReducer(emailsReducer, sampleEmails);

  const selectedEmail = useMemo(
    () => emails.find((e) => e.id === selectedEmailId) || null,
    [emails, selectedEmailId]
  );

  const handleStarEmail = (id: string) => {
    dispatch({ type: "STAR", payload: id });
  };

  const handleDeleteEmail = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
    setSelectedEmailId(null);
  };

  const filteredEmails =
    activeFolder === "starred" ? emails.filter((e) => e.isStarred) : emails;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* HEADER */}
      <div className="flex-shrink-0">
        <Header />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar
          activeFolder={activeFolder}
          onFolderChange={setActiveFolder}
          onCompose={() => setShowCompose(true)}
        />

        {/* EMAIL AREA */}
        <div className="flex flex-1 overflow-hidden">
          {/* EMAIL LIST */}
          <div className="w-full max-w-md md:w-96 border-r border-border bg-card/50 flex flex-col">
            {/* Folder Header */}
            <div className="flex h-14 items-center justify-between border-b border-border px-4 flex-shrink-0">
              <h2 className="font-semibold capitalize text-foreground">
                {activeFolder}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredEmails.length} messages
              </span>
            </div>

            {/* Scrollable Email List */}
            <div className="flex-1 overflow-y-auto">
              <EmailList
                emails={filteredEmails}
                selectedId={selectedEmailId}
                onSelect={setSelectedEmailId}
                onStar={handleStarEmail}
              />
            </div>
          </div>

          {/* EMAIL VIEWER */}
          <div className="flex-1 overflow-y-auto">
            <EmailViewer
              email={selectedEmail}
              onClose={() => setSelectedEmailId(null)}
              onStar={handleStarEmail}
              onDelete={handleDeleteEmail}
              onReply={() => setShowCompose(true)}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex-shrink-0">
        <Footer />
      </div>

      {/* COMPOSE MODAL */}
      <ComposeModal
        isOpen={showCompose}
        onClose={() => setShowCompose(false)}
      />
    </div>
  );
}
