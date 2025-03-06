import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { M_PLUS_1 } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const mPlus = M_PLUS_1({
  subsets: ['latin']
})

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
