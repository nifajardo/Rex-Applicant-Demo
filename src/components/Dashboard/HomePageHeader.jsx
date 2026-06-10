import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings } from "lucide-react";

const HomePageHeader = ({ userName, onLogout, onProfileClick, onSettingsClick }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white" style={{ borderBottom: '3px solid #c0242d', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo / Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={onProfileClick}
        >
          {/* Rex-style colored bar accent */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-1.5 rounded-full" style={{ background: '#c0242d' }} />
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c0242d', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
                REX Education Scholarship
              </div>
              <div className="text-base font-bold leading-tight" style={{ color: '#1a1a2e', fontFamily: 'Montserrat, sans-serif' }}>
                Online Application System
              </div>
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10" style={{ border: '2px solid #c0242d' }}>
                  <AvatarImage src={`https://api.dicebear.com/6/initials/svg?seed=${userName}`} alt={userName} />
                  <AvatarFallback style={{ background: '#c0242d', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>{userName}</p>
                  <p className="text-xs leading-none text-slate-500">Scholar Applicant</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" style={{ color: '#c0242d' }} />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" style={{ color: '#c0242d' }} />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" style={{ color: '#c0242d' }} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default HomePageHeader;
