import * as React from "react";
import { Label, Input, Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ACCESS_CONTROL_TOGGLES } from "../constants";

export function AccessControl({ formData, setFormData }) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACCESS_CONTROL_TOGGLES.map(toggle => (
          <div key={toggle.key} className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-primary/20 transition-colors">
            <div className={cn(
              "p-2 rounded-lg",
              formData.access_control[toggle.key] ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
            )}>
              {toggle.icon}
            </div>
            <div className="flex-1">
              <Label htmlFor={toggle.key} className="text-xs font-medium cursor-pointer">{toggle.label}</Label>
            </div>
            <Checkbox 
              id={toggle.key} 
              checked={formData.access_control[toggle.key]}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                access_control: { ...formData.access_control, [toggle.key]: checked }
              })}
            />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
         <div className="space-y-2">
           <Label htmlFor="WHATSAPP_COMM_NUMBER">WhatsApp Number</Label>
           <Input 
             id="WHATSAPP_COMM_NUMBER" 
             placeholder="+1234567890" 
             value={formData.access_control.WHATSAPP_COMM_NUMBER}
             onChange={(e) => setFormData({
               ...formData,
               access_control: { ...formData.access_control, WHATSAPP_COMM_NUMBER: e.target.value }
             })}
           />
         </div>
         <div className="space-y-2">
           <Label htmlFor="EXTERNAL_MERCHANDISE_MODULE_LINK">External Merch Link</Label>
           <Input 
             id="EXTERNAL_MERCHANDISE_MODULE_LINK" 
             placeholder="https://merch.example.com" 
             value={formData.access_control.EXTERNAL_MERCHANDISE_MODULE_LINK}
             onChange={(e) => setFormData({
               ...formData,
               access_control: { ...formData.access_control, EXTERNAL_MERCHANDISE_MODULE_LINK: e.target.value }
             })}
           />
         </div>
      </div>
    </div>
  );
}
