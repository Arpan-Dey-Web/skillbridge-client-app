"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  GraduationCap,
  Presentation,
  ArrowRight,
} from "lucide-react";
import * as z from "zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Invalid email"),
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
      role: "STUDENT" as "STUDENT" | "TUTOR",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User");
      try {
        const { error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });

        if (value.role === "TUTOR") {
          router.push("/dashboard/tutor/profile");
        } else {
          router.push("/");
        }
      } catch (error) {
        toast.error("Something Went Wrong, Please try again", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6 mt-20", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border bg-card shadow-2xl rounded-[2.5rem]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-8 md:p-12 bg-card"
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-6">
              {/* HEADER */}
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <div className="relative bg-secondary border border-border p-4 rounded-2xl mb-2">
                  <Image
                    src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
                    height={32}
                    width={32}
                    className="dark:invert"
                    alt="Learn Hub"
                  />
                </div>
                <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase">
                  Create <span className="shimmer-gold">Account</span>
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                  Choose your path and start your journey.
                </p>
              </div>

              {/* ROLE SELECTION */}
              <form.Field name="role">
                {(field) => (
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative cursor-pointer group">
                      <input
                        type="radio"
                        checked={field.state.value === "STUDENT"}
                        onChange={() => field.handleChange("STUDENT")}
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-secondary transition-all peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-primary/50">
                        <GraduationCap
                          className={cn(
                            "size-6 transition-colors",
                            field.state.value === "STUDENT"
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                        <p className="font-bold text-[10px] uppercase tracking-widest text-foreground">
                          Student
                        </p>
                      </div>
                    </label>
                    <label className="relative cursor-pointer group">
                      <input
                        type="radio"
                        checked={field.state.value === "TUTOR"}
                        onChange={() => field.handleChange("TUTOR")}
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-secondary transition-all peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-primary/50">
                        <Presentation
                          className={cn(
                            "size-6 transition-colors",
                            field.state.value === "TUTOR"
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                        <p className="font-bold text-[10px] uppercase tracking-widest text-foreground">
                          Tutor
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </form.Field>

              {/* NAME */}
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-2">
                    <FieldLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Full Name
                    </FieldLabel>
                    <Input
                      placeholder="John Doe"
                      className="bg-secondary border-border text-foreground h-12 rounded-xl focus-visible:ring-primary"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors && (
                      <p className="text-destructive text-xs mt-1 font-bold">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* EMAIL */}
              <form.Field name="email">
                {(field) => (
                  <div className="space-y-2">
                    <FieldLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Email
                    </FieldLabel>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      className="bg-secondary border-border text-foreground h-12 rounded-xl focus-visible:ring-primary"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors && (
                      <p className="text-destructive text-xs mt-1 font-bold">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* PASSWORD */}
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-2">
                    <FieldLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Password
                    </FieldLabel>
                    <Input
                      type="password"
                      className="bg-secondary border-border text-foreground h-12 rounded-xl focus-visible:ring-primary"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors && (
                      <p className="text-destructive text-xs mt-1 font-bold">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-7 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2 uppercase tracking-widest"
              >
                Create Account <ArrowRight className="size-4 ml-2" />
              </Button>

              {/* <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-bold tracking-widest">
                    Social Register
                  </span>
                </div>
              </div> */}

              {/* <Button
                onClick={() => handleGoogleLogin()}
                variant="outline"
                type="button"
                className="w-full border-border bg-secondary text-foreground hover:bg-accent h-12 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google Identity
              </Button> */}

              <p className="text-center text-sm text-muted-foreground font-medium">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </FieldGroup>
          </form>

          {/* RIGHT PANEL */}
          <div className="bg-secondary relative hidden md:flex flex-col items-center justify-center p-12 overflow-hidden border-l border-border">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />

            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="size-3" /> Start Your Legacy
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-[0.9] tracking-tighter italic uppercase">
                Empower your <br /> future with <br />
                <span className="text-primary">LearnHub.</span>
              </h2>
              <p className="text-muted-foreground font-medium text-sm">
                Join 5,000+ others bridging the gap.
              </p>
              <div className="h-1.5 w-12 bg-primary mx-auto rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground/60 text-center px-8 uppercase tracking-[0.4em] font-black">
        Encrypted Academic Access System
      </p>
    </div>
  );
}
