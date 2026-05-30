import {
  Monitor,
  Layout,
  Book,
  Shield,
  UserPlus,
  MessageSquare,
  ShoppingBag,
  Search,
  Info,
  Lock,
  CheckCircle2,
} from "lucide-react";

export const CREATE_TENANT_STEPS = {
  TENANT_PROFILE: "Tenant Profile",
  CONTACT_DETAILS: "Contact Details",
  BRAND_CONFIGURATION: "Brand Configuration",
  ACCESS_CONTROL: "Access Control",
  STATUS_MANAGEMENT: "Status Management",
  PLAN_MANAGEMENT: "Plan Management",
  ADMINISTRATOR_ACCOUNT: "Administrator Account",
};

export const FAVICON_FIELDS = [
  { key: "favicon", label: "favicon.ico" },
  { key: "favicon-32x32", label: "favicon-32x32.png" },
  { key: "favicon-16x16", label: "favicon-16x16.png" },
  { key: "apple-touch-icon", label: "apple-touch-icon.png" },
  { key: "android-chrome-512x512", label: "android-chrome-512x512.png" },
  { key: "android-chrome-192x192", label: "android-chrome-192x192.png" },
];

export const EMPTY_FAVICONS = FAVICON_FIELDS.reduce((acc, { key }) => {
  acc[key] = null;
  return acc;
}, {});

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
  {
    value: "0",
    label: "Pending",
    description: "Tenant is created but not yet active.",
    color: "bg-amber-500",
  },
  {
    value: "1",
    label: "Active",
    description: "Tenant is fully operational and live.",
    color: "bg-emerald-500",
  },
];

export const PRIMARY_COLOR_TYPES = ["main", "mid", "deep", "soft"];

export const TIP_THEMES = {
  blue: {
    card: "bg-blue-50 border-blue-100",
    icon: "bg-blue-500",
    title: "text-blue-900",
    text: "text-blue-700/80",
  },
  purple: {
    card: "bg-purple-50 border-purple-100",
    icon: "bg-purple-500",
    title: "text-purple-900",
    text: "text-purple-700/80",
  },
  emerald: {
    card: "bg-emerald-50 border-emerald-100",
    icon: "bg-emerald-500",
    title: "text-emerald-900",
    text: "text-emerald-700/80",
  },
};

export const CREATE_TENANT_TIPS = [
  {
    theme: "blue",
    icon: Info,
    title: "Getting started",
    text: "Save each section as you go. You can return later and pick up where you left off.",
  },
  {
    theme: "purple",
    icon: Lock,
    title: "Administrators",
    text: "Master and head admin accounts are set up in the last section.",
  },
  {
    theme: "emerald",
    icon: CheckCircle2,
    title: "Brand assets",
    text: "Set your brand colors first, then upload favicons and your animated logo.",
    className: "sm:col-span-2 lg:col-span-1",
  },
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
    c1r1: "#f472b6",
    c1r2: "#ec4899",
    c1r3: "#db2777",
    c2r1: "#fbbf24",
    c2r2: "#f59e0b",
    c2r3: "#d97706",
    c2r4: "#b45309",
    c2r5: "#92400e",
    c2r6: "#78350f",
  },
  favicons: { ...EMPTY_FAVICONS },
  anims: null,
  access_control: {
    ENABLE_MOBILE_APP_MODAL: false,
    ENABLE_DARK_MODE: true,
    ENABLE_BOOKSHOP: false,
    ENABLE_PARALLEL_MODULES: false,
    ENABLE_SPONSOR_EDUCATION: false,
    ENABLE_SOCIAL_SIGNUP: true,
    ENABLE_WHATSAPP_COMM: false,
    whatsapp_comm_number: "",
    ENABLE_LMS_PURCHASE_FLOW: false,
    ENABLE_PHYSICAL_PRODUCT_PURCHASES: false,
    ENABLE_DIGITAL_PRODUCT_PURCHASES: false,
    ENABLE_EXTERNAL_MERCHANDISE_MODULE: false,
    external_merchandise_module_link: "",
    ENABLE_GLOBAL_SEARCH: true,
  },
  status: "0",
  plan: "0",
  master_admin: { first_name: "", last_name: "", email: "", username: "" },
  head_admins: [
    { first_name: "", last_name: "", email: "", username: "" },
    { first_name: "", last_name: "", email: "", username: "" },
  ],
};

export const TENANT_CREATION_STEPS = [
  { id: "tenant-profile", label: CREATE_TENANT_STEPS.TENANT_PROFILE, completed: false },
  { id: "contact-details", label: CREATE_TENANT_STEPS.CONTACT_DETAILS, completed: false },
  { id: "brand-configuration", label: CREATE_TENANT_STEPS.BRAND_CONFIGURATION, completed: false },
  { id: "access-control", label: CREATE_TENANT_STEPS.ACCESS_CONTROL, completed: false },
  { id: "status-management", label: CREATE_TENANT_STEPS.STATUS_MANAGEMENT, completed: false },
  { id: "plan-management", label: CREATE_TENANT_STEPS.PLAN_MANAGEMENT, completed: false },
  {
    id: "administrator-account",
    label: CREATE_TENANT_STEPS.ADMINISTRATOR_ACCOUNT,
    completed: false,
  },
];
