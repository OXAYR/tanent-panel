import Login from "./Login";
import { redirectIfAuthenticatedClientLoader } from "@/lib/route-auth";

export function meta() {
  return [
    { title: "Super Admin - Sign In" },
    { name: "description", content: "Sign in to Super Admin portal" },
  ];
}

export const clientLoader = redirectIfAuthenticatedClientLoader;

export default Login;
