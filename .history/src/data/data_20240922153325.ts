interface IBook {
  title: string;
  author: string;
  publish_year: number;
  publis_house: string;
  total_page: number;
  description: string;
}

const bookList: IBook[] = [
  {
    title: "25 Độ Âm",
    author: "Thảo Trang",
    publish_year: 2024,
    publis_house: "	Phụ Nữ Việt Nam",
    total_page: 250,
    description:
      "Theo chân nhân vật Lam, hành trình sinh tử trên con đường vượt biên của cô gái từ Nga tới Pháp và cuối cùng là Anh sẽ được lần lượt tái hiện vô cùng chân thực và tàn khốc. Đồng hành với Lam là Đức Hà Nội, bà Loan, ông Sang, Phượng và Duy Anh. Trên mỗi cung đường vượt biên, họ sẽ làm quen, gặp gỡ đồng bào mình và cả những con người không cùng màu da, sắc tộc. Mỗi người ra đi với những lí do, hoàn cảnh đưa đẩy khác nhau. Đối với Lam, bước vào con đường này là sự nối dài chuỗi bi kịch của cuộc đời. Lam có ước mơ, hoài bão, khát vọng và ý chí sống mạnh mẽ, nhưng cô lại không có quyền chọn lựa cuộc đời mình, là con rối để người khác giật dây, buộc phải dấn thân vào một hành trình không biết trước kết cục. Tuy nhiên, không ít những con người, họ lựa chọn ra đi vì khát vọng đổi đời, nó lớn lao và dữ dội đến mức, họ sẵn sàng lao đi như con thiêu thân, dù có thể bị ánh lửa thiêu rụi, đánh đổi cả nhân hình và nhân dạng, vẫn khát khao nơi miền đất hứa ấy họ sẽ ngẩng cao đầu hãnh diện với người đời. Nhưng họ nào đâu biết rằng, kể từ khi đặt chân vào hành trình ấy đã là con đường chết chóc, nơi mà tử thần luôn rình rập những kẻ “bán mạng”, kết cục cuối cùng đang đón đợi họ là cánh cửa địa ngục.Tác giả Thảo Trang từng là sinh viên chuyên ngành Xã hội học, đề tài nghiên cứu khoa học của cô chính là khai thác góc nhìn xã hội trong những người vượt biên. Hơn 4 năm tìm hiểu thông tin, 200 cuộc phỏng vấn, 23 kg tài liệu, sự nỗ lực và dày công nghiên cứu đã trở thành chất liệu viết lên 25 độ âm. Sau Tết ở làng Địa Ngục, người đọc lại lần nữa nhận ra phong cách viết rùng rợn và đậm chất điện ảnh trong 25 độ âm, tác giả đã khéo léo đan cài những nút thắt, nút mở và hàng loạt tình tiết hư cấu khơi gợi sự tò mò. Theo từng cung đường vượt biên, người đọc sẽ giống như thực sự tham gia vào một trò chơi sinh tồn, mà cái chết có thể ập đến bất cứ lúc nào, dồn dập, tàn khốc và đau đớn, dường như không chừa cho ai một lối thoát. Thảo Trang chỉ muốn nói nhắn nhủ tới bạn đọc rằng, với những ai còn thắc mắc và hoài nghi, thì con đường vượt biên ấy chính là như thế, nếu tương lai do chính bạn lựa chọn, hãy thử nghĩ xem có đáng đánh đổi để bước lên con đường ấy hay không?",
  },
];
