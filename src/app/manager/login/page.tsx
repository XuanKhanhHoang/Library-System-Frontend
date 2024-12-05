"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
export default function page() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const router = useRouter();
  const inputFirstChanged = useRef(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (!inputFirstChanged || password.length < 6 || userName.length == 0) {
      toast.error("Vui lòng nhập đủ dữ liệu");
      return;
    }
    setIsLoading(true);
    const signInResponse = await signIn("admin", {
      username: userName,
      password: password,
      redirect: false,
    });
    if (signInResponse?.ok && !signInResponse.error) {
      toast.success("Đăng nhập thành công");
      router.replace("/manager");
      router.refresh();
      return;
    } else {
      let errMes =
        signInResponse?.error != "fetch failed"
          ? "Sai tài khoản hoặc mật khẩu"
          : "Có lỗi xảy ra";
      toast.error(errMes);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (inputFirstChanged.current) return;
    inputFirstChanged.current = true;
  }, [userName, password]);
  return (
    <div className="w-full border-stroke h-screen bg-[#6495ed] p-3">
      <div
        className="p-4 p-17.5 w-1/2 block   mx-auto rounded mt-10
         bg-white"
      >
        <Image
          width={70}
          height={70}
          src={"/utcLogo.png"}
          alt="Logo"
          priority
        />
        <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          UTC Lib System Management
        </h2>
        <h3 className="mb-3">
          Vui lòng đăng nhập bằng tài khoản nhân viên được cấp
        </h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Tên tài khoản
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={userName}
                onChange={(e) => setUserName(e.target.value.trim())}
                className={`${
                  inputFirstChanged.current &&
                  userName.length == 0 &&
                  "border-red-400"
                } w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none `}
              />
              {inputFirstChanged.current && userName.length == 0 && (
                <p className="text-red-400 text-sm p-1">
                  Tài khoản không được để trống
                </p>
              )}
              <span className="absolute right-4 top-4"></span>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                className={`${
                  inputFirstChanged.current &&
                  password.length < 6 &&
                  "border-red-400"
                } w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none `}
              />
              {inputFirstChanged.current && password.length < 6 && (
                <p className="text-red-400 text-sm p-1">
                  Mật khẩu phải lớn hơn 6 kí tự
                </p>
              )}
              <span
                className="absolute right-4 top-4"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </div>
          </div>

          <div className="mb-5">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-blue-400 bg-blue-400 p-4 text-white transition hover:bg-opacity-90"
            >
              {isLoading ? "Đang đăng nhập ..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
