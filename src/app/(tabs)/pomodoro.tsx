import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PomodoroScreen() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱ Pomodoro Timer</Text>

      <Text style={styles.timer}>
        {minutes}:{remainingSeconds.toString().padStart(2, "0")}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setRunning(!running)}
      >
        <Text style={styles.buttonText}>{running ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          setRunning(false);
          setSeconds(25 * 60);
        }}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FF",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  timer: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#0040E0",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0040E0",
    padding: 16,
    borderRadius: 14,
    width: 160,
    alignItems: "center",
    marginBottom: 12,
  },
  resetButton: {
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 14,
    width: 160,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});