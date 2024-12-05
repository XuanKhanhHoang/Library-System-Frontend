"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pb-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-base">
              Địa chỉ: Tòa nhà A8, Số 3 phố Cầu Giấy, P.Láng Thượng, Q.Đống Đa,
              Hà Nội.
            </p>
            <p className="text-base">
              Điện thoại: (84.24) 37663311 - Fax: (84.24) 37669613
            </p>
            <p className="text-base">Email: lic@utc.edu.vn </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories"
                  className="text-base hover:text-amber-200"
                >
                  Thể loại sách
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-base hover:text-amber-200"
                >
                  Sách mới
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-base hover:text-amber-200">
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base hover:text-amber-200"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Thống kê truy cập</h3>
            <p>
              Tổng số lượt truy cập: <span className="font-bold">{1002}</span>
            </p>
            <p>
              Số lượt truy cập trong ngày:{" "}
              <span className="font-bold">{17}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-800 pt-8 text-center text-xs">
          <p>
            &copy; 2024 Trung tâm thư viện UTC. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
