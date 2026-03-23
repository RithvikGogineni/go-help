import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CursorFollower } from "@/components/shared/CursorFollower";
import { LoadingProvider } from "@/context/LoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoHelp Jamaica - Connect. Volunteer. Impact.",
  description: "GoHelp is Jamaica's volunteer matching platform connecting volunteers with NGOs and families in need. Help someone today. Change Jamaica tomorrow.",
  keywords: "volunteer, Jamaica, charity, NGO, community service, donation, help",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LoadingProvider>
            <div className="min-h-screen flex flex-col relative overflow-hidden">
              <CursorFollower />
              <Navbar />
              <main className="flex-1 pt-16 lg:pt-20">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'border-border',
              }}
            />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
