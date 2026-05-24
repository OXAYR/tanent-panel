import * as React from "react";
import { Label, Input } from "@/components/ui";
import { Shield, UserPlus } from "lucide-react";

export function AdministratorAccount({ formData, setFormData }) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
            <Shield size={16} />
          </div>
          Master Administrator
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input 
              value={formData.master_admin.first_name}
              onChange={(e) => setFormData({...formData, master_admin: {...formData.master_admin, first_name: e.target.value}})}
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input 
              value={formData.master_admin.last_name}
              onChange={(e) => setFormData({...formData, master_admin: {...formData.master_admin, last_name: e.target.value}})}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              type="email"
              value={formData.master_admin.email}
              onChange={(e) => setFormData({...formData, master_admin: {...formData.master_admin, email: e.target.value}})}
            />
          </div>
          <div className="space-y-2">
            <Label>Username (Login)</Label>
            <div className="relative">
               <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
               <Input 
                 className="pl-9"
                 value={formData.master_admin.username}
                 onChange={(e) => setFormData({...formData, master_admin: {...formData.master_admin, username: e.target.value}})}
               />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <UserPlus size={16} />
          </div>
          Head Administrators
        </h4>
        
        <div className="grid grid-cols-1 gap-6">
          {[0, 1].map(index => (
            <div key={index} className="space-y-4 border-l-2 border-slate-100 pl-4 sm:pl-6 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Admin #{index + 1} {index === 0 && <span className="text-red-500 ml-1">(Required)</span>}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input 
                    value={formData.head_admins[index].first_name}
                    onChange={(e) => {
                      const newAdmins = [...formData.head_admins];
                      newAdmins[index].first_name = e.target.value;
                      setFormData({...formData, head_admins: newAdmins});
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input 
                    value={formData.head_admins[index].last_name}
                    onChange={(e) => {
                      const newAdmins = [...formData.head_admins];
                      newAdmins[index].last_name = e.target.value;
                      setFormData({...formData, head_admins: newAdmins});
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={formData.head_admins[index].email}
                    onChange={(e) => {
                      const newAdmins = [...formData.head_admins];
                      newAdmins[index].email = e.target.value;
                      setFormData({...formData, head_admins: newAdmins});
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input 
                    value={formData.head_admins[index].username}
                    onChange={(e) => {
                      const newAdmins = [...formData.head_admins];
                      newAdmins[index].username = e.target.value;
                      setFormData({...formData, head_admins: newAdmins});
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
