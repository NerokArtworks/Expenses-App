import { ThemeProvider } from "@/components/theme-provider";
import { DashboardProvider } from "@/contexts/dashboard-context";
import type { Metadata } from "next";
import { Inter, M_PLUS_1 } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter()

const mPlus = M_PLUS_1()

export const metadata: Metadata = {
  title: "Expenses App",
  description: "Coded by Miguel_Nerok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mPlus.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
