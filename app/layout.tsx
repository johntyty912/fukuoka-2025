import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "福岡之旅 2025 | Fukuoka Trip 2025",
  description: "福岡旅遊行程規劃 - 2025年12月13-20日",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <nav className="bg-fukuoka-blue text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <span>🌸</span>
                <span>福岡之旅 2025</span>
              </Link>
              <div className="flex gap-6">
                <Link 
                  href="/" 
                  className="hover:text-fukuoka-pink transition-colors font-medium"
                >
                  行程表
                </Link>
                <Link 
                  href="/reservations" 
                  className="hover:text-fukuoka-pink transition-colors font-medium"
                >
                  預約清單
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-fukuoka-blue text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-fukuoka-pink font-semibold mb-2">
              福岡之旅 2025年12月13日 - 12月20日
            </p>
            <p className="text-sm opacity-80">
              住宿：三井花園酒店福岡中洲 🏨
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

