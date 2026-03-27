import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { AuthHero } from "../components/AuthHero";
import { AuthForm } from "../components/AuthForm";

export function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex w-full bg-brand-offWhite font-sans selection:bg-brand-coral/20 selection:text-brand-navy">
      {/* Left Panel - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] relative">
        <AuthHero />
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-brand-slate hover:text-brand-navy transition-colors font-medium z-10"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Back to home</span>
        </button>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 mt-12 sm:mt-0">
          <AuthForm
            mode={activeTab}
            onToggleMode={() =>
              setActiveTab(activeTab === "login" ? "register" : "login")
            }
            onLoginSuccess={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
}
