import { Sun, Moon, Bell, Grid, Menu, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  disabled: boolean;
}

interface HeaderProps {
  theme: string;
  setTheme: (theme: "light" | "dark") => void;
  handleLogout: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  navItems: NavItem[];
  renderLinks: () => React.ReactNode;
}

export function Header({
  theme,
  setTheme,
  handleLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  renderLinks,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-40 h-16 px-4 sm:px-8 flex items-center transition-colors duration-200">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer transition"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      <nav className="hidden lg:flex items-center gap-8 md:ml-[20%]">
        {renderLinks()}
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-9 h-9 rounded-full bg-orange-50 dark:bg-slate-700 flex items-center justify-center text-orange-500 dark:text-yellow-400 hover:bg-orange-100 dark:hover:bg-slate-600 transition duration-200 cursor-pointer"
          title={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        >
          {theme === "light" ? (
            <Sun className="w-4.5 h-4.5" />
          ) : (
            <Moon className="w-4.5 h-4.5" />
          )}
        </button>

        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition relative p-1">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>

        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition p-1">
          <Grid className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-100 dark:border-slate-700 h-8">
          <img
            src="https://dummyjson.com/icon/emilys/128"
            alt="User"
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 dark:border-slate-600 object-cover"
          />
          <button
            onClick={handleLogout}
            className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium ml-1 transition"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
