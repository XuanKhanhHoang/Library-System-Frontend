"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  const onBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <button
      className={
        className ||
        "bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded text-sm"
      }
      onClick={() => onBack()}
    >
      Quay lại
    </button>
  );
}
