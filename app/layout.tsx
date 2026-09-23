import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Sri Bhagavathi Silvers | Authentic 925 Hallmark Heritage Silver",
  description: "Discover finely crafted South Indian antique 925 hallmarked silver jewellery, sacred pooja deepams, silver articles, and heirloom dining collections at Sri Bhagavathi Silvers.",
  keywords: [
    "Sri Bhagavathi Silvers",
    "925 Sterling Silver",
    "Silver Jewellery Coimbatore",
    "Silver Kolusu",
    "Kamakshi Deepam",
    "Silver Thali Set",
    "BIS 925 Hallmarked Silver",
    "South Indian Silver Articles"
  ],
  authors: [{ name: "Sri Bhagavathi Silvers" }],
  openGraph: {
    title: "Sri Bhagavathi Silvers | Timeless Heritage Silver",
    description: "Authentic South Indian 925 Sterling Silver Jewellery & Sacred Pooja Articles.",
    siteName: "Sri Bhagavathi Silvers",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA44lCpazxIH8yCH2520Khg4pCPSC1YOJyis7bwy4N0brunyyI2QjXFSAGiJCcd4W6AMstAZm2DNgtz9mZq3ZgB62zgtRVcGVoHDGLb_SEM3rGS1ZfheFTfHFUOju-RmyPhSkz_iaWMpBZhwpM2hzBy5WUTMxx7zpSVH9p4p4XHP25r0UmRF4OZnSeszIV83yZyN3RqRYGWkZ5UrIqv4CLxF1HM99Z_FFgZv8rppBNw_atF9z9ISVR6",
        width: 1200,
        height: 630,
        alt: "Sri Bhagavathi Silvers Heritage Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#fbf9f4] text-[#1b1c19] antialiased min-h-screen flex flex-col font-sans-editorial">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
