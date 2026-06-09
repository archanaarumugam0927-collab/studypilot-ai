import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  const [userName, setUserName] = useState("Student");
  const [streak, setStreak] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [studyHours, setStudyHours] = useState(0);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
  router.replace("/login");
  return;
}

      const name =
        data.user?.user_metadata?.full_name ||
        data.user?.email ||
        "Student";

      setUserName(name);

      const { data: profile } = await supabase
        .from("profiles")
        .select("streak")
        .eq("id", data.user?.id)
        .single();

      if (profile) {
        setStreak(profile.streak);
      }

      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", data.user?.id);

      if (tasks) {
        const completed = tasks.filter((task) => task.completed).length;

        setTotalTasks(tasks.length);
        setCompletedTasks(completed);
        setStudyHours((completed * 30) / 60);

        if (completed < 3) {
          setRecommendation(
            "Focus on IoT today. Complete more tasks to reach your goal."
          );
        } else {
          setRecommendation(
            "Great progress! Continue with DSA and revision."
          );
        }
      }
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const dailyGoal = 5;
  const goalPercentage =
    dailyGoal === 0 ? 0 : Math.min(Math.round((completedTasks / dailyGoal) * 100), 100);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.appTitle}>StudyPilot AI</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hello, {userName} 👋</Text>

      <Text style={styles.subtitle}>
        Your co-pilot is ready for a productive session.
      </Text>

      <Text style={styles.streakText}>
        🔥 Current Streak: {streak} Days
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.statText}>📋 Total Tasks: {totalTasks}</Text>
        <Text style={styles.statText}>✅ Completed Tasks: {completedTasks}</Text>
        <Text style={styles.statText}>⏱ Study Hours: {studyHours} Hours</Text>
        <Text style={styles.statText}>
          🎯 Daily Goal: {completedTasks} / {dailyGoal} Tasks
        </Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardHeading}>Daily Goal</Text>
        <Text style={styles.progress}>{goalPercentage}%</Text>
        <Text style={styles.cardText}>
          {completedTasks} / {dailyGoal} tasks completed
        </Text>
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.badge}>AI RECOMMENDATION</Text>
        <Text style={styles.aiText}>{recommendation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F8F9FF" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  appTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0040E0",
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
  },

  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    color: "#0B1C30",
  },

  subtitle: {
    fontSize: 15,
    color: "#434656",
    marginTop: 6,
    marginBottom: 12,
  },

  streakText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 20,
  },

  statsCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  },

  statText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#0B1C30",
  },

  progressCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  },

  cardHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0B1C30",
  },

  progress: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#0040E0",
    marginTop: 8,
  },

  cardText: {
    fontSize: 15,
    color: "#434656",
    marginTop: 6,
  },

  aiCard: { backgroundColor: "#DDE1FF", padding: 20, borderRadius: 18 },

  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0040E0",
    marginBottom: 10,
  },

  aiText: { fontSize: 17, fontWeight: "600", color: "#001356" },
});