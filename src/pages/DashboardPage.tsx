import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  UserIcon,
  ShieldIcon,
  HeartIcon,
  LogOutIcon,
} from "lucide-react";
import { ProfileSettings } from "../components/dashboard/ProfileSettings";
import { SecuritySettings } from "../components/dashboard/SecuritySettings";
import { FavoriteCourts } from "../components/dashboard/FavoriteCourts";
import { useAuth } from "../context/AuthContext";

type TabType = "profile" | "security" | "favorites";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const TABS = [
    {
      id: "profile",
      label: "Profile Settings",
      icon: UserIcon,
    },
    {
      id: "security",
      label: "Password & Security",
      icon: ShieldIcon,
    },
    {
      id: "favorites",
      label: "Favorite Courts",
      icon: HeartIcon,
    },
  ];

  return (
    <div className="flex-1 flex flex-col pt-24">
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar sticky top-24">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${isActive ? "bg-white text-brand-coral shadow-sm border border-brand-border/50" : "text-brand-slate hover:text-brand-navy hover:bg-brand-border/30 border border-transparent"}`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-brand-coral" : "text-brand-slate"}`}
                  />

                  {tab.label}
                </button>
              );
            })}

            <div className="hidden md:block w-full h-px bg-brand-border my-4" />

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all border border-transparent"
            >
              <LogOutIcon className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && <ProfileSettings key="profile" />}
            {activeTab === "security" && <SecuritySettings key="security" />}
            {activeTab === "favorites" && <FavoriteCourts key="favorites" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
