import { ScrollViewStyleReset } from "expo-router/html";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>StudyPilot AI</title>
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}