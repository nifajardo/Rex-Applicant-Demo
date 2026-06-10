import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Settings,
  LogOut,
  Menu,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { motion } from "framer-motion";

const Header = ({ onLogout, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold hidden sm:block">CGB Scholarship</h1>
          <h1 className="text-xl font-semibold sm:hidden">CGB</h1>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <nav className="hidden md:flex items-center gap-2">
          <Link to="/guide">
            <Button variant="outline" size="icon" title="View Application Guide">
              <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-border mx-2" />
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </nav>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t bg-background"
        >
          <div className="container py-4 space-y-2">
            <Link to="/guide" className="block">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookOpen className="h-5 w-5 mr-2" />
                View Guide
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <div className="border-t my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;