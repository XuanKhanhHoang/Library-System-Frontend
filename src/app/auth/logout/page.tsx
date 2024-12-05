"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function page() {
  useEffect(() => {
    signOut({
      callbackUrl: "/auth/login",
      redirect: true,
    });
  }, []);
  return <div className="text-center">Logging out...</div>;
}
