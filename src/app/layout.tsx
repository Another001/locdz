import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";

import { Sprite } from "@/components/ui/sprite";

import "./globals.css";

const heading = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-heading-loaded",
  display: "swap",
});

const body = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tổng quan tài xế — Vi Vu Việt",
  description:
    "Buồng lái tài xế Vi Vu Việt: lịch chạy hôm nay, chuyến kế tiếp và xe được giao trong một màn hình.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-canvas font-body text-slate-600 antialiased">
        <a
          href="#main"
          className="sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:not-sr-only focus:rounded-[10px] focus:bg-navy-800 focus:px-[18px] focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Bỏ qua điều hướng
        </a>
        <Sprite />
        {children}
      </body>
    </html>
  );
}
