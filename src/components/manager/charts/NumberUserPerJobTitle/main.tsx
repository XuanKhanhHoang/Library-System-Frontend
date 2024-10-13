"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
export default function NumberUserPerJobTitle({
  data,
}: {
  data: {
    quantity: number;
    job_title_name: string;
  }[];
}) {
  const colors = [
    "#8884d8",
    "#FA8072",
    "#AF69EE",
    "#3DED97",
    "#3AC7EB",
    "#F9A603",
    "#FF4500",
    "#FFD700",
    "#2E8B57",
    "#8A2BE2",
  ];
  const legendItems = data.map((entry, index) => (
    <li key={`legend-${index}`} className="flex items-center">
      <div
        className="w-4 h-2 rounded-sm me-2"
        style={{ background: colors[index % colors.length] }}
      ></div>
      <span className="font-medium text-sm">{entry.job_title_name}</span>
    </li>
  ));
  return (
    <div className="flex justify-center w-full mt-2 items-center">
      <div className="w-1/2 flex flex-col">
        <ResponsiveContainer width={"100%"} height={250}>
          <PieChart width={300} height={200}>
            <Pie
              data={data}
              dataKey="quantity"
              nameKey="job_title_name"
              cx="50%"
              cy="50%"
              fill="#8884d8"
              label
              className={"cursor-pointer"}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index]}
                  className={"bg-red"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <h2 className="text-center font-semibold mt-3 text-lg">
          Biểu đồ số người dùng trên mỗi chức danh
        </h2>
      </div>

      <ul>{legendItems}</ul>
    </div>
  );
}
