import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shiftly — Smart Staff Scheduling for Healthcare Teams",
  description:
    "Shiftly automatically creates staff schedules for healthcare teams — respecting legal requirements, employee preferences, and real-world constraints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
