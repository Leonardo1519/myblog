import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MusicPlayer from "./components/MusicPlayer";

export const metadata: Metadata = {
  title: "我的博客 | 分享技术与生活",
  description: "一个分享技术、项目和生活感悟的个人博客",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <MusicPlayer />
      </body>
    </html>
  );
}
