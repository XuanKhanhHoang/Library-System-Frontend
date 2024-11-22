"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
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
    const signInResponse = await signIn("user", {
      username: userName,
      password: password,
      redirect: false,
    });
    if (signInResponse?.ok && !signInResponse.error) {
      toast.success("Đăng nhập thành công");
      router.push("/");
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
    <section className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="px-6 py-4">
        <div className="!mx-auto bg-white rounded-lg shadow max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập bằng tài khoản của bạn
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value.trim())}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="ml-3 text-sm"></div>
                </div>
                <Link
                  href="./forgot_password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                {isLoading ? "Loading" : "Đăng nhập"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Chưa có tài khoản ?{" "}
                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Liên hệ cán bộ thư viện để được cấp tài khoản
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
