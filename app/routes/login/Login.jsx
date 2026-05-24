import * as React from "react";
import { LoginBackground, WelcomeText, LoginForm } from "./components";
import { APP_VERSION } from "./constants";

export default function Login() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#1a1f36] flex items-center justify-center p-4 md:p-8 font-sans">
      <LoginBackground />

      <div className="container max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 px-6">
        <WelcomeText />
        <LoginForm />
      </div>

      {/* Version Footer */}
      <div className="absolute bottom-6 right-8 text-white/25 text-xs font-medium tracking-wider uppercase">
        {APP_VERSION}
      </div>
    </div>
  );
}
