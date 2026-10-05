import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "OpenIdentity — Verifiable authority for AI agents",
  description: "OpenIdentity makes delegated authority explicit, constrained, revocable, and verifiable while working with existing OAuth infrastructure."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}