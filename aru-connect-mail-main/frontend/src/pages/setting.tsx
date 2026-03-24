import { Header } from "@/components/email/Header";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Setting() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-auto p-6 space-y-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-foreground">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p>Change password, update email, and manage account preferences.</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <p>Manage email notifications, alerts, and other preferences.</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
          <p>Two-factor authentication, data privacy, and security preferences.</p>
          <p>contact the cr for more information</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
