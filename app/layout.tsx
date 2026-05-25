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
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0; background-color: #f8f9fb; font-family: sans-serif; }
          a { color: inherit !important; text-decoration: none !important; }
          * { box-sizing: border-box; }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
