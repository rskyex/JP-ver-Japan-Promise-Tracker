import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Japan Promise Tracker | 国会議員公約トラッカー",
  description:
    "日本の国会議員の選挙公約と国会行動の整合性を可視化する研究・透明性プロトタイプ。シビックテック・政策研究デモ。",
  openGraph: {
    title: "Japan Promise Tracker",
    description: "日本の国会議員の公約・行動・整合性を可視化する研究プロトタイプ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
