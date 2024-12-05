import SearchInput from "@/components/common/SearchInput/SearchInput";
import Link from "next/link";
import React from "react";

export default function UserLayout() {
  const sessionProps = true;
  return (
    <header>
      <nav className="bg-blue-600  border-b w-full">
        <div className="flex flex-wrap items-center max-w-screen-xl mx-auto px-4  py-2.5">
          <Link href="/" className="flex flex-nowrap items-center p-2 me-4">
            <img src="/utcLogo.png" className="h-10 w-10 me-2" />
            <span className="font-medium text-white">
              Trung tâm thư viện UTC
            </span>
          </Link>
          <div className="flex-1">
            <SearchInput rootDir="/search" />
          </div>
          <div className="flex  ms-3">
            <Link
              href={"/introduce"}
              className="mx-2 p-2 text-white rounded border-white border hover:border-yellow-200"
            >
              Thể loại
            </Link>
            <Link
              href={"/introduce"}
              className="mx-2 p-2 text-white rounded border-white border"
            >
              Giới thiệu
            </Link>
            <Link
              href={"/introduce"}
              className="mx-2 p-2 text-white rounded border-white border"
            >
              Hướng dẫn sử dụng
            </Link>
          </div>
          <div className=" flex justify-center items-center me-0 ms-auto text-white ">
            {sessionProps ? (
              <div className="relative" id="accountInfoContainer">
                <Link className="p-2 me-2 flex items-center" href={"/customer"}>
                  <img
                    src={"/utcLogo.png"}
                    width={30}
                    height={30}
                    className="rounded-full me-1"
                    alt="avatar"
                  />
                  <span className="font-semibold hidden md:contents">
                    {"Van A"}
                  </span>
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 -0.5 17 17"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="si-glyph si-glyph-triangle-down ms-1"
                    fill="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <title>1237</title> <defs> </defs>{" "}
                      <g
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                      >
                        <path
                          d="M10.106,12.69 C9.525,13.27 8.584,13.27 8.002,12.69 L1.561,6.246 C0.979,5.665 0.722,4.143 2.561,4.143 L15.549,4.143 C17.45,4.143 17.131,5.664 16.549,6.246 L10.106,12.69 L10.106,12.69 Z"
                          fill="#ffffff"
                          className="si-glyph-fill"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </Link>
                <button
                  className="font-semibold text-[#3d71e7] ms-2  p-3 absolute bg-white  rounded min-w-[130px]"
                  id="btnLogout"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link className="p-2 me-2 flex items-center" href={"/auth/login"}>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="me-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                      fill="#ffffff"
                    />{" "}
                    <path
                      d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                      fill="#ffffff"
                    />{" "}
                  </g>
                </svg>

                <span className="font-medium">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
