"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const router = useRouter();
  const [id, setId] = useState("");
  return (
    <form
      className="max-w-64 mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/manager/loan_return_documents/return/${id}`);
      }}
    >
      <label className="mb-2.5 block font-medium text-black text-center">
        Nhập mã phiếu mượn (ID)
      </label>
      <div className="w-full">
        <input
          type="text"
          placeholder="Vui lòng nhập mã phiếu mượn (ID)"
          value={id}
          onChange={(e) => setId(e.target.value.trim())}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="w-3/4 my-3 block mx-auto cursor-pointer rounded-lg border border-blue-400 bg-blue-400 p-2 text-white transition hover:bg-opacity-90"
      >
        Kiểm tra
      </button>
    </form>
  );
}
