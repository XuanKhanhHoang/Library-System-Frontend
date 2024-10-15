'use client';

import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { Star } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
interface HeaderProps {
  sessionProps: boolean;
  onLogout: () => void;
  userName?: string;
}


  const categories = [
    { name: 'Hài hước', link: '/categories/comedy' },
    { name: 'Lãng mạn', link: '/categories/romance' },
    { name: 'Kinh dị', link: '/categories/horror' },
    { name: 'Truyền thông', link: '/categories/media' },
    { name: 'Nấu ăn', link: '/categories/cooking' },
    { name: 'Trinh thám', link: '/categories/detective' },
    { name: 'Khoa học viễn tưởng', link: '/categories/sci-fi' },
    { name: 'Lịch sử', link: '/categories/history' },
    { name: 'Tự truyện', link: '/categories/biography' },
    { name: 'Kỹ năng sống', link: '/categories/life-skills' },
  ]

const books = [
  {
    title: "Nightshade",
    author: "Andrea Cremer",
    color: "bg-indigo-600",
    textColor: "text-white",
    buttonColor: "bg-indigo-500",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "History of Modern Architecture",
    author: "Richard Phillips",
    color: "bg-emerald-700",
    textColor: "text-white",
    buttonColor: "bg-emerald-600",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "The Happy Lemon",
    author: "Kurt Vonnegut",
    color: "bg-yellow-200",
    textColor: "text-gray-800",
    buttonColor: "bg-yellow-300",
    cover: "/placeholder.svg?height=300&width=200"
  }
]
const Header: React.FC<HeaderProps> = ({ sessionProps, onLogout, userName = 'User' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  return (
    <nav className="bg-white text-indigo-600 border-b border-amber-50 w-full">
      <div className="flex flex-wrap items-center max-w-screen-xl mx-auto  px-4 py-2.5  ">
       
        <Link href="/" className="flex flex-nowrap items-center p-2">
          <img src="/utcLogo.png" alt="UTC Logo" className="h-10 w-10 mr-2" />
          <span className="font-medium">Trung tâm thư viện UTC</span>
        </Link>

        
          <ul className="flex items-center space-x-6 pl-4">
            <li>
              <Link href="/" className=" text-blue-600  transition-colors">
                Trang chủ
              </Link>
            </li>
            <li className="relative ">
              <button
                className="flex items-center text-gray-800 hover:text-blue-600 transition-colors "
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                Thể loại
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isMegaMenuOpen && (
                <div
                  className="absolute left-0  w-screen max-w-4xl bg-white rounded-md shadow-lg py-6 px-4 z-10"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.link}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600 rounded"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link href="/shop" className="text-gray-800 hover:text-blue-600 transition-colors">
                Hướng dẫn
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-gray-800 hover:text-blue-600 transition-colors">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">
                Liên hệ
              </Link>
            </li>
          </ul>
          {sessionProps ? (
            <div className="relative ml-auto text-indigo-600 ">
              <div 
                className="flex items-center  cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <User size={24} className="mr-2" />
                <span className="font-medium">Nguyễn An</span>
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 ">
                  <ul className="py-1">
                    <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Thông tin tài khoản</li>
                    <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Sách đã thuê</li>
                    <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Sách đang thuê</li>
                    <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={onLogout}>Đăng xuất</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="p-2 flex items-center bg-red-700 hover:bg-red-600 rounded-md transition duration-300 text-"
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
          src="/bybinh1.jpg"
          alt="Library bookshelves and students"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">THIS WEEKS FEATURED BOOKS</h2>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div key={index} className={`${book.color} rounded-lg p-6 flex flex-col justify-between`}>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${book.textColor}`}>{book.title}</h3>
              <p className={`text-sm mb-2 ${book.textColor}`}>by: {book.author}</p>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${book.textColor} opacity-30`} />
                ))}
                <span className={`ml-2 text-sm ${book.textColor}`}>0 Ratings</span>
              </div>
              <p className={`text-sm mb-4 ${book.textColor}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </p>
            </div>
            <div className="flex justify-between items-end">
              <button className={`${book.buttonColor} ${book.textColor} px-4 py-2 rounded-full text-sm font-semibold`}>
                View in Book Store →
              </button>
              <div className="w-24 h-36 relative">
                <Image
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
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