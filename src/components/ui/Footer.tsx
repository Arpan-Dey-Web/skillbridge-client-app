import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Link href="/" className="font-bold text-xl text-primary">
            SkillBridge
          </Link>
          <p className="mt-4 text-muted-foreground max-w-sm">
            The world's leading platform for connecting students with expert
            tutors.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-foreground">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/tutors" className="hover:text-primary">
                Find Tutors
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-primary">
                Join as Tutor
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 SkillBridge. All rights reserved.
      </div>
    </footer>
  );
}
