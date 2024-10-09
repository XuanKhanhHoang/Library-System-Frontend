"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Facebook } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const totalVisits = 1000;
  const dailyVisits = 50;

  return (
    <footer className="bg-blue-900 text-white pb-8">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tvnam.png"
            alt="Library bookshelves and students"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-white">
            <Image
              src="/utcLogo.png"
              alt="UTCLogo"
              width={150}
              height={80}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-center mb-2">
              ĐẠI HỌC GIAO THÔNG VẬN TẢI HÀ NỘI
            </h1>
            <h2 className="text-2xl font-semibold text-center mb-8">
              TRUNG TÂM<br />
              THƯ VIỆN VÀ TRI THỨC SỐ
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="mailto:lic@utc.edu.vn" className="flex items-center bg-white bg-opacity-20 hover:bg-blue-600 text-white rounded-full px-6 py-3 transition duration-300">
              <Mail className="mr-2" size={20} />
              <span>lic@utc.edu.vn</span>
            </Link>
            <Link href="tel:02462539899" className="flex items-center bg-white bg-opacity-20 hover:bg-blue-600 text-white rounded-full px-6 py-3 transition duration-300">
              <Phone className="mr-2" size={20} />
              <span>(024) 3854 4264</span>
            </Link>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white bg-opacity-20 hover:bg-blue-600 text-white rounded-full px-6 py-3 transition duration-300">
              <Facebook className="mr-2" size={20} />
              <span>www.facebook.com</span>
            </Link>
          </div>
        </div>
      </div>

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
            <h3 className="text-lg font-semibold mb-4 text-center">Đóng góp ý kiến</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-base mb-2 ">Tên của bạn:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-500 rounded-md bg-transparent text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="email" className="text-base mb-2">Email của bạn:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-500 rounded-md bg-transparent text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-base mb-2">Nội dung góp ý:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-500 rounded-md bg-transparent text-black bg-white h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Gửi ý kiến
                </button>
              </div>
            </form>
        </div>

        </div>

        
        

        <div className="mt-8 border-t border-blue-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Trung tâm thư viện UTC. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
