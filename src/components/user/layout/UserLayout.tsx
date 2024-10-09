'use client';

import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';

interface HeaderProps {
  sessionProps: boolean;
  onLogout: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ sessionProps, onLogout, userName = 'User' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 border-b border-amber-50 w-full">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto px-4 py-2.5">
        <Link href="/" className="flex flex-nowrap items-center p-2">
          <img src="/utcLogo.png" alt="UTC Logo" className="h-10 w-10 mr-2" />
          <span className="font-medium text-amber-50">Trung tâm thư viện UTC</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-amber-50 hover:text-white">Trang chủ</Link>
          <Link href="/gioi-thieu" className="text-amber-50 hover:text-white">Giới thiệu</Link>
          <Link href="/kho-sach" className="text-amber-50 hover:text-white">Kho sách</Link>
          <Link href="/dich-vu" className="text-amber-50 hover:text-white">Dịch vụ</Link>
          
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
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Thông tin tài khoản</li>
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Sách đã thuê</li>
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Sách đang thuê</li>
                      <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={onLogout}>Đăng xuất</li>
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

interface QuickAccessResource {
  logo: string;
  title: string;
  link: string;
}

const QuickAccessCard: React.FC<QuickAccessResource> = ({ logo, title, link }) => (
  <a
    href={link}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
  >
    <div className="w-20 h-20 relative mb-2 flex items-center justify-center">
      <img src={logo} alt={title} className="max-w-full max-h-full object-contain" />
    </div>
    <h3 className="text-center text-sm font-medium text-gray-800 mt-2">{title}</h3>
  </a>
);

export default function UserLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sessionProps = true;
  const filterOptions = ['Từ khóa', 'Nhan đề', 'Tác giả', 'Chủ đề', 'Số ISBN', 'Thùng thư', 'Ký hiệu xếp giá'];

  const quickAccessResources: QuickAccessResource[] = [
    { logo: 'https://lic.vnu.edu.vn/upload/files/photos/2024/08/05/15/Elsevier.svg.png', title: 'CSDL Pure Elsevier', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files//sites/default/files/images_database/a3.png', title: 'ScienceDirect', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files//sites/default/files/images_database/dspace.png', title: 'Thư viện số tài liệu nội sinh', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files/photos/2023/10/01/21/doit.png', title: 'Dịch vụ Kiểm tra trùng lặp', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files/photos/2023/10/02/07/proquest.png', title: 'ProQuest', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files/photos/2024/07/11/14/koha-logo-boxed-green-nocaption.png', title: 'Tài liệu in', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files/photos/2023/10/02/09/Dataverse.png', title: 'CSDL Nghiên cứu Dataverse', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files//sites/default/files/images_database/a2_0.png', title: 'Springer', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files//sites/default/files/images_database/logo4.png', title: 'Kết nối Thư viện số dùng chung', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files/photos/2023/10/01/21/CSDLDT.png', title: 'Cơ sở dữ liệu điện tử', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files//sites/default/files/images_database/7.jpg', title: 'MathScinet', link: '#' },
    { logo: 'https://lic.vnu.edu.vn/upload/files//sites/default/files/images_database/4.jpg', title: 'World Scientific', link: '#' },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
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
            Sau khi nhập vào cụm từ tìm kiếm, bạn có thể chọn một trong các tiêu chí dưới đây để kết quả tìm trả về chính xác hơn.
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
    
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">TRUY CẬP NHANH</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {quickAccessResources.map((resource, index) => (
                <QuickAccessCard key={index} {...resource} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}