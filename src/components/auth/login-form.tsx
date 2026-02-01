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
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8 bg-white"
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-5">
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                {/* Logo Placeholder */}
                <div className="bg-primary/10 p-3 rounded-2xl mb-2">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome to SkillBridge
                </h1>
                <p className="text-muted-foreground text-sm">
                  Start your learning journey today
                </p>
              </div>

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
                        placeholder="name@student.com"
                        className="focus-visible:ring-primary"
                        required
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

              <Field className="pt-2">
                {/* Applied your #10B981 Mint Green here */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl transition-all"
                >
                  Login
                </Button>
              </Field>

              <FieldSeparator className="text-xs uppercase font-bold text-muted-foreground">
                or
              </FieldSeparator>

              <Field>
                {/* Applied your #D8B4FE Lavender here */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full border-secondary/30 hover:bg-secondary/10 hover:text-secondary-foreground transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>

              <FieldDescription className="text-center pt-2">
                New to SkillBridge?{" "}
                <Link
                  href="/register"
                  className="text-primary font-bold hover:underline"
                >
                  Create an account
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* This side is #ECFDF5 Pale Mint */}
          <div className="bg-accent relative hidden md:flex items-center justify-center p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4 italic">
                Learning is a bridge to your future
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </div>
            {/* Subtle Decorative Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground text-center px-8 uppercase tracking-widest font-bold">
        Secure Academic Gateway
      </p>
    </div>
  );
}
