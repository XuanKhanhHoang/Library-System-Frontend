"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const books = [
  {
    title: "Bash and Lucy Fetch Confidence",
    author: "Lisa & Michael Cohn",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "Shattered",
    author: "Dick Francis",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "Freefall",
    author: "Peter Cawdron",
    cover: "/placeholder.svg?height=300&width=200"
  },
  {
    title: "Boring Girls, A Novel",
    author: "Sara Taylor",
    cover: "/placeholder.svg?height=300&width=200"
  }
];

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalVisits = 1000;
  const dailyVisits = 50;

  return (
    <footer className="bg-white text-black pb-8">
      <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white p-8 rounded-lg overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">TOP4 sách</h2>
              <p className="text-xl opacity-80">phổ biến nhất</p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-purple-600 transition-colors duration-300">
              View all
            </button>
          </div>
          <div className="flex flex-wrap -mx-4 justify-center md:justify-start">
            {books.map((book, index) => (
              <div key={index} className="px-4 mb-8 md:mb-0 w-full sm:w-1/2 md:w-1/4 flex flex-col items-center">
                <div className="relative w-48 h-72 mb-4 transform transition-transform duration-300 hover:scale-105">
                  <Image
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">{book.title}</h3>
                <p className="text-sm opacity-80 text-center">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Image src="/utcLogo.png?height=50&width=50" alt="UTC Logo" width={50} height={50} className="mr-3" />
              <span className="text-2xl font-bold text-blue-500">Thư viện trường đại học giao thông vận tải</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Về chúng tôi
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              TTTT-TV tổ chức kho mở tại các phòng đọc, tạo điều kiện thuận lợi cho bạn đọc có thể tiếp cận trực tiếp với tài liệu một cách nhanh chóng, kịp thời.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-700">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Thống kê truy cập
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <h4 className="text-base text-gray-500 mb-4">
                  Tổng số lượt truy cập: 1000
                </h4>
                <p className="text-gray-500">Số lượt truy cập trong ngày: 50</p>
              </li>
              <li>
                <h4 className="text-base text-gray-500 mb-4">Time now (UTC+ 7): {time.toLocaleTimeString()} </h4>
               
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              GENRES
            </h3>
            <ul className="mt-4 space-y-4">
              {['Action', 'Comedy', 'Drama', 'E-Books', 'Horror', 'Kids', 'Romantic Comedy', 'Sci-Fi'].map((genre) => (
                <li key={genre}>
                  <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              CONTACT
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-500">Địa chỉ: Tòa nhà A8,</li>
              <li className="text-base text-gray-500">Số 3 phố Cầu Giấy, P.Láng Thượng,</li>
              <li className="text-base text-gray-500">Q.Đống Đa, Hà Nội</li>
              <li className="text-base text-gray-500">Điện thoại: (84.24) 37663311</li>
              <li>
                <Link href="mailto:lic@utc.edu.vn" className="text-base text-gray-500 hover:text-gray-900">
                  Email: lic@utc.edu.vn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </footer>
  );
}
