import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function TasksScreen() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  async function loadTasks() {
    const { data: userData } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userData.user?.id)
      .order("created_at", { ascending: false });

    if (data) setTasks(data);
  }

  async function addTask() {
    if (!taskTitle.trim()) return;

    const { data: userData } = await supabase.auth.getUser();

    await supabase.from("tasks").insert({
      title: taskTitle,
      user_id: userData.user?.id,
      completed: false,
    });

    setTaskTitle("");
    loadTasks();
  }

  async function toggleTask(id: number, completed: boolean) {
    const { data: userData } = await supabase.auth.getUser();

    const { error: taskError } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);

    if (taskError) {
      alert("Task update error: " + taskError.message);
      return;
    }

    if (!completed) {
      const today = new Date().toISOString().split("T")[0];

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("streak, last_active")
        .eq("id", userData.user?.id)
        .single();

      if (profileError) {
        alert("Profile fetch error: " + profileError.message);
        return;
      }

      if (profile.last_active !== today) {
        const { error: streakError } = await supabase
          .from("profiles")
          .update({
            streak: (profile.streak || 0) + 1,
            last_active: today,
          })
          .eq("id", userData.user?.id);

        if (streakError) {
          alert("Streak update error: " + streakError.message);
          return;
        }
      }
    }

    loadTasks();
  }

  async function deleteTask(id: number) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      alert("Delete error: " + error.message);
      return;
    }

    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Today's Tasks</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {tasks.map((task) => (
        <View key={task.id} style={styles.card}>
          <TouchableOpacity
            onPress={() => toggleTask(task.id, task.completed)}
            style={styles.taskArea}
          >
            <Text
              style={[
                styles.taskText,
                task.completed && styles.completedTask,
              ]}
            >
              {task.completed ? "✅" : "⬜"} {task.title}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteTask(task.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F8F9FF" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 20, gap: 10 },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D3E4FE",
  },
  addButton: {
    backgroundColor: "#0040E0",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 12,
  },
  addButtonText: { color: "white", fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskArea: {
    flex: 1,
  },
  taskText: { fontSize: 16 },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  deleteText: {
    color: "#EF4444",
    fontWeight: "bold",
    marginLeft: 10,
  },
});