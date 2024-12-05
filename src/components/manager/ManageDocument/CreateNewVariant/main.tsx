"use client";
import BackButton from "@/components/common/backButton/BackButton";
import AppDatePicker from "@/components/common/datePicker/DatePicker";
import { Supplier } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CreateNewVariant({
  session,
  suppliers,
  document,
}: {
  session: Session;
  suppliers: Supplier[];
  document: { document_id: string; name: string };
}) {
  const router = useRouter();
  const [variant, setVariant] = useState<{
    name: string;
    quantity: number;
    published_date: Date;
    price: number;
    isbn: string;
  }>({ isbn: "", name: "", price: 0, published_date: new Date(), quantity: 0 });
  const [createAt, setCreateAt] = useState<Date>(new Date());
  const [supplierId, setSupplierId] = useState<number>(
    suppliers[1].id_supplier || 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async () => {
    if (isLoading) return;
    if (
      variant.isbn.length < 7 ||
      variant.name.length == 0 ||
      variant.price <= 0 ||
      variant.quantity == 0
    )
      return toast.error("Vui lòng nhập đúng dữ liệu");
    setIsLoading(true);
    let dt = {
      ...variant,
      supplier_id: supplierId,
      purchase_date: createAt,
      document_id: document.document_id,
    };
    try {
      let res = await fetch(GenerateBackendURL("document/create_variant"), {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dt),
      });
      if (!res.ok) {
        setIsLoading(false);
        toast.error("Có lỗi xảy ra");
        return;
      }
      toast.success("Tạo thành công");
      router.push("/manager/documents");
      router.refresh();
      return;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="flex mb-3 items-center">
        <h1 className="text-lg w-1/2 font-bold">Mã tài liệu:</h1>
        <input
          type="text"
          defaultValue={document.document_id}
          readOnly
          className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
        />
      </div>
      <div className="flex mb-3 items-center">
        <h1 className="text-lg w-1/2 font-bold">Tên tài liệu:</h1>
        <input
          type="text"
          defaultValue={document.name}
          readOnly
          className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
        />
      </div>
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày Thêm:</h1>
          <AppDatePicker
            onChange={(date) => {
              if (!date) return;
              setCreateAt(date);
            }}
            dateConfig={{
              maxTime: new Date(),
              showTime: true,
              format: "HH:mm dd/MM/yyyy",
              selected: createAt,
            }}
          />
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Nhà cung cấp:</h1>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(Number(e.target.value))}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            {suppliers.map((item) => {
              return (
                <option value={item.id_supplier} key={item.id_supplier}>
                  {item.supplier_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">ISBN:</h1>
          <input
            type="text"
            value={variant.isbn}
            onChange={(e) =>
              setVariant({ ...variant, isbn: e.target.value.trim() })
            }
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tên biến thể:</h1>
          <input
            type="text"
            value={variant.name}
            onChange={(e) => setVariant({ ...variant, name: e.target.value })}
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Số lượng:</h1>
          <input
            type="text"
            value={variant.quantity}
            onChange={(e) =>
              setVariant({
                ...variant,
                quantity: Number(e.target.value.trim()),
              })
            }
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Giá tiền:</h1>
          <input
            type="text"
            value={variant.price}
            onChange={(e) =>
              setVariant({ ...variant, price: Number(e.target.value.trim()) })
            }
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày Xuất Bản:</h1>
          <AppDatePicker
            onChange={(date) => {
              if (!date) return;
              setVariant({ ...variant, published_date: date });
            }}
            dateConfig={{
              maxTime: new Date(),
              format: "dd/MM/yyyy",
              selected: variant.published_date,
            }}
          />
        </div>
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người Nhận:</h2>
          <div className="flex flex-col w-1/2">
            <div className="flex ">
              <h1 className=" font-medium me-5">User ID: </h1>
              <span>{session.user?.user_info.id_user}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{session.user?.user_info.name}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className={`
                 p-3 text-sm font-medium text-white rounded bg-green-600 mx-auto block mt-3`}
        >
          {isLoading ? "Loading..." : "Tiến hành biến thể"}
        </button>
      </div>
    </>
  );
}
