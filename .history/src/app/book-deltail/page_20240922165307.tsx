import React from "react";

const BookDeltail = () => {
  return (
    <div className="mt-[20px]">
      <div className="flex">
        <div className="w-[30%] ">
          <img
            src="https://cdn0.fahasa.com/media/catalog/product/9/7/9786043651591_1.jpg"
            alt="123"
          />
        </div>
        <div className="w-[70%]">
          <div>
            <h1 className="text-[30px]">Lén Nhặt Chuyện Đời</h1>
          </div>
          <div className="flex flex-wrap">
            <span className="w-1/2 p-2">Nhà xuất bản: Hà Nội</span>
            <span className="w-1/2 p-2">Tác giả: Mộc Trầm</span>
            <span className="w-1/2 p-2">Năm XB: 2022</span>
            <span className="w-1/2 p-2">Số trang: 213</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDeltail;
