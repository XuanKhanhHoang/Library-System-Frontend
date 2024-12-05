"use client";
import AppDatePicker from "@/components/common/datePicker/DatePicker";
import { emptyReservations } from "@/components/redux/feature/documentReservation";
import { AppDispatch, AppUseSelector } from "@/components/redux/store";
import { PreviewDocumentWithoutVariant } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getFutureDate, increaseDayFromNow } from "@/utils/date";
import { getWebViewLinkFromWebContentLink } from "@/utils/handleImage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CreateLoanRequest({
  document_id,
  token,
}: {
  token: string;
  document_id?: string;
}) {
  const [reservations, setReservation] = useState<
    | (PreviewDocumentWithoutVariant & {
        quantity: number;
      })[]
    | undefined
  >();
  const localData = AppUseSelector((state) => state.ReservationReducer.value);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMaking, setIsMaking] = useState<boolean>(false);
  const [expected_date, setExpected_date] = useState<Date>(
    increaseDayFromNow(3)
  );
  const [loan_term, setLoan_term] = useState<3 | 6 | 9 | 12 | 24>(3);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    GetData();
  }, [localData]);
  const handleMakeReservation = async () => {
    if (!reservations || reservations.length == 0) return;
    if (isMaking) return toast("Vui lòng chờ", { autoClose: 300 });
    setIsMaking(true);
    let items = reservations.map((item) => ({
      document_id: item.document_id,
      quantity: item.quantity,
    }));
    try {
      console.log(
        token,
        JSON.stringify({
          create_at: encodeURIComponent(new Date().toLocaleString()),
          expected_date: encodeURIComponent(
            getFutureDate(loan_term).toLocaleDateString()
          ),
          documents: items,
        })
      );
      let res = await fetch(
        GenerateBackendURL("loan-request/create_loan_request"),
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            create_at: encodeURIComponent(new Date().toLocaleDateString()),
            expected_date: encodeURIComponent(
              getFutureDate(loan_term).toLocaleDateString()
            ),
            documents: JSON.stringify(items),
          }),
        }
      );
      if (res.ok) {
        toast.success("Đặt lịch mượn thành công!");
        dispatch(emptyReservations());
        router.push("/");
        router.refresh();
        return;
      } else {
        toast.error("Có lỗi xảy ra , vui lòng kiểm tra lại");
        setIsMaking(false);
      }
    } catch (error) {
      console.log(error);
      setIsMaking(false);
      toast.error("Có lỗi xảy ra , vui lòng kiểm tra lại ");
    }
  };
  const GetData = async () => {
    let data: number[];
    if (document_id) {
      data = [Number(document_id)];
    } else {
      data = localData.map((item) => item.document_id);
    }
    const beSearchParams = new URLSearchParams();
    data.forEach((item) => beSearchParams.append("ids", item + ""));
    try {
      let res = await fetch(
        GenerateBackendURL(
          "document/get_preview_with_ids?" + beSearchParams.toString()
        )
      );
      if (res.ok) {
        const result: PreviewDocumentWithoutVariant[] = await res.json();
        if (document_id) {
          setReservation([{ ...result[0], quantity: 1 }]);
          setIsLoading(false);
          return;
        }
        setReservation(
          result.map((item) => {
            return {
              ...item,
              quantity:
                localData.find((i) => i.document_id == item.document_id)
                  ?.quantity || 1,
            };
          })
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        {!isLoading ? (
          reservations && reservations.length != 0 ? (
            reservations.map((item) => {
              return (
                <div
                  key={item.document_id}
                  className="justify-between mb-6 rounded-lg bg-white md:p-6 p-2 shadow-md flex sm:justify-start"
                >
                  <a
                    href={"/document/" + item}
                    className="m-auto min-w-[100px]"
                  >
                    <img
                      src={
                        getWebViewLinkFromWebContentLink(item.image) ||
                        "/utcLogo.png"
                      }
                      alt="product-image"
                      className="w-auto rounded-lg max-h-[100px] mx-auto "
                    />
                  </a>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.document_name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        Tác giả:{" "}
                        <span className="text-base">
                          {item.author.author_name}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-gray-700">
                        Nhà Xuất Bản:{" "}
                        <span className="text-base">
                          {item.publisher.publisher_name}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-gray-700">
                        Số lượng:{" "}
                        <span className="text-base">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-3 w-full text-center">Có lỗi xảy ra</p>
          )
        ) : (
          <p className="p-3 w-full text-center">Loading ...</p>
        )}
      </div>
      <div className="w-1/2 py-2 px-4 flex flex-col">
        <div className=" w-full flex flex-row items-center justify-between">
          <h3 className="font-semibold me-2">Ngày nhận nhận sách dự kiến: </h3>
          <AppDatePicker
            onChange={(dat) => {
              if (!dat) return;
              setExpected_date(dat);
            }}
            dateConfig={{
              maxDate: increaseDayFromNow(14),
              minDate: increaseDayFromNow(3),
              selected: expected_date || new Date(),
            }}
            className="!w-full"
          />
        </div>
        {/* <div className=" w-full my-3 flex flex-row items-center justify-between">
          <h3 className="font-semibold me-2">Kì hạn mượn: </h3>
          <select
            className=" w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2"
            onChange={(e) => {
              setLoan_term(Number(e.target.value) as any);
            }}
            value={loan_term}
          >
            <option value="3">3 tháng</option>
            <option value="6">6 tháng</option>
            <option value="9">9 tháng</option>
            <option value="12">12 tháng</option>
            <option value="24">24 tháng</option>
          </select>
        </div> */}
        <hr className="my-4" />
        <button
          onClick={handleMakeReservation}
          className="mt-6 w-full rounded-md bg-main py-1.5 font-medium text-blue-50 bg-blue-600 hover:bg-blue-700"
        >
          {isMaking ? "Đang tạo ..." : "Tiến hành mượn"}{" "}
        </button>
      </div>
    </div>
  );
}
