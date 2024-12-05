"use client";
import { addReservation } from "@/components/redux/feature/documentReservation";
import { AppDispatch, AppUseSelector } from "@/components/redux/store";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DocumentDetailButton({
  document_id,
  quantity,
}: {
  document_id: string;
  quantity: boolean;
}) {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const reservations = AppUseSelector(
    (state) => state.ReservationReducer.value
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const markedDocuments = AppUseSelector(
    (state) => state.MarkedDocumentReducer.value
  );
  const handleLoanNow = () => {
    if (!session.data) {
      toast.warning("Vui lòng đăng nhập ");
      router.push("/auth/login");
      return;
    }
    router.push("/create_loan_request?document_id=" + document_id);
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
  const handleMark = async () => {
    if (!session.data) {
      toast.warning("Vui lòng đăng nhập ");
      router.push("/auth/login");
      return;
    }
    if (isLoading) return toast.warning("Vui lòng chờ !");

    console.log(markedDocuments);
    if (markedDocuments.findIndex((item) => item == Number(document_id)) != -1)
      return toast.warning("Tài liệu đã nằm trong danh sách đánh dấu");
    setIsLoading(true);
    try {
      let res = await fetch(GenerateBackendURL("user/add_marked_document"), {
        body: JSON.stringify({
          doc_id: document_id,
        }),
        method: "POST",
        headers: {
          Authorization: "Bearer " + session!.data?.user!.access_token.token,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (res.ok) {
        return toast.success("Thêm thành công");
      }
      return toast.error("Có lỗi xảy ra");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <div className="flex mt-4 justify-start items-center">
      <button
        type="button"
        onClick={handleMark}
        className=" focus:outline-none font-semibold text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-red-300  rounded text-base px-5 py-2.5 me-2 mb-2 "
      >
        Đánh dấu sách này
      </button>
      {quantity ? (
        <>
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
        </>
      ) : (
        <div className="  font-semibold border border-blue-500   rounded text-base px-5 py-2.5 me-2 mb-2 ">
          Sách hiện tại đang trống , Không thể mượn
        </div>
      )}
    </div>
  );
}
