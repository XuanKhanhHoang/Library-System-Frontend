"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Facebook } from 'lucide-react';

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
]

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
      

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-base">Địa chỉ: Tòa nhà A8, Số 3 phố Cầu Giấy, P.Láng Thượng, Q.Đống Đa, Hà Nội.</p>
            <p className="text-base">Điện thoại: (84.24) 37663311 - Fax: (84.24) 37669613</p>
            <p className="text-base">Email: lic@utc.edu.vn </p>           
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-base hover:text-amber-200">Thể loại sách</Link></li>
              <li><Link href="/new-arrivals" className="text-base hover:text-amber-200">Sách mới</Link></li>
              <li><Link href="/events" className="text-base hover:text-amber-200">Sự kiện</Link></li>
              <li><Link href="/contact" className="text-base hover:text-amber-200">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Thống kê truy cập</h3>
            <p>Tổng số lượt truy cập: <span className="font-bold">{totalVisits}</span></p>
            <p>Số lượt truy cập trong ngày: <span className="font-bold">{dailyVisits}</span></p>
          </div>
          <div>
            
        </div>

        </div>

        
        

        <div className="mt-8 border-t border-blue-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Trung tâm thư viện UTC. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
