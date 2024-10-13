import { options } from "@/app/api/auth/[...nextauth]/options";
import BackButton from "@/components/common/backButton/BackButton";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function page() {
  let session = await getServerSession(options);
  try {
    let res = await fetch(
      GenerateBackendURL(
        "user/get_user" + "?user_id=" + session!.user?.user_info.id_user
      ),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return notFound();
    let user: {
      id_user?: number;
      name: string;
      phone_number: string;
      user_name: string;
      gender: boolean;
      id_major: number;
      id_job_title: number;
      birth_date: Date;
      is_valid: boolean;
      avatar?: string;
      job_title: {
        id_job_title: number;
        job_title_name: string;
      };
      major: {
        id_major: number;
        major_name: string;
      };
    } = await res.json();
    return (
      <>
        <div className="flex mt-2">
          <div className="w-3/12">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <img
                src={user.avatar || "/utcLogo.png"}
                alt=""
                className="h-[200px] mx-auto"
              />
            </div>
            <div className="my-4" />
          </div>
          <div className="px-4 w-9/12 mx-6">
            <div className="my-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ tên đầy đủ
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={user.name}
                readOnly
              />
            </div>
            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={user.phone_number}
                readOnly
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="user_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                className={` bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                placeholder="User Name"
                defaultValue={user.user_name}
                readOnly
              />
            </div>
            <div className="my-2 flex justify-between items-center">
              <label className=" w-2/12 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Giới tính:
              </label>
              <input
                type="text"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={user.gender ? "Nam" : "Nữ"}
                readOnly
              />
            </div>
            <div className="my-2 flex justify-between items-center">
              <label className="w-2/12 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Trạng thái:
              </label>
              <input
                type="text"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={user.gender ? "Đang hoạt động" : "Đã khóa"}
                readOnly
              />
            </div>

            <div className="my-2 flex items-center justify-between">
              <label className=" w-2/12 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Chức danh:
              </label>
              <input
                type="text"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={user.job_title.job_title_name}
                readOnly
              />
            </div>
            <div className="my-2 flex items-center justify-between">
              <label className=" w-2/12 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ngày sinh:
              </label>
              <input
                type="text"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={customFormatDate(new Date(user.birth_date))}
                readOnly
              />
            </div>
            <div className="my-2 flex items-center justify-between ">
              <label className=" w-2/12 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Khoa:
              </label>
              <input
                type="text"
                className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                defaultValue={user.major.major_name}
                readOnly
              />
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
