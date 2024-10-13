import Link from "next/link";

export default function page() {
  return (
    <div className="w-96 rounded shadow mx-auto p-5">
      <span className="text-center mb-5 block">
        Bạn muốn tạo một tài liệu mới hay một biến thể cho một sách đã có
      </span>
      <div className="flex justify-evenly">
        <Link
          href={"./add/new_document"}
          className="p-3 bg-green-400 rounded text-white"
        >
          Một tài liệu mới
        </Link>
        <Link
          href={"./add/new_variant"}
          className="p-3 bg-blue-400 rounded text-white"
        >
          Một biến thể mới
        </Link>
      </div>
    </div>
  );
}
