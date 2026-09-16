import type { Metadata } from "next";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";
import { ParticleBackground } from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: "26PMAG101 - MATHEMATICAL FOUNDATION | Quiz Challenge | MCA ANJAC",
  description:
    "Interactive, animated quiz application for 26PMAG101 - MATHEMATICAL FOUNDATION elective course at Ayya Nadar Janaki Ammal College. Created by S. HARI PRASATH (26PCA135).",
  keywords: [
    "26PMAG101",
    "MATHEMATICAL FOUNDATION",
    "MCA Quiz",
    "Trees",
    "Boolean Algebra",
    "Algebraic Structures",
    "ANJAC",
    "S. HARI PRASATH"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0e0517] text-slate-100 min-h-screen flex flex-col relative selection:bg-rose-500/30 selection:text-rosegold-300 antialiased">
        <QuizProvider>
          <ParticleBackground />
          <main className="flex-1 relative z-10 flex flex-col">{children}</main>
        </QuizProvider>
      </body>
    </html>
  );
}
