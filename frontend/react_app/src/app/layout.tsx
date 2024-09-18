'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {JetBrains_Mono} from "next/font/google";
import "./style/app.css";
import "./style/root.css";
import './style/popup.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import {NextFont} from "next/dist/compiled/@next/font";
import Header from "@/app/components/header";
import {AppContext} from "@/app/components/app_context";
import React, {useState} from "react";

const jetBrainsMono: NextFont = JetBrains_Mono({ subsets: ['cyrillic'] });

const metadata: Metadata = {
  title: "Mett",
  description: "Generated by my hands",
};



export default function RootLayout({  children, }: Readonly<{ children: React.ReactNode; }>) {
  const [appTitle, setAppTitle] = React.useState<string>("Mett"); // app name as default value

  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>
        <AppContext.Provider value={{setAppTitle}}>
          <main className={'main-app-component'} id='root_component'>
            {children}
            <Header title={appTitle} />
          </main>
        </AppContext.Provider>
      </body>
    </html> 
  );
}
