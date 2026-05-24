import * as React from "react";
import { Label, Input } from "@/components/ui";
import { Globe, Upload } from "lucide-react";

export function TenantProfile({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tenant Name</Label>
          <Input 
            id="name" 
            placeholder="e.g. Acme Corp" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand_name">Brand Name</Label>
          <Input 
            id="brand_name" 
            placeholder="e.g. Acme" 
            value={formData.brand_name} 
            onChange={(e) => setFormData({...formData, brand_name: e.target.value})}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="domain">Domain</Label>
          <div className="flex">
            <div className="bg-slate-50 border border-r-0 border-slate-200 px-3 flex items-center text-slate-400 rounded-l-md">
              <Globe size={14} />
            </div>
            <Input 
              id="domain" 
              className="rounded-l-none" 
              placeholder="acme.example.com" 
              value={formData.domain} 
              onChange={(e) => setFormData({...formData, domain: e.target.value})}
            />
          </div>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Logo</Label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors mb-3">
              <Upload size={20} />
            </div>
            <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG or SVG (max. 2MB)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
