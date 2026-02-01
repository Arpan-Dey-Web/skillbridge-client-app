"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
/* =========================
   Zod Schema
========================= */
const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Minimum Length is 8"),
  role: z.enum(["STUDENT", "TUTOR"]),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // console.log(value);
      const toastId = toast.loading("Creating User");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Sucessfully", { id: toastId });
        router.push("/", { scroll: true });
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong, Please try again", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8 bg-white"
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-4">
              {/* HEADER */}
              <div className="flex flex-col items-center gap-2 text-center mb-2">
                <div className="bg-secondary/20 p-3 rounded-2xl mb-2">
                  <div className="w-8 h-8 bg-secondary rounded-lg" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                  Join SkillBridge
                </h1>
                <p className="text-muted-foreground text-sm">
                  Create an account to start learning or teaching.
                </p>
              </div>

              {/* ROLE */}
              <form.Field name="role">
                {(field) => (
                  <Field>
                    <div className="grid grid-cols-2 gap-4">
                      {/* STUDENT */}
                      <label className="relative cursor-pointer group">
                        <input
                          type="radio"
                          name={field.name}
                          value="STUDENT"
                          className="peer sr-only"
                          checked={field.state.value === "STUDENT"}
                          onChange={() => field.handleChange("STUDENT")}
                        />
                        <div
                          className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-accent bg-white transition-all
                          peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-primary/50"
                        >
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                          </div>
                          <p className="font-bold text-sm">I am a Student</p>
                        </div>
                      </label>

                      {/* TUTOR */}
                      <label className="relative cursor-pointer group">
                        <input
                          type="radio"
                          name={field.name}
                          value="TUTOR"
                          className="peer sr-only"
                          checked={field.state.value === "TUTOR"}
                          onChange={() => field.handleChange("TUTOR")}
                        />
                        <div
                          className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-accent bg-white transition-all
                          peer-checked:border-secondary peer-checked:bg-secondary/5 group-hover:border-secondary/50"
                        >
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                              <rect width="18" height="18" x="3" y="4" rx="2" />
                              <circle cx="12" cy="10" r="2" />
                              <line x1="7" x2="7" y1="2" y2="4" />
                              <line x1="17" x2="17" y1="2" y2="4" />
                            </svg>
                          </div>
                          <p className="font-bold text-sm">I am a Tutor</p>
                        </div>
                      </label>
                    </div>
                  </Field>
                )}
              </form.Field>

              {/* NAME */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="focus-visible:ring-primary"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* EMAIL */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        className="focus-visible:ring-primary"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* PASSWORD */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        className="focus-visible:ring-primary"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <FieldDescription className="text-xs">
                Password must be at least 8 characters.
              </FieldDescription>

              <Field className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg shadow-primary/20"
                >
                  Create Account
                </Button>
              </Field>

              <FieldSeparator className="text-[10px] uppercase font-bold text-muted-foreground">
                Social Sign-up
              </FieldSeparator>

              <FieldDescription className="text-center">
                Already part of the bridge?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline"
                >
                  Log in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* RIGHT PANEL (unchanged) */}
          <div className="bg-secondary/10 relative hidden md:flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Empower your future.
              </h2>
              <p className="text-muted-foreground text-sm">
                Join 5,000+ students already learning on SkillBridge.
              </p>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
