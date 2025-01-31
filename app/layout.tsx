import type { Metadata } from "next";
import {Roboto} from 'next/font/google';
import "./globals.css";

const roboto = Roboto({
  subsets : ["latin"],
  weight: ['100', '300', '400','500', '700', '900'],
});


let title = "Career Guide";
let description = "Describe your aspirations and get guidance on how to get there";


export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
