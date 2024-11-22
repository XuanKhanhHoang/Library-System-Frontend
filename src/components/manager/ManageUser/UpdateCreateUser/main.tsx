"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { isValidVietnamesePhoneNumber } from "@/utils/validate";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  extractFileIdFromDiveLink,
  getWebViewLinkFromDiveId,
} from "@/utils/handleImage";

export type UserFullDetailProps = {
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
};
type UserFullDetail = {
  name: string;
  phone_number: string;
  user_name: string;
  pass_word: string;
  gender: boolean;
  is_valid?: boolean;
  id_major: number;
  id_job_title: number;
  birth_date: Date;
};
export default function UpdateEditUser({
  accessToken,
  userProp,
}: {
  userProp?: UserFullDetailProps;
  accessToken: string;
}) {
  const defaultUser = {
    name: "",
    gender: true,
    id_job_title: 1,
    id_major: 1,
    pass_word: "",
    phone_number: "",
    user_name: "",
    birth_date: new Date(),
  };
  const [image, setImage] = useState<string>(
    userProp?.avatar
      ? getWebViewLinkFromDiveId(
          extractFileIdFromDiveLink(userProp.avatar) as string
        )
      : "/utcLogo.png"
  );
  const [user, setUser] = useState<UserFullDetail>(
    userProp
      ? {
          birth_date: userProp.birth_date,
          gender: userProp.gender,
          id_job_title: userProp.id_job_title,
          id_major: userProp.id_major,
          name: userProp.name,
          phone_number: userProp.phone_number,
          user_name: userProp.user_name,
          pass_word: "",
          is_valid: userProp.is_valid,
        }
      : defaultUser
  );
  const isCheck = useRef(false);
  const router = useRouter();
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (isInValid()) return toast.error("Vui lòng nhập đúng thông tin");
    setIsLoading(true);
    let frm = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      if (value instanceof Date) {
        frm.append(key, value.toISOString());
      } else {
        if (key != "pass_word") frm.append(key, value.toString());
        else {
          if (user.pass_word.length != 0) frm.append(key, value.toString());
        }
      }
    });
    if (image != "/utcLogo.png") {
      let fileInput = document.getElementById("avatar") as HTMLInputElement;
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];
        if (file) {
          frm.append("avatar", file);
        }
      }
    }
    if (userProp) frm.append("id_user", userProp!.id_user + "");
    try {
      let res = await fetch(
        GenerateBackendURL(
          "user/" + (userProp ? "update_user" : "manager/create_user")
        ),
        {
          method: userProp ? "PUT" : "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          body: frm,
        }
      );
      if (res.ok) {
        toast.success(userProp ? "Cập nhật" : "Tạo" + " user thành công!");
        router.push("/manager/users");
        router.refresh();
        return;
      } else if (res.status == 409) {
        toast.error("User Name hoặc số điện thoại đã tồn tại !");
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        toast.error("Có lỗi xảy ra !");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra !");
      setIsLoading(false);
    }
  };
  const isInValid = () => {
    if (userProp) {
      return (
        user.name.length == 0 ||
        user.user_name.length == 0 ||
        !isValidVietnamesePhoneNumber(user.phone_number) ||
        user.name.length == 0 ||
        (user.pass_word.length != 0 && user.pass_word.length < 6) ||
        user.pass_word != rePassword
      );
    }
    return (
      user.name.length == 0 ||
      user.user_name.length == 0 ||
      !isValidVietnamesePhoneNumber(user.phone_number) ||
      user.name.length == 0 ||
      user.pass_word.length < 6 ||
      rePassword.length < 6 ||
      user.pass_word != rePassword
    );
  };
  useEffect(() => {
    if (isCheck.current) return;
    isCheck.current = true;
  }, [user, rePassword]);

  return (
    <div className="w-full rounded-lg shadow  ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {userProp ? "Sửa" : "Tạo"} tài khoản
        </h1>
        <hr />
        <form action={"#"} onSubmit={onSubmit}>
          <div className="flex">
            <div className="w-3/12">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <img
                  src={image || "/logo.png"}
                  alt=""
                  className="h-[200px] mx-auto"
                />
                <label
                  htmlFor="avatar"
                  className=" mt-4 align-mdle cursor-pointer select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block mx-auto"
                >
                  Thay đổi ảnh đại diện
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className="invisible "
                  accept=".jpeg,.png,.webp"
                  onChange={onImageChange}
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
                  className={`${
                    !isCheck.current || user.name.length != 0
                      ? " border-gray-300 "
                      : "border-red-400 "
                  } border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Họ tên người dùng"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                {isCheck.current && user.name.length == 0 && (
                  <p className="text-red-400 text-xs p-1">
                    Họ tên không được để trống
                  </p>
                )}
              </div>
              <div className="my-2">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  className={`${
                    !isCheck.current ||
                    isValidVietnamesePhoneNumber(user.phone_number)
                      ? " border-gray-300 "
                      : "border-red-400 "
                  } bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Số điện thoại"
                  value={user.phone_number}
                  onChange={(e) =>
                    setUser({ ...user, phone_number: e.target.value })
                  }
                />
                {isCheck.current &&
                  !isValidVietnamesePhoneNumber(user.phone_number) && (
                    <p className="text-red-400 text-xs p-1">
                      Số điện thoại không hợp lệ
                    </p>
                  )}
              </div>
              <div className="my-2 flex">
                <div className="block me-2 text-sm font-medium text-gray-900">
                  Giới tính:
                </div>
                <div className="flex mx-3 items-center mb-4">
                  <input
                    id="gender-radio-1"
                    type="radio"
                    value="true"
                    name="gender"
                    checked={user.gender}
                    onChange={() => setUser({ ...user, gender: true })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="gender-radio-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nam
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="gender-radio-2"
                    type="radio"
                    value="false"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={!user.gender}
                    onChange={() => setUser({ ...user, gender: false })}
                  />
                  <label
                    htmlFor="gender-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nữ
                  </label>
                </div>
              </div>
              {userProp != undefined && (
                <div className="my-2 flex">
                  <div className="block me-2 text-sm font-medium text-gray-900">
                    Trạng thái:
                  </div>
                  <div className="flex mx-3 items-center mb-4">
                    <input
                      id="isvalid-radio-1"
                      type="radio"
                      value="true"
                      name="isvalid"
                      checked={user.is_valid}
                      onChange={() => setUser({ ...user, is_valid: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="gender-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Hợp lệ
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="isvalid-radio-2"
                      type="radio"
                      value="false"
                      name="isvalid"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={!user.is_valid}
                      onChange={() => setUser({ ...user, is_valid: false })}
                    />
                    <label
                      htmlFor="gender-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Đã khóa
                    </label>
                  </div>
                </div>
              )}
              <div className="my-2 flex items-center">
                <label className="block mb-2 w-32 text-sm font-medium text-gray-900 text-nowrap">
                  Chọn chức danh:
                </label>

                <select
                  name="job_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2 me-2"
                  value={user.id_job_title}
                  onChange={(e) =>
                    setUser({ ...user, id_job_title: Number(e.target.value) })
                  }
                >
                  <option value="1">Sinh viên</option>
                  <option value="2">Giảng viên</option>
                  <option value="3">VIP</option>
                </select>
              </div>
              <div className="my-2 flex items-center">
                <label className="block mb-2 w-32  text-sm font-medium text-gray-900 text-nowrap">
                  Chọn ngày sinh:
                </label>
                <DatePicker
                  selected={user.birth_date}
                  onChange={(date1) =>
                    setUser({ ...user, birth_date: date1 || user.birth_date })
                  }
                  locale={vi}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date(1960, 0, 1)}
                  maxDate={new Date()}
                  name="birth_date"
                  className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2"
                />
              </div>
              <div className="my-2 flex items-center">
                <label className="block mb-2 w-32 text-sm font-medium text-gray-900 text-nowrap">
                  Chọn khoa:
                </label>

                <select
                  name="major"
                  value={user.id_major}
                  onChange={(e) =>
                    setUser({ ...user, id_major: Number(e.target.value) })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2 me-2"
                >
                  <option value="1">IT</option>
                  <option value="2">Công trình</option>
                  <option value="2">Kinh tế</option>
                  <option value="3">VIP</option>
                </select>
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
                  className={`${
                    !isCheck.current || user.user_name.length != 0
                      ? " border-gray-300 "
                      : "border-red-400 "
                  } bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="User Name"
                  value={user.user_name}
                  onChange={(e) =>
                    setUser({ ...user, user_name: e.target.value })
                  }
                />
                {isCheck.current && user.user_name.length == 0 && (
                  <p className="text-red-400 text-xs p-1">
                    User Name không được để trống
                  </p>
                )}
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className={`${
                    isCheck.current &&
                    (userProp ? user.pass_word.length != 0 : true) &&
                    (user.pass_word.length < 6 || user.pass_word != rePassword)
                      ? "border-red-400 "
                      : " border-gray-300 "
                  } bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Giữ lại mật khẩu"
                  value={user.pass_word}
                  onChange={(e) =>
                    setUser({ ...user, pass_word: e.target.value })
                  }
                />
                {isCheck.current &&
                  (userProp ? user.pass_word.length != 0 : true) &&
                  (user.pass_word.length < 6 ||
                    user.pass_word != rePassword) && (
                    <p className="text-red-400 text-xs p-1">
                      Mật khẩu quá ngắn hoặc không khớp
                    </p>
                  )}
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="text"
                  className={`${
                    isCheck.current &&
                    (userProp ? user.pass_word.length != 0 : true) &&
                    (rePassword.length < 6 || user.pass_word != rePassword)
                      ? "border-red-400 "
                      : " border-gray-300 "
                  } bg-gray-50 border  text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Giữ lại mật khẩu"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                {isCheck.current &&
                  (userProp ? user.pass_word.length != 0 : true) &&
                  (rePassword.length < 6 || user.pass_word != rePassword) && (
                    <p className="text-red-400 text-xs p-1">
                      Mật khẩu quá ngắn hoặc không khớp
                    </p>
                  )}
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <button
            className={`
                 p-3 text-sm font-medium text-white rounded bg-blue-600 mx-auto block mt-3`}
            type="submit"
          >
            Tiến hành {userProp ? "sửa" : "thêm"} tài khoản
          </button>
        </form>
      </div>
    </div>
  );
}
