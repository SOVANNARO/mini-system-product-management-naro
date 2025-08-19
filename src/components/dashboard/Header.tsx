"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const Header = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const response = await fetch("https://api.github.com/users/SOVANNARO");
        const data = await response.json();
        setAvatarUrl(data.avatar_url);
        setUserName(data.name || data.login);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    fetchGitHubProfile();
  }, []);

  return (
    <header className="h-16 bg-white border-b px-4 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">Product</h1>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            4
          </span>
        </div>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
