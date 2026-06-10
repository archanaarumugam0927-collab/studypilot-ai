export default function AppTabs() {
  const pathname = usePathname();

  if (pathname.includes("login") || pathname.includes("signup")) {
    return <Slot />;
  }

  const tabs = [
    { label: "Dashboard", href: "/" },
    { label: "Tasks", href: "/tasks" },
    { label: "Analytics", href: "/analytics" },
    { label: "AI Insights", href: "/ai-insights" },
    { label: "pomodoro", href: "/pomodoro" },
  ];