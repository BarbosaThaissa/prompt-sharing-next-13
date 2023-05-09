"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image: string;
      name: string;
      email: string;
    };
  }
}

interface ProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
