import * as React from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from "@/components/ui";

export function LoginForm() {
  return (
    <div className="flex justify-center md:justify-end">
      <Card className="w-full max-w-[480px] p-8 md:p-12 rounded-2xl border-none bg-white shadow-2xl">
        <CardHeader className="text-center p-0 mb-10">
          <CardTitle className="text-2xl font-semibold text-slate-800">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-slate-400 text-xs font-medium ml-0.5">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="h-12"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-slate-400 text-xs font-medium ml-0.5">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-12"
            />
          </div>

          <Button className="w-full mt-2 h-12 text-base font-semibold shadow-lg shadow-primary/20">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
