import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../../lib/supabase";

export default function AIInsightsScreen() {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [plan, setPlan] = useState("");

  function generatePlan() {
    if (!subject || !examDate) {
      setPlan("Please enter subject and exam date.");
      return;
    }

    const today = new Date();
    const exam = new Date(examDate);

    const diffTime = exam.getTime() - today.getTime();
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (totalDays <= 0 || isNaN(totalDays)) {
      setPlan("Please enter a valid future date (YYYY-MM-DD).");
      return;
    }

    const lowerSubject = subject.toLowerCase();

    let topics = [
      "Learn basics",
      "Study important concepts",
      "Practice problems",
      "Revise weak areas",
      "Take mock test",
    ];

    if (lowerSubject.includes("iot")) {
      topics = [
        "IoT Architecture",
        "Sensors and Actuators",
        "Communication Protocols",
        "IoT Security",
        "Revision & Mock Test",
      ];
    } else if (lowerSubject.includes("security")) {
      topics = [
        "CIA Principles",
        "Authentication & Authorization",
        "Access Control Models",
        "Identity Management",
        "Revision & Practice",
      ];
    } else if (
      lowerSubject.includes("cryptography") ||
      lowerSubject.includes("crypto")
    ) {
      topics = [
        "Cryptography Basics",
        "Lightweight Algorithms",
        "AES & RSA",
        "Diffie-Hellman",
        "Revision & Problems",
      ];
    } else if (lowerSubject.includes("forensics")) {
      topics = [
        "Cyber Forensics Basics",
        "Evidence Collection",
        "Incident Response",
        "Network Forensics",
        "Revision & Case Studies",
      ];
    } else if (lowerSubject.includes("embedded")) {
      topics = [
        "Embedded Basics",
        "Microcontrollers",
        "Memory & DMA",
        "Design Methodology",
        "Revision & Questions",
      ];
    } else if (lowerSubject.includes("rtos")) {
      topics = [
        "RTOS Concepts",
        "Scheduling Algorithms",
        "Task Management",
        "Inter Process Communication",
        "Revision & Mock Test",
      ];
    } else if (lowerSubject.includes("vlsi")) {
      topics = [
        "MOSFET Basics",
        "CMOS Logic",
        "Fabrication Process",
        "Layout Design",
        "Revision & Numericals",
      ];
    } else if (lowerSubject.includes("sequential")) {
      topics = ["Latches", "Flip-Flops", "Registers", "Counters", "Revision"];
    } else if (
      lowerSubject.includes("communication") ||
      lowerSubject.includes("5g")
    ) {
      topics = [
        "Communication Basics",
        "Modulation Techniques",
        "Wireless Networks",
        "5G Architecture",
        "Revision & Problems",
      ];
    } else if (
      lowerSubject.includes("machine learning") ||
      lowerSubject.includes("ml")
    ) {
      topics = [
        "ML Fundamentals",
        "Supervised Learning",
        "Unsupervised Learning",
        "Model Evaluation",
        "Revision & Projects",
      ];
    } else if (
      lowerSubject.includes("artificial intelligence") ||
      lowerSubject === "ai"
    ) {
      topics = [
        "AI Fundamentals",
        "Search Algorithms",
        "Knowledge Representation",
        "Applications of AI",
        "Revision",
      ];
    } else if (
      lowerSubject.includes("neural") ||
      lowerSubject.includes("ann")
    ) {
      topics = [
        "Perceptron",
        "Activation Functions",
        "Backpropagation",
        "CNN & Deep Learning",
        "Revision & Problems",
      ];
    } else if (lowerSubject.includes("vision")) {
      topics = [
        "Image Processing Basics",
        "Feature Extraction",
        "Object Detection",
        "Segmentation",
        "Revision & Practice",
      ];
    } else if (lowerSubject.includes("dbms")) {
      topics = [
        "ER Models",
        "Normalization",
        "SQL Queries",
        "Transactions",
        "Revision & Practice",
      ];
    } else if (lowerSubject.includes("dsa")) {
      topics = [
        "Arrays & Strings",
        "Linked Lists",
        "Trees & Graphs",
        "Sorting & Searching",
        "Revision & Coding Practice",
      ];
    } else if (lowerSubject.includes("react")) {
      topics = [
        "Components & JSX",
        "Navigation",
        "State Management",
        "API Integration",
        "Revision & Project Building",
      ];
    } else if (lowerSubject.includes("supabase")) {
      topics = [
        "Authentication",
        "Database Tables",
        "RLS Policies",
        "CRUD Operations",
        "Revision & Integration",
      ];
    } else if (lowerSubject === "cat") {
      topics = [
        "Quantitative Aptitude",
        "LRDI",
        "VARC",
        "Mock Tests",
        "Revision & Analysis",
      ];
    } else if (lowerSubject.includes("aptitude")) {
      topics = [
        "Percentages",
        "Profit & Loss",
        "Time & Work",
        "Probability",
        "Mock Test",
      ];
    } else if (lowerSubject.includes("lrdi")) {
      topics = [
        "Linear Arrangements",
        "Circular Arrangements",
        "Puzzles",
        "Data Interpretation",
        "Mock Sets",
      ];
    } else if (lowerSubject.includes("varc")) {
      topics = [
        "Reading Comprehension",
        "Para Jumbles",
        "Grammar",
        "Vocabulary",
        "Mock Tests",
      ];
    }

    let generatedPlan = `📚 Study Plan for ${subject}\n\n`;

    for (let i = 1; i <= totalDays; i++) {
      const topic = topics[(i - 1) % topics.length];
      generatedPlan += `Day ${i}: ${topic}\n`;
    }

    generatedPlan += `\n🎯 Exam Date: ${examDate}`;
    generatedPlan += `\n📅 Total Preparation Days: ${totalDays}`;

    setPlan(generatedPlan);
  }

  async function savePlanAsTask() {
    if (!plan) return;

    const { data: userData } = await supabase.auth.getUser();

    await supabase.from("tasks").insert({
      title: `Study Plan: ${subject}`,
      user_id: userData.user?.id,
      completed: false,
    });

    alert("Study plan saved to tasks!");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤖 AI Study Planner</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Subject"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Exam Date (YYYY-MM-DD)"
        value={examDate}
        onChangeText={setExamDate}
      />

      <TouchableOpacity style={styles.button} onPress={generatePlan}>
        <Text style={styles.buttonText}>Generate Study Plan</Text>
      </TouchableOpacity>

      {plan !== "" && (
        <>
          <View style={styles.card}>
            <Text style={styles.planText}>{plan}</Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={savePlanAsTask}>
            <Text style={styles.buttonText}>Save Plan to Tasks</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D3E4FE",
  },
  button: {
    backgroundColor: "#0040E0",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#006B5F",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  planText: {
    fontSize: 16,
    lineHeight: 28,
  },
});