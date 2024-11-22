"use client";
import { addReservation } from "@/components/redux/feature/documentReservation";
import { AppDispatch, AppUseSelector } from "@/components/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DocumentDetailButton({
  document_id,
}: {
  document_id: string;
}) {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const reservations = AppUseSelector(
    (state) => state.ReservationReducer.value
  );

  const handleLoanNow = () => {
    if (!session.data) {
      toast.warning("Vui lòng đăng nhập ");
      router.push("/auth/login");
      return;
    }
  };
  const handleAddToWaitLoanList = () => {
    if (!session.data) {
      toast.warning("Vui lòng đăng nhập ");
      router.push("/auth/login");
      return;
    }
    if (reservations.find((item) => item.document_id == Number(document_id)))
      return toast.warning("Tài liệu đã nằm trong danh sách chờ mượn");
    dispatch(
      addReservation({
        document_id: Number(document_id),
        quantity: 1,
      })
    );
    toast.success("Thêm vào danh sách chờ mượn thành công!");
  };
  return (
    <div className="flex mt-4 justify-center">
      <button
        type="button"
        onClick={handleLoanNow}
        className="focus:outline-none font-semibold text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300  rounded text-base px-5 py-2.5 me-2 mb-2 "
      >
        Mượn ngay
      </button>
      <button
        type="button"
        onClick={handleAddToWaitLoanList}
        className="focus:outline-none font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-yellow-300  rounded text-base px-5 py-2.5 me-2 mb-2 "
      >
        Thêm vào danh sách chờ mượn
      </button>
    </div>
  );
}
