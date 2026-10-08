import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/email/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AnalyticsOverview } from "@/components/admin/AnalyticsOverview";
import { EmailStatistics } from "@/components/admin/EmailStatistics";
import { UserActivity } from "@/components/admin/UserActivity";
import { DepartmentAnnouncements } from "@/components/admin/DepartmentAnnouncements";
import { BulkEmail } from "@/components/admin/BulkEmail";
import { UserManagement } from "@/components/admin/UserManagement";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AnalyticsOverview />;
      case "statistics":
        return <EmailStatistics />;
      case "users":
        return <UserManagement />;
      case "activity":
        return <UserActivity />;
      case "announcements":
        return <DepartmentAnnouncements />;
      case "bulk-email":
        return <BulkEmail />;
      default:
        return <AnalyticsOverview />;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
