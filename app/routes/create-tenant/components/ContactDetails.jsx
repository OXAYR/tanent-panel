import * as React from "react";
import { Label, Input } from "@/components/ui";
import { Mail, Phone } from "lucide-react";

export function ContactDetails({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea 
            id="description" 
            className="w-full min-h-[100px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            placeholder="Short description of the tenant..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_name">Contact Name</Label>
          <Input 
            id="contact_name" 
            placeholder="John Doe" 
            value={formData.contact_name} 
            onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <Input 
              id="contact_email" 
              className="pl-9" 
              placeholder="john@example.com" 
              value={formData.contact_email} 
              onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <Input 
              id="contact_phone" 
              className="pl-9" 
              placeholder="+1 (555) 000-0000" 
              value={formData.contact_phone} 
              onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
