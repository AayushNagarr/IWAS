'use client';

import React, { useState, useEffect } from "react";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Logout from "./logout";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "./components/navbar";
import {useSession} from "next-auth/react"
import {SessionProvider} from "next-auth/react"

import Providers from "./components/provider";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-white border-2 text-black from-stone-700 to-green-600">
            <Link className="px-10" href="/dashboard">
              dashboard
              </Link>
            <Link className="px-10" href="/register">
              REGISTER
            </Link>
            <Link className="px-10" href="/login">
              LOGIN
            </Link>
            <Logout />
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
