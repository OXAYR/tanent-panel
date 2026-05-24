import * as React from "react";
import { 
  Monitor, 
  Layout, 
  Book, 
  Shield, 
  UserPlus, 
  MessageSquare, 
  ShoppingBag, 
  Search 
} from "lucide-react";

export const ACCESS_CONTROL_TOGGLES = [
  { key: "ENABLE_MOBILE_APP_MODAL", label: "Mobile App Modal", icon: <Monitor size={14} /> },
  { key: "ENABLE_DARK_MODE", label: "Dark Mode Support", icon: <Layout size={14} /> },
  { key: "ENABLE_BOOKSHOP", label: "Bookshop Module", icon: <Book size={14} /> },
  { key: "ENABLE_PARALLEL_MODULES", label: "Parallel Modules", icon: <Shield size={14} /> },
  { key: "ENABLE_SPONSOR_EDUCATION", label: "Sponsor Education", icon: <Shield size={14} /> },
  { key: "ENABLE_SOCIAL_SIGNUP", label: "Social Signup", icon: <UserPlus size={14} /> },
  { key: "ENABLE_WHATSAPP_COMM", label: "WhatsApp Communication", icon: <MessageSquare size={14} /> },
  { key: "ENABLE_LMS_PURCHASE_FLOW", label: "LMS Purchase Flow", icon: <ShoppingBag size={14} /> },
  { key: "ENABLE_PHYSICAL_PRODUCT_PURCHASES", label: "Physical Products", icon: <ShoppingBag size={14} /> },
  { key: "ENABLE_DIGITAL_PRODUCT_PURCHASES", label: "Digital Products", icon: <ShoppingBag size={14} /> },
  { key: "ENABLE_EXTERNAL_MERCHANDISE_MODULE", label: "External Merchandise", icon: <ShoppingBag size={14} /> },
  { key: "ENABLE_GLOBAL_SEARCH", label: "Global Search", icon: <Search size={14} /> },
];

export const STATUS_OPTIONS = [
  { value: "0", label: "Pending", description: "Tenant is created but not yet active.", color: "bg-amber-500" },
  { value: "1", label: "Active", description: "Tenant is fully operational and live.", color: "bg-emerald-500" }
];

export const INITIAL_FORM_DATA = {
  logo: null,
  name: "",
  brand_name: "",
  domain: "",
  description: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  primary_main: "#6366f1",
  primary_mid: "#818cf8",
  primary_deep: "#4f46e5",
  primary_soft: "#e0e7ff",
  secondary_colors: {
    c1r1: "#f472b6", c1r2: "#ec4899", c1r3: "#db2777",
    c2r1: "#fbbf24", c2r2: "#f59e0b", c2r3: "#d97706",
    c2r4: "#b45309", c2r5: "#92400e", c2r6: "#78350f"
  },
  favicons: null,
  anims: null,
  access_control: {
    ENABLE_MOBILE_APP_MODAL: false,
    ENABLE_DARK_MODE: true,
    ENABLE_BOOKSHOP: false,
    ENABLE_PARALLEL_MODULES: false,
    ENABLE_SPONSOR_EDUCATION: false,
    ENABLE_SOCIAL_SIGNUP: true,
    ENABLE_WHATSAPP_COMM: false,
    WHATSAPP_COMM_NUMBER: "",
    ENABLE_LMS_PURCHASE_FLOW: false,
    ENABLE_PHYSICAL_PRODUCT_PURCHASES: false,
    ENABLE_DIGITAL_PRODUCT_PURCHASES: false,
    ENABLE_EXTERNAL_MERCHANDISE_MODULE: false,
    EXTERNAL_MERCHANDISE_MODULE_LINK: "",
    ENABLE_GLOBAL_SEARCH: true,
  },
  status: "0",
  plan: "0",
  master_admin: { first_name: "", last_name: "", email: "", username: "" },
  head_admins: [
    { first_name: "", last_name: "", email: "", username: "" },
    { first_name: "", last_name: "", email: "", username: "" }
  ]
};

export const TENANT_CREATION_STEPS = [
  { id: "tenant-profile", label: "Tenant Profile", completed: false, disabled: false },
  { id: "contact-details", label: "Contact Details", completed: false, disabled: true },
  { id: "brand-configuration", label: "Brand Configuration", completed: false, disabled: true },
  { id: "access-control", label: "Access Control", completed: false, disabled: true },
  { id: "status-management", label: "Status Management", completed: false, disabled: true },
  { id: "plan-management", label: "Plan Management", completed: false, disabled: true },
  { id: "administrator-account", label: "Administrator Account", completed: false, disabled: true },
];

export const PRIMARY_COLOR_TYPES = ["main", "mid", "deep", "soft"];

