"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface providerProps {
  children: React.ReactNode;
}

function Provider({ children }: providerProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
