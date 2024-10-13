"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { User } from "lucide-react";

interface HeaderProps {
  sessionProps: boolean;
  onLogout: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({
  sessionProps,
  onLogout,
  userName = "User",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 border-b border-amber-50 w-full">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto px-4 py-2.5">
        <Link href="/" className="flex flex-nowrap items-center p-2">
          <img src="/utcLogo.png" alt="UTC Logo" className="h-10 w-10 mr-2" />
          <span className="font-medium text-amber-50">
            Trung tâm thư viện UTC
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-amber-50 hover:text-white">
            Trang chủ
          </Link>
          <Link href="/gioi-thieu" className="text-amber-50 hover:text-white">
            Giới thiệu
          </Link>
          <Link href="/kho-sach" className="text-amber-50 hover:text-white">
            Kho sách
          </Link>
          <Link href="/dich-vu" className="text-amber-50 hover:text-white">
            Dịch vụ
          </Link>

          {sessionProps ? (
            <>
              <div className="relative ml-4">
                <div
                  className="flex items-center text-amber-50 cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <User size={24} className="mr-2" />
                  <span className="font-medium">Nguyễn An</span>
                </div>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <ul className="py-1">
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                        Thông tin tài khoản
                      </li>
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                        Sách đã thuê
                      </li>
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                        Sách đang thuê
                      </li>
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        onClick={onLogout}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="p-2 flex items-center bg-red-700 hover:bg-red-600 rounded-md transition duration-300 text-amber-50"
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
};

export default function UserLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sessionProps = true;
  const filterOptions = [
    "Từ khóa",
    "Nhan đề",
    "Tác giả",
    "Chủ đề",
    "Số ISBN",
    "Thùng thư",
    "Ký hiệu xếp giá",
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("User logged out");
  };

  return (
    <header>
      <Header sessionProps={sessionProps} onLogout={handleLogout} />

      <div className="relative w-full h-64">
        <Image
          src="/bannerutc.png"
          alt="Library bookshelves and students"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-red-500 mb-6">TÌM KIẾM</h2>
          <div className="flex mb-6 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Nhập thông tin tài liệu bạn muốn tìm kiếm"
              className="flex-grow px-4 py-2 rounded-l-full border-2 border-gray-300 focus:outline-none focus:border-red-500 mb-4 sm:mb-0 sm:rounded-l-full"
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded-r-full hover:bg-red-600 focus:outline-none">
              <Search size={24} />
            </button>
          </div>
          <p className="text-red-500 mb-4">
            Sau khi nhập vào cụm từ tìm kiếm, bạn có thể chọn một trong các tiêu
            chí dưới đây để kết quả tìm trả về chính xác hơn.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map((option, index) => (
              <button
                key={index}
                className="hover:bg-red-100 px-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
