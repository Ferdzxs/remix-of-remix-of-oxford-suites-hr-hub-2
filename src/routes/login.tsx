import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ConciergeBell,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  Mail,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";

import loginHero from "@/assets/oxford-suite-makati-interior1.png";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portal Login — Oxford Suites Makati HRMS" },
      {
        name: "description",
        content:
          "Sign in to the Oxford Suites Makati HRMS portal as Super Admin, Admin, or Employee to manage recruitment, HR records, and self-service.",
      },
      { property: "og:title", content: "Portal Login — Oxford Suites Makati HRMS" },
      { property: "og:description", content: "Sign in to the Oxford Suites Makati HRMS portal." },
    ],
  }),
  component: LoginPage,
});

// Order: Employee → HR Admin → Super Admin (Super Admin last as requested)
const roles = [
  {
    id: "employee" as const,
    label: "Employee",
    short: "Employee",
    icon: ConciergeBell,
    email: "maria.santos@email.com",
    body: "Front office, housekeeping, kitchen and service crew self-service.",
    to: "/employee",
  },
  {
    id: "admin" as const,
    label: "HR Admin",
    short: "HR Admin",
    icon: UserCog,
    email: "hr.admin@email.com",
    body: "Recruitment, onboarding, 201 files and HR operations.",
    to: "/admin",
  },
  {
    id: "superadmin" as const,
    label: "Super Admin",
    short: "Super Admin",
    icon: ShieldCheck,
    email: "superadmin@email.com",
    body: "Property-wide control of hotel and restaurant operations.",
    to: "/superadmin",
  },
];

function LoginPage() {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState<(typeof roles)[number]["id"]>("employee");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const role = roles.find((r) => r.id === roleId)!;
  const [email, setEmail] = useState(role.email);

  const pickRole = (id: (typeof roles)[number]["id"]) => {
    setRoleId(id);
    setEmail(roles.find((r) => r.id === id)!.email);
    setError("");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)] xl:grid-cols-[minmax(0,1.15fr)_minmax(28rem,0.85fr)]">
      {/* Property panel */}
      <div
        className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex"
        style={{ padding: "clamp(1.75rem, 3.2vw, 3.5rem)" }}
      >
        {/* The photo fills the panel at any viewport ratio */}
        <img
          src={loginHero}
          alt="Oxford Suites Makati tower exterior under a bright sky"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div aria-hidden className="absolute inset-0 bg-primary/60 mix-blend-multiply" />

        {/* Readability scrims around the centered brand */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-foreground/55 via-foreground/25 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_9rem_2rem_hsl(0_0%_0%/0.45)]"
        />

        <div className="relative z-10 flex min-h-full w-full flex-1 flex-col">
          <div className="flex flex-1 flex-col items-start justify-center py-10">
            <Link to="/" className="block">
              <Logo tone="invert" size="lg" />
            </Link>
            <p
              className="mt-6 max-w-md text-primary-foreground/85"
              style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
            >
              Hotel &amp; Restaurant Human Resource System
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-primary-foreground/20 pt-5 text-xs text-primary-foreground/75">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" />
            Role-based access · +63 2 8888 8888
          </div>
        </div>
      </div>

      {/* Credential panel */}
      <div className="flex items-center justify-center bg-background px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <Logo />
          </Link>

          <p className="eyebrow">Staff Portal Access</p>
          <h2 className="mt-2 font-display text-4xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select your post, then sign in with your work credentials.
          </p>
          <div className="gold-rule my-7" />

          <div className="grid grid-cols-3 gap-2 rounded-md border border-border bg-muted/40 p-1">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => pickRole(r.id)}
                aria-pressed={roleId === r.id}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-sm px-2 py-3 text-center transition-colors",
                  roleId === r.id
                    ? "bg-card text-foreground shadow-sm ring-1 ring-primary/25"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <r.icon className={cn("h-4 w-4", roleId === r.id ? "text-primary" : "")} />
                <span className="text-xs font-medium leading-tight">{r.short}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{role.body}</p>

          <form
            className="mt-7 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) return setError("Enter a valid work email address.");
              if (password.length < 6) return setError("Password must be at least 6 characters.");
              setError("");
              toast.success(`Welcome back — signed in as ${role.label}`);
              navigate({ to: "/otp", search: { role: role.to } });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="pl-9"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-9"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" defaultChecked />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Keep me signed in
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
                onClick={() => toast("Password reset link sent to the HR office.")}
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign in as {role.label}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Looking for work?{" "}
            <Link to="/jobs" className="font-medium text-primary hover:underline">
              Browse job openings
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
