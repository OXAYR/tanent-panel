import * as React from "react";
import { Card } from "@/components/ui";
import { CreditCard } from "lucide-react";

export function PlanManagement({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="max-w-md">
         <Card className="p-6 border-2 border-primary bg-primary/5">
           <div className="flex items-center justify-between mb-4">
             <div className="p-2 rounded-lg bg-primary text-white">
               <CreditCard size={20} />
             </div>
             <span className="px-2 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">Default</span>
           </div>
           <h4 className="text-xl font-bold text-slate-800">Free Plan</h4>
           <p className="text-sm text-slate-500 mt-2">Standard free tier plan for new tenants. Includes all basic features.</p>
           <div className="mt-6 pt-6 border-t border-primary/10">
             <div className="text-3xl font-bold text-primary">$0<span className="text-sm font-medium text-slate-400">/month</span></div>
           </div>
         </Card>
      </div>
    </div>
  );
}
