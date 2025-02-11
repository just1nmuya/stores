"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Category } from "@/types";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {/* Mobile-Only Enhancements */}
      <div className="lg:hidden grid grid-cols-2 gap-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium py-3 px-4 transition-all rounded-lg transform hover:scale-105 hover:shadow-lg",
              route.active
                ? "text-black bg-gray-100"
                : "text-neutral-500 hover:text-black hover:bg-gray-50"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>

      {/* Desktop View - Regular layout */}
      <div className="hidden lg:flex items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MainNav;
