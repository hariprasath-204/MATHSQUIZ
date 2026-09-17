import type { Metadata, Viewport } from "next";
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#160706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#160706] text-[#fff1d1] min-h-screen flex flex-col relative selection:bg-[#df301c]/30 selection:text-[#ff9100] antialiased overflow-x-hidden">
        <QuizProvider>
          <ParticleBackground />
          <main className="flex-1 relative z-10 flex flex-col w-full">{children}</main>
        </QuizProvider>
      </body>
    </html>
  );
}
