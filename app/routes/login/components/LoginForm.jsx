import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router";
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from "@/components/ui";
import { useLoginMutation } from "@/store/api/authApi";
import { loginSchema } from "../schema";
import { getApiErrorMessage } from "@/shared";
import { toast } from "sonner";

const initialValues = {
  login: "",
  password: "",
};

export function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState(null);

  return (
    <div className="flex justify-center md:justify-end">
      <Card className="w-full max-w-[480px] p-8 md:p-12 rounded-2xl border-none bg-white shadow-2xl">
        <CardHeader className="text-center p-0 mb-10">
          <CardTitle className="text-2xl font-semibold text-slate-800">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setApiError(null);
              try {
                await login({
                  login: values.login.trim(),
                  password: values.password,
                }).unwrap();
                toast.success("Signed in successfully.");
                navigate("/dashboard", { replace: true });
              } catch (err) {
                const message =
                  getApiErrorMessage(err, {
                    fallbackMessage: "Sign in failed. Please try again.",
                  }) ?? "Sign in failed. Please try again.";
                setApiError(message);
                toast.error(message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="login" className="text-slate-400 text-xs font-medium ml-0.5">
                    Login
                  </Label>
                  <Field
                    as={Input}
                    id="login"
                    name="login"
                    type="text"
                    autoComplete="username"
                    placeholder="admin"
                    className="h-12"
                  />
                  {touched.login && errors.login && (
                    <p className="text-xs text-red-500">{errors.login}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password" className="text-slate-400 text-xs font-medium ml-0.5">
                    Password
                  </Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-12"
                  />
                  {touched.password && errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                {apiError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {apiError}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full mt-2 h-12 text-base font-semibold shadow-lg shadow-primary/20"
                >
                  {isSubmitting || isLoading ? "Signing in…" : "Continue"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
