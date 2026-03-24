import { Header } from "@/components/email/Header";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-auto p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-foreground">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> Mpambije</p>
              <p><strong>Email:</strong> mpambije@aru.ac.tz</p>
              <p><strong>Role:</strong> Student</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-2">
              <p><strong>Phone:</strong> +255 123 456 789</p>
              <p><strong>Address:</strong> Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
          <p>Joined: 1st Jan 2024</p>
          <p>Department: School of Architecture</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
