import type { Metadata } from "next";
import { DocsShell } from "@/components/DocsShell";
import "./globals.css";

export const metadata:Metadata = {
  title:{default:"AH Design System",template:"%s · AH Design System"},
  description:"AdvisorHub design system documentation, component explorer, Figma mapping and agent knowledge portal."
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body><DocsShell>{children}</DocsShell></body></html>;
}
