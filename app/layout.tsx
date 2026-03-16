import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import StoreProvider from "./StoreProvide";

export const metadata: Metadata = {
  title: "UBA Security - User Behavior Analytics",
  description: "Real-time user behavior analysis and threat detection platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
