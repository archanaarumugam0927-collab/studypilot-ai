import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function AnalyticsScreen() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const { data: userData } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userData.user?.id);

    if (!data) return;

    const completed = data.filter((task) => task.completed).length;

    setTotalTasks(data.length);
    setCompletedTasks(completed);
  }

  const pendingTasks = totalTasks - completedTasks;
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const studyHours = (completedTasks * 30) / 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Analytics</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Overall Progress</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
        <Text style={styles.subText}>Task completion rate</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.label}>📋 Total</Text>
          <Text style={styles.number}>{totalTasks}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>✅ Completed</Text>
          <Text style={styles.number}>{completedTasks}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>⏳ Pending</Text>
          <Text style={styles.number}>{pendingTasks}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>⏱ Hours</Text>
          <Text style={styles.number}>{studyHours}</Text>
        </View>
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>Insight</Text>
        <Text style={styles.aiText}>
          {percentage < 50
            ? "You need to complete more tasks today."
            : "Great progress! Keep your momentum going."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F8F9FF" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },

  summaryCard: {
    backgroundColor: "#0040E0",
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  percentage: {
    color: "white",
    fontSize: 52,
    fontWeight: "bold",
    marginTop: 10,
  },
  subText: {
    color: "#DDE1FF",
    fontSize: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    width: "48%",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: "#434656",
  },
  number: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0040E0",
    marginTop: 8,
  },

  aiCard: {
    backgroundColor: "#DDE1FF",
    padding: 20,
    borderRadius: 18,
    marginTop: 8,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001356",
    marginBottom: 8,
  },
  aiText: {
    fontSize: 16,
    color: "#001356",
  },
});