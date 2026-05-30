import { TrendingUp, Users, ShieldCheck, Bell } from "lucide-react";

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const CHART_VALUES = [85, 92, 88, 95, 91, 94, 98, 96, 99, 97, 98, 100];

export const DASHBOARD_STATS = [
  { title: "Total Revenue", value: "$1.2M", trend: "+24%", icon: <TrendingUp size={18} className="text-emerald-500" /> },
  { title: "Global Tenants", value: "842", trend: "+12%", icon: <Users size={18} className="text-blue-500" /> },
  { title: "Active Systems", value: "12", trend: "100%", icon: <ShieldCheck size={18} className="text-primary-500" /> },
  { title: "Security Alerts", value: "0", trend: "Clear", icon: <Bell size={18} className="text-emerald-500" /> },
];
