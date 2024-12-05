"use client";
import {
  deleteReservation,
  updateQuantityReservation,
} from "@/components/redux/feature/documentReservation";
import { AppDispatch, AppUseSelector } from "@/components/redux/store";
import {
  DocumentWithoutVariant,
  PreviewDocumentWithoutVariant,
} from "@/dtos/documents";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getWebViewLinkFromWebContentLink } from "@/utils/handleImage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const [reservations, setReservations] =
    useState<PreviewDocumentWithoutVariant[]>();
  const reservationsLocal = AppUseSelector(
    (state) => state.ReservationReducer.value
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState<boolean>(true);
  const UpdateQuantity = (doc_id: number, isIncrease: boolean) => {
    let index = reservationsLocal.findIndex(
      (item) => item.document_id == doc_id
    );
    if (index == -1) return;
    if (!isIncrease && reservationsLocal[index].quantity == 1) return;
    dispatch(
      updateQuantityReservation({
        document_id: doc_id,
        quantity: isIncrease
          ? reservationsLocal[index].quantity + 1
          : reservationsLocal[index].quantity - 1,
      })
    );
  };
  const DeleteReservation = async (doc_id: number) => {
    dispatch(deleteReservation(doc_id));
  };
  const handleReservation = async () => {
    router.push("/create_loan_request");
  };
  const GetData = async () => {
    if (reservationsLocal.length == 0) return SetIsLoading(false);
    const srPr = new URLSearchParams();
    reservationsLocal.forEach((item) => {
      srPr.append("ids", item.document_id + "");
    });
    try {
      let res = await fetch(
        GenerateBackendURL("document/get_preview_with_ids?" + srPr.toString())
      );
      if (res.ok) {
        setReservations(await res.json());
      }
      SetIsLoading(false);
    } catch (error) {
      console.log(error);
      SetIsLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, [reservationsLocal]);
  return (
    <>
      {!isLoading ? (
        reservations && reservations?.length != 0 ? (
          <div className=" bg-gray-100 pt-10 rounded">
            <h1 className="mb-10 text-center text-2xl font-bold ">
              Danh sách chờ mượn
            </h1>
            <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {reservations.map((item) => {
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
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100">
                            <span
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                              onClick={() =>
                                UpdateQuantity(item.document_id, false)
                              }
                            >
                              {" "}
                              -{" "}
                            </span>
                            <input
                              className="h-8 w-10 border bg-white text-center text-xs outline-none p-0 "
                              type="number"
                              value={
                                reservationsLocal.find(
                                  (it) => item.document_id == it.document_id
                                )?.quantity || 1
                              }
                            />
                            <span
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                              onClick={() =>
                                UpdateQuantity(item.document_id, true)
                              }
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              className="flex items-center p-1 hover:text-red-500"
                              onClick={() =>
                                DeleteReservation(item.document_id)
                              }
                            >
                              <span className="me-2"> Xóa </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5 cursor-pointer duration-150 "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sub total */}
              <div className="md:w-1/3">
                <div className="mt-6 h-fit rounded-lg border bg-white p-6 shadow-md md:mt-2  ">
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Tổng số lượng mượn</p>
                    <div className="">
                      <p className="mb-1 text-lg font-bold">
                        {reservations.length} tài liệu
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full rounded-md bg-main py-1.5 font-medium text-blue-50 bg-blue-600 hover:bg-blue-700"
                    onClick={handleReservation}
                  >
                    Tạo lịch mượn
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center bg-white p-5 rounded">
            Không có tài liệu nào
          </p>
        )
      ) : (
        <p className="text-center bg-white p-5 rounded">Loading ...</p>
      )}
    </>
  );
}
