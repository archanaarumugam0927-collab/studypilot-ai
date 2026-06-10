import { Link, Slot, usePathname } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          {tabs.map((tab) => {
            const active = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={[styles.tab, active && styles.activeTab]}
              >
                <Text style={[styles.tabText, active && styles.activeText]}>
                  {tab.label}
                </Text>
              </Link>
            );
          })}
        </View>
      </View>

      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F8FAFC",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111827",
    borderRadius: 20,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    textDecorationLine: "none",
  },
  activeTab: {
    backgroundColor: "#374151",
  },
  tabText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "600",
  },
  activeText: {
    color: "#FFFFFF",
  },
});