import { Header } from "@/components/email/Header";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
// Help & Support Page Component
export default function HelpSupport() {
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

        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>How to reset password?</li>
              <li>How to update email?</li>
              <li>How to manage notifications?</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
            <p>Email: support@aru.ac.tz</p>
            <p>Phone: +255 123 456 789</p>
            <p>Office Hours: Mon - Fri, 08:00 - 17:00</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Guides & Tutorials</h2>
          <p>Check our knowledge base and tutorials for detailed guidance on using CampusMail.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
