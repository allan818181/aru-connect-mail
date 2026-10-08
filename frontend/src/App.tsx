import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import "./App.css";
import Profile from "./pages/profile";
import Setting from "./pages/setting";
import HelpSupport from "./pages/Help&support";  


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
