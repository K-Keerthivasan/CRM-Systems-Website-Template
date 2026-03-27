import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { K2DemoBanner } from "@/components/k2-demo-banner";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "K2 Digital Media CRM",
  description: "Enterprise admin dashboard and CRM boilerplate for K2 Digital Media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = window.localStorage.getItem("crm-theme");
                  var theme = stored === "light" || stored === "dark"
                    ? stored
                    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  var root = document.documentElement;
                  root.dataset.theme = theme;
                  root.classList.toggle("dark", theme === "dark");
                  root.classList.toggle("light", theme === "light");
                } catch (error) {}
              })();
            `,
          }}
        />
        <Providers>
          <K2DemoBanner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
