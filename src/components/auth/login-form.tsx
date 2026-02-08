"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import Image from "next/image";
const formSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Minimum Length is 8"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const toastId = toast.loading("Logging in User");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Sucessfully", { id: toastId });
        router.push("/", { scroll: true });
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong, Please try again", { id: toastId });
      }
    },
  });
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-white/10 bg-[#020617] shadow-2xl rounded-[2.5rem]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-8 md:p-12 bg-[#020617]"
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-6">
              <div className="flex flex-col items-center gap-2 text-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all" />
                  <div className="relative bg-white/5 border border-white/10 p-4 rounded-2xl mb-2">
                    <Image
                      src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
                      height={32}
                      width={32}
                      className="invert"
                      alt="Learn Hub"
                    />
                  </div>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tighter">
                  Welcome to <span className="shimmer-gold">LearnHub</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  Secure access to your academic portal
                </p>
              </div>

              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Email
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@student.com"
                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus-visible:ring-primary focus-visible:border-primary/50"
                        required
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError
                          className="text-red-400 text-xs mt-1"
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <FieldLabel className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Password
                        </FieldLabel>
                        <Link
                          href="#"
                          className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus-visible:ring-primary focus-visible:border-primary/50"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError
                          className="text-red-400 text-xs mt-1"
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black font-black py-7 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
              >
                Sign In
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#020617] px-2 text-slate-500 font-bold">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleGoogleLogin()}
                variant="outline"
                type="button"
                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 h-12 rounded-xl transition-all font-bold"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Google Account
              </Button>

              <p className="text-center text-sm text-slate-500 font-medium">
                New to the platform?{" "}
                <Link
                  href="/register"
                  className="text-primary font-bold hover:text-primary/80"
                >
                  Create account
                </Link>
              </p>
            </FieldGroup>
          </form>

          {/* Right Side Glassmorphism Panel */}
          <div className="bg-secondary relative hidden md:flex flex-col items-center justify-center p-12 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />

            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="size-3" /> Future-Ready Learning
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-[0.9] tracking-tighter italic">
                Knowledge is <br /> the bridge to <br />
                <span className="text-primary">greatness.</span>
              </h2>
              <div className="h-1.5 w-12 bg-primary mx-auto rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-[10px] text-slate-600 text-center px-8 uppercase tracking-[0.3em] font-black">
        Encrypted Academic Access
      </p>
    </div>
  );
}
