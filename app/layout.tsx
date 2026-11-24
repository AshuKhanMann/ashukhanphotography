import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ashu Khan Photography",
  description: "Professional photography services — portraits, weddings, events, and commercial. Book your session with Ashu Khan.",
  keywords: ["photography", "photographer", "portraits", "weddings", "Ashu Khan"],
  openGraph: {
    title: "Ashu Khan Photography",
    description: "Professional photography — capturing your most important moments.",
    url: "https://ashukhan.com",
    siteName: "Ashu Khan Photography",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
