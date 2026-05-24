import * as React from "react";
import { User } from "lucide-react";
import { Card, Button, Input, Label } from "@/components/ui";
import { ACCOUNT_INFO } from "../constants";

export function ProfileSection() {
  return (
    <Card className="p-6 rounded-xl border border-slate-100 max-w-2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-primary-500 border-2 border-slate-100 flex-shrink-0">
            <User size={36} />
          </div>
          <div className="text-center sm:text-left">
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-slate-500 text-xs font-medium">Full Name</Label>
            <Input 
              id="name" 
              value={ACCOUNT_INFO.name} 
              disabled 
              className="bg-slate-50/50 border-slate-100 text-slate-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-slate-500 text-xs font-medium">Email Address</Label>
            <Input 
              id="email" 
              value={ACCOUNT_INFO.email} 
              disabled 
              className="bg-slate-50/50 border-slate-100 text-slate-700"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">Note: Name and Email can only be updated by the System Administrator.</p>
        </div>
      </div>
    </Card>
  );
}
