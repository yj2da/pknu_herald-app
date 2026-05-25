import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herald News App",
  description: "PKNU Herald News on iPhone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
