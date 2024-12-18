"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function page() {
  const router = useRouter();
  const [id, setId] = useState("");
  return (
    <form
      className="max-w-64 mx-auto"
      onSubmit={async (e) => {
        e.preventDefault();
        let ck = await fetch(
          `http://localhost:8081/api/v1/document/get_document?document_id=${id}`
        ).then(async (res) => {
          if (res.ok) return true;
          return false;
        });
        if (!ck) return toast.error("Mã sách ko tồn tại");
        router.push(`./new_variant/${id}`);
      }}
    >
      <label className="mb-2.5 block font-medium text-black text-center">
        Nhập mã tài liệu
      </label>
      <div className="w-full">
        <input
          type="text"
          placeholder="Nhập mã yêu tài liệu"
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
