"use client";

import { GenerateBackendURL } from "@/utils/backendUrl";
import { isValidEmail } from "@/utils/validate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MainForgotPwdForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    if (isLoading) return;
    let email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    let isValid = isValidEmail(email);
    setIsError(!isValid);
    if (isValid) {
      setIsLoading(true);
      try {
        let res = await fetch(
          GenerateBackendURL("auth/get_forgot_password_link"),
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email }),
          }
        );
        if (!res.ok) {
          setIsLoading(false);
          return toast.error("Có lỗi xảy ra  ", { autoClose: 600 });
        }
        router.push("/auth/forgot_password/email_sent?email=" + email);
      } catch (e) {
        setIsLoading(false);
        toast.error("Có lỗi xảy ra ", { autoClose: 600 });
      }
    }
  };
  return (
    <div className="min-h-72 p-5 flex justify-center items-center ">
      <form className=" w-[400px] ">
        <div className="w-full">
          <label
            htmlFor="email"
            className="block mb-2  text-gray-900 font-medium text-lg"
          >
            Nhập email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={
              (isError ? " border-red-600 " : "border-gray-300") +
              " bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
            }
            placeholder="yourEmail@gmail.com"
            required
          />
          {isError && (
            <span className="mt-2 flex items-center gap-1 font-normal text-sm text-red-700">
              Email không đúng
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-5 text-white bg-green-500 hover:bg-green-600 shadow-none focus:ring-0 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isLoading ? "Loading..." : " Quên mật khẩu"}
        </button>
      </form>
    </div>
  );
}
