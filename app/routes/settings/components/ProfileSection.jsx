import { User } from "lucide-react";
import { Card, Input, Label } from "@/components/ui";
import { useMeQuery } from "@/store/api/authApi";
import { getProfileDisplayName } from "../utils/user";

export function ProfileSection() {
  const { data: user, isLoading, isError } = useMeQuery();

  const name = getProfileDisplayName(user);
  const email = user?.email ?? user?.login ?? "";

  return (
    <Card className="p-6 rounded-xl border border-slate-100 max-w-2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-primary-500 border-2 border-slate-100 flex-shrink-0">
            <User size={36} />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-slate-700">Profile photo</p>
            <p className="text-xs text-slate-400 mt-1">View only — managed by your administrator.</p>
          </div>
        </div>

        {isLoading && (
          <p className="text-sm text-slate-400">Loading account details…</p>
        )}

        {isError && (
          <p className="text-sm text-red-600">Unable to load account details. Please try again later.</p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-slate-500 text-xs font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                readOnly
                disabled
                className="bg-slate-50/50 border-slate-100 text-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-slate-500 text-xs font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                value={email}
                readOnly
                disabled
                className="bg-slate-50/50 border-slate-100 text-slate-700"
              />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Account information is read-only. Updates must be made by a system administrator.
          </p>
        </div>
      </div>
    </Card>
  );
}
