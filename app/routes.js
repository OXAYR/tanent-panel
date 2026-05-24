import { index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/login/index.jsx"),
  
  layout("routes/dashboard-layout.jsx", [
    route("dashboard", "routes/dashboard/index.jsx"),
    route("tenants", "routes/tenants/index.jsx"),
    route("create-tenant", "routes/create-tenant/index.jsx"),
    route("logs", "routes/logs/index.jsx"),
    route("settings", "routes/settings/index.jsx"),
  ]),
];
