 
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Home, Table2, Layers, FileText } from "lucide-react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { ChatWidget } from "./ChatWidget";

interface MainLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, disabled: false },
  { to: "/medications", label: "Tables", icon: Table2, disabled: false },
  { to: "#", label: "Process", icon: Layers, disabled: true },
  { to: "#", label: "Documentation", icon: FileText, disabled: true },
];

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_profile");
    navigate({ to: "/login" });
  };

  const renderNavLinks = () =>
    NAV_ITEMS.map((item) => {
      const Icon = item.icon;

      if (item.disabled) {
        return (
          <div
            key={item.label}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 dark:text-slate-600 cursor-not-allowed px-3 py-1.5"
          >
            <Icon className="w-4.5 h-4.5" />
            <span>{item.label}</span>
          </div>
        );
      }

      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={() => setIsMobileMenuOpen(false)}
          activeProps={{
            className:
              "text-blue-600 dark:text-blue-400 font-bold bg-blue-50/60 dark:bg-blue-500/10 rounded-lg px-3 py-1.5 w-full lg:w-auto",
          }}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg px-3 py-1.5 transition duration-150"
        >
          <Icon className="w-4.5 h-4.5" />
          <span>{item.label}</span>
        </Link>
      );
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-200 relative">
      <Header
        theme={theme}
        setTheme={setTheme}
        handleLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={NAV_ITEMS}
        renderLinks={renderNavLinks}
      />

      <MobileNav isOpen={isMobileMenuOpen} renderLinks={renderNavLinks} />

      <main className="flex-1 py-5 px-4 sm:px-8 max-w-full w-full mx-auto min-w-0">
        {children}
      </main>

      <ChatWidget />
    </div>
  );
}
