"use client";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { isValidEmail } from "@/utils/validate";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type resetPasswordSearchParams = {
  access_token: string;
  email: string;
};
export default function Page({
  searchParams,
}: {
  searchParams: resetPasswordSearchParams;
}) {
  const email = decodeURI(searchParams.email);
  if (!isValidEmail(email)) notFound();
  const access_token = decodeURIComponent(searchParams.access_token);
  const [isPwdError, setIsPwdError] = useState(false);
  const [isRePwdError, setIsRePwdError] = useState(false);
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    if (isLoading) return;
    let password = (
      document.getElementById("new_password") as HTMLInputElement
    ).value.trim();
    let rePassword = (
      document.getElementById("re_new_password") as HTMLInputElement
    ).value.trim();
    setIsPwdError(password.length < 6);
    setIsRePwdError(rePassword.length < 6);
    setIsMatchPassword(password != rePassword);
    let isInvalid =
      password.length < 6 || rePassword.length < 6 || password != rePassword;
    if (!isInvalid) {
      setIsLoading(true);
      try {
        let res = await fetch(GenerateBackendURL("user/change_password"), {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ new_password: password }),
        });
        if (!res.ok) {
          setIsLoading(false);
          return toast.error("Có lỗi xảy ra ", { autoClose: 600 });
        }
        toast.success("Thay đổi mật khẩu thành công ,vui lòng đăng nhập ", {
          autoClose: 500,
          onClose: () => {
            router.push("/auth/login");
          },
        });
      } catch (e) {
        setIsLoading(false);
        toast.error("Có lỗi xảy ra ", { autoClose: 600 });
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Thay đổi mật khẩu cho <span className="">{email}</span>
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  className={
                    (isPwdError ? " border-red-600 " : "border-gray-300") +
                    " bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  }
                  placeholder="••••••••"
                  required
                />
                {isPwdError && (
                  <span className="mt-2 flex items-center gap-1 font-normal text-sm text-red-700">
                    Mật khẩu phải lớn hơn hoặc bằng 6 chữ số
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  name="re_new_password"
                  id="re_new_password"
                  className={
                    (isRePwdError || isMatchPassword
                      ? "border-red-600"
                      : "border-gray-300") +
                    " bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  }
                  placeholder="••••••••"
                  required
                />
                {isRePwdError && (
                  <span className="mt-2 flex items-center gap-1 font-normal text-sm text-red-700">
                    Mật khẩu phải lớn hơn hoặc bằng 6 chữ số
                  </span>
                )}
                {isMatchPassword && (
                  <span className="mt-2 flex items-center gap-1 font-normal text-sm text-red-700">
                    Nhập lại mật khẩu không khớp
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full text-white bg-green-500 hover:bg-green-600 shadow-none focus:ring-0 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isLoading ? "Loading..." : "Thay đổi mật khẩu"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
