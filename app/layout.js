"use client";

import Provider from "@/components/Provider";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Admin",
  description: "Ecommerce Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="whole-page flex flex-grow-1 bg-blue-700">
            <Nav />
            <div className="bg-slate-100 w-full h-screen content-part mt-2 px-8 py-4 rounded-xl">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
