import * as React from "react";
import { Label, Input } from "@/components/ui";
import { Palette } from "lucide-react";
import { PRIMARY_COLOR_TYPES } from "../constants";

export function BrandConfiguration({ formData, setFormData }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Palette size={16} className="text-primary" />
          Primary Colors
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIMARY_COLOR_TYPES.map(type => (
            <div key={type} className="space-y-2">
              <Label className="text-[10px] uppercase text-slate-400">{type}</Label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  className="w-8 h-8 rounded cursor-pointer border-none p-0"
                  value={formData[`primary_${type}`]}
                  onChange={(e) => setFormData({...formData, [`primary_${type}`]: e.target.value})}
                />
                <Input 
                  value={formData[`primary_${type}`]} 
                  onChange={(e) => setFormData({...formData, [`primary_${type}`]: e.target.value})}
                  className="text-xs uppercase"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700">Secondary Colors</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.keys(formData.secondary_colors).map(key => (
            <div key={key} className="space-y-1">
              <Label className="text-[9px] uppercase text-slate-400">{key}</Label>
              <input 
                type="color" 
                className="w-full h-10 rounded-lg cursor-pointer border-2 border-white shadow-sm"
                value={formData.secondary_colors[key]}
                onChange={(e) => setFormData({
                  ...formData, 
                  secondary_colors: {...formData.secondary_colors, [key]: e.target.value}
                })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div className="space-y-2">
          <Label>Favicon</Label>
          <div className="h-20 border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 text-xs text-slate-400">
            Upload Favicon
          </div>
        </div>
        <div className="space-y-2">
          <Label>Animated Logo (JSON)</Label>
          <div className="h-20 border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 text-xs text-slate-400">
            Upload Lottie JSON
          </div>
        </div>
      </div>
    </div>
  );
}
