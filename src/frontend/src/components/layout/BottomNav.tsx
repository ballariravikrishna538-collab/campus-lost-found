import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Home, Search, User } from "lucide-react";

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  ocid: string;
}

const navItems: NavItem[] = [
  { path: "/", icon: Home, label: "Home", ocid: "nav.home_link" },
  { path: "/search", icon: Search, label: "Search", ocid: "nav.search_link" },
  {
    path: "/notifications",
    icon: Bell,
    label: "Notifications",
    ocid: "nav.notifications_link",
  },
  { path: "/profile", icon: User, label: "Profile", ocid: "nav.profile_link" },
];

interface BottomNavProps {
  unreadCount?: number;
}

export function BottomNav({ unreadCount = 0 }: BottomNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label, ocid }) => {
          const isActive =
            path === "/" ? currentPath === "/" : currentPath.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              data-ocid={ocid}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-smooth"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-smooth ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                {label === "Notifications" && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-smooth ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
