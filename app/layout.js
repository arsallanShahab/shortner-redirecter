import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shorten your links",
  description:
    "Build and protect your brand using powerful, recognizable short links.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#fafde7] text-[#151802]"}>
        <main>{children}</main>
      </body>
    </html>
  );
}
