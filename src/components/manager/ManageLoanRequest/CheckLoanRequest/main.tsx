"use client";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CheckLoanRequest({
  access_token,
}: {
  access_token: string;
}) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      let res = await fetch(
        GenerateBackendURL("loan-request/check_request_is_handled?id=" + id),
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          cache: "no-store",
        }
      );
      if (!res.ok) {
        if (res.status == 404) {
          setIsLoading(false);
          return toast.error("Mã yêu cầu không tồn tại ");
        } else if (res.status == 409) {
          setIsLoading(false);
          return toast.error("Yêu cầu đã bị hủy hoặc chưa được chấp nhận");
        }
        setIsLoading(false);
        return toast.error("Có lỗi xảy ra");
      }
      let data: {
        is_loaned: boolean;
      } = await res.json();
      if (data.is_loaned) {
        setIsLoading(false);
        return toast.error("Yêu cầu đã được mượn");
      }
      router.push(`/manager/loan_return_documents/loan/${id}`);
    } catch (e) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <form className="max-w-64 mx-auto" onSubmit={login}>
      <label className="mb-2.5 block font-medium text-black text-center">
        Nhập mã yêu cầu mượn (LoanRequestID)
      </label>
      <div className="w-full">
        <input
          type="text"
          placeholder="Vui lòng nhập mã yêu cầu mượn (LoanRequestID)"
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
