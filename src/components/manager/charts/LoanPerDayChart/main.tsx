"use client";
import AppDatePicker from "@/components/common/datePicker/DatePicker";
import useDebounce from "@/hooks/useDebounce";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { customFormatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
export default function LoanPerDayChart({
  max_date,
  min_date,
  data,
}: {
  min_date?: string;
  max_date?: string;
  data: {
    quantity: number;
    create_at: string;
  }[];
}) {
  data = data.map((item) => ({
    create_at: customFormatDate(new Date(item.create_at), false),
    quantity: item.quantity,
  }));
  const searchPr = new URLSearchParams();
  if (min_date) searchPr.append("min_date", min_date);
  if (max_date) searchPr.append("max_date", max_date);
  const [minDate, setMinDate] = useState<string | undefined>(
    min_date ? decodeURIComponent(min_date) : undefined
  );
  const [maxDate, setMaxDate] = useState<string | undefined>(
    max_date ? decodeURIComponent(max_date) : undefined
  );
  const router = useRouter();
  const minDateDebounce = useDebounce<String | undefined>(minDate, 2000);
  const maxDateDebounce = useDebounce<String | undefined>(maxDate, 2000);
  useDidMountEffect(() => {
    if (!minDate) searchPr.delete("min_date");
    else searchPr.set("min_date", minDate);
    if (!maxDate) searchPr.delete("max_date");
    else searchPr.set("max_date", maxDate);

    router.push(`/manager/loan_per_day_chart?${searchPr.toString()}`);
  }, [maxDateDebounce, minDateDebounce]);
  return (
    <div className="w-full flex flex-col">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="create_at" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#8884d8"
            strokeWidth={2}
            name="Số lượng"
          />
        </LineChart>
      </ResponsiveContainer>
      <h2 className="text-center font-semibold mt-3 text-lg">
        Biểu đồ số lượng mượn mỗi ngày
      </h2>
      <hr className="my-2" />
      <div className="flex items-center ">
        <h3 className="font-semibold mb-2 mx-3 me-14">
          Chọn khoảng thời gian:{" "}
        </h3>
        <div className="my-2 mx-2">
          <h3 className="font-semibold mb-2">Ngày nhận từ </h3>
          <AppDatePicker
            onChange={(dat) => {
              if (!dat) return;
              setMinDate(encodeURIComponent(dat.toLocaleDateString()));
            }}
            dateConfig={{
              initDate: min_date
                ? new Date(decodeURIComponent(min_date))
                : undefined,
              selected: min_date
                ? new Date(decodeURIComponent(min_date))
                : new Date("1/1/2000"),
            }}
            className="!w-44"
          />
        </div>
        <div className="my-2 mx-2">
          <h3 className="font-semibold mb-2">Ngày nhận tới </h3>

          <AppDatePicker
            onChange={(dat) => {
              if (!dat) return;
              setMaxDate(encodeURIComponent(dat.toLocaleDateString()));
            }}
            dateConfig={{
              initDate: max_date
                ? new Date(decodeURIComponent(max_date))
                : undefined,
              minDate: min_date
                ? new Date(decodeURIComponent(min_date))
                : new Date("1/1/2000"),
              selected: max_date
                ? new Date(decodeURIComponent(max_date))
                : new Date(),
            }}
            className="!w-44"
          />
        </div>
      </div>
    </div>
  );
}
