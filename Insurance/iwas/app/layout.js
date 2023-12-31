'use client';

import React, { useState, useEffect } from "react";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Logout from "./logout";
const inter = Inter({ subsets: ["latin"] });
import {useSession} from "next-auth/react"
import {SessionProvider} from "next-auth/react"

import Providers from "./components/provider";
import Navbar from "./components/navbar";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
