import * as React from "react";
import { Bell, User, LogOut, Menu } from "lucide-react";
import { Card } from "@/components/ui";

export function Navbar({ 
  activePrimary, 
  setIsMobileMenuOpen, 
  setShowProfileMenu, 
  showProfileMenu 
}) {
  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6 z-40 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger for Mobile */}
        <button 
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:bg-slate-50 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(true);
          }}
        >
          <Menu size={20} />
        </button>
        <h2 className="text-sm font-semibold text-slate-700">
          {activePrimary}
        </h2>
      </div>
      
      <div className="flex items-center gap-3 relative">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg relative transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-2 pl-3 border-l border-slate-100 relative">
          <button 
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu(!showProfileMenu);
            }}
          >
            <User size={16} />
          </button>

          {/* Profile Popover */}
          {showProfileMenu && (
            <Card className="absolute top-[calc(100%+8px)] right-0 w-52 p-1.5 shadow-lg border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-sm font-medium text-slate-800">Sheeraz Abbas</p>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <LogOut size={14} />
                <span className="font-medium">Logout</span>
              </button>
            </Card>
          )}
        </div>
      </div>
    </header>
  );
}
