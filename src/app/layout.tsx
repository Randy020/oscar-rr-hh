"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  const initialOptions = {
    clientId,
    currency: "USD",
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!clientId) {
    console.error("PayPal Client ID no está configurado");
  }

  return (
    <html lang="es">  {/* Establecer el idioma global */}
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <PayPalScriptProvider options={initialOptions}>
            {loading ? <Loader /> : children}
          </PayPalScriptProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
