import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 bg-white">
            <FieldGroup className="gap-4">
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

              {/* MANDATORY: Role Selection */}
              <Field>
                {/* <FieldLabel className="mb-4 block text-center font-bold text-lg">
                  Choose your path
                </FieldLabel> */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Student Card */}
                  <label className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      className="peer sr-only"
                      defaultChecked
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
                      <div className="text-center">
                        <p className="font-bold text-sm">I'm a Student</p>
                      </div>
                      {/* Selection Indicator */}       
                    </div>
                  </label>

                  {/* Tutor Card */}
                  <label className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="tutor"
                      className="peer sr-only"
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
                      <div className="text-center">
                        <p className="font-bold text-sm">I'm a Tutor</p>
     
                      </div>
                      {/* Selection Indicator */}
                   
                    </div>
                  </label>
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="focus-visible:ring-primary"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  className="focus-visible:ring-primary"
                  required
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    className="focus-visible:ring-primary"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm</FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="focus-visible:ring-primary"
                    required
                  />
                </Field>
              </div>

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

              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full border-secondary/20 hover:bg-secondary/5 transition-colors"
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
                  Sign up with Google
                </Button>
              </Field>

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

          {/* Right Panel - Soft Lavender Gradient */}
          <div className="bg-secondary/10 relative hidden md:flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Empower your future.
              </h2>
              <p className="text-muted-foreground text-sm">
                Join 5,000+ students already learning on SkillBridge.
              </p>
            </div>
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
