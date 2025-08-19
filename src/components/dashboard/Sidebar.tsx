"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

const menuItems = [{ icon: Package, label: "Product Management", href: "/" }];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-blue-600 text-white flex flex-col">
      <div className="p-4 mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="w-8 h-8 bg-white rounded-full mr-2"></span>
          Logo
        </h1>
      </div>

      <nav className="flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 transition-colors relative w-full",
              pathname === item.href
                ? "bg-blue-700 text-white before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-white before:rounded-r-full"
                : "text-blue-100 hover:bg-blue-700 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
