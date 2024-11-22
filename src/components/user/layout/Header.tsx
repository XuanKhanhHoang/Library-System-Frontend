"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";
import ClickOutside from "@/components/manager/ClickOutside";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/components/redux/store";
import { refreshReservation } from "@/components/redux/feature/documentReservation";

export default function Header({ userName }: { userName?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchCol, setSearchCol] = useState<
    "name" | "author_name" | "category_name"
  >("name");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (pathname != "/document") return;
    setSearchCol((query.get("search_col") as any) || "name");
    setSearchTerm(query.get("search_term") || "");
  }, [query]);
  useEffect(() => {
    dispatch(refreshReservation());
  }, []);
  return (
    <nav className="bg-white border-b border-amber-50 w-full">
      <div className=" max-w-screen-xl mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center">
          <Link href="/" className="flex flex-nowrap items-center p-2">
            <img src="/utcLogo.png" alt="UTC Logo" className="h-10 w-10 mr-2" />
            <span className="font-medium text-xl text-gray-700 ">
              Trung Tâm Thư Viện UTC
            </span>
          </Link>
          <div className="flex flex-row items-center ms-48 flex-1 me-12">
            <input
              type="text"
              placeholder="Nhập thông tin tài liệu bạn muốn tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" flex-1 flex px-4 py-2 border border-gray-300 rounded-l h-full placeholder:text-sm"
            />
            <select
              id="states"
              value={searchCol}
              onChange={(e) => {
                setSearchCol(e.target.value as any);
              }}
              className="bg-gray-50 border border-gray-300 text-sm py-2  px-7  text-gray-600"
            >
              <option value="name">Tên sách</option>
              <option value="category_name">Thể loại</option>
              <option value="author_name">Tác giả</option>
            </select>

            <button
              onClick={() => {
                router.push(
                  `/document?${
                    searchTerm != ""
                      ? `search_term=${searchTerm}&search_col=${searchCol}`
                      : ""
                  }`
                );
              }}
              className="bg-blue-500 h-full py-2 text-white px-6 rounded-r hover:bg-blue-700 "
            >
              <Search size={21} />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4  py-1  ms-auto border-y mt-2 ">
          <Link href="/" className="text-gray-600 font-medium text-lg p-2 px-4">
            Trang chủ
          </Link>
          <Link
            href="/gioi-thieu"
            className="text-gray-600 font-medium text-lg p-2 px-4"
          >
            Giới thiệu
          </Link>
          <Link
            href="/dich-vu"
            className="text-gray-600 font-medium text-lg p-2 px-4"
          >
            Dịch vụ
          </Link>

          {userName ? (
            <>
              <div className="relative !ml-auto !mr-7 bg-blue-600 p-2 rounded ">
                <div
                  className="flex items-center text-gray-600 cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <User size={24} className="mr-2 text-white" />
                  <span className="font-medium text-white">{userName}</span>
                </div>

                {isMenuOpen && (
                  <ClickOutside onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="absolute -left-12 mt-4 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                      <ul className="py-1">
                        <li className=" border-b px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                          <Link href={"/user"}>Thông tin tài khoản</Link>
                        </li>
                        <li className="px-4 border-b py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                          <Link href={"/document_reservations"}>
                            Danh sách tài liệu chờ mượn
                          </Link>
                        </li>
                        <li className="px-4 border-b py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                          <Link href="/loan_requests">
                            Danh sách lịch mượn sách đã đặt
                          </Link>
                        </li>
                        <li
                          className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            signOut({ redirect: true, callbackUrl: "/" })
                          }
                        >
                          Đăng xuất
                        </li>
                      </ul>
                    </div>
                  </ClickOutside>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/auth/login"
              className=" !ml-auto bg-blue-600 p-2 !mr-7 flex items-center hover:bg-blue-700 rounded transition duration-300 text-amber-50"
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
