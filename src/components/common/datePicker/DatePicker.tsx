"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
export default function AppDatePicker({
  onChange,
  dateConfig,
  className,
  name,
}: {
  onChange: (date1: Date) => void;
  dateConfig?: {
    initDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    showTime?: boolean;
    minTime?: Date;
    maxTime?: Date;
    format?: string;
    selected?: Date;
  };
  name?: string;
  className?: string;
}) {
  return (
    <DatePicker
      selected={dateConfig?.selected || new Date()}
      onChange={(date) => onChange(date || new Date())}
      locale={vi}
      dateFormat={dateConfig?.format || "dd/MM/yyyy"}
      minDate={dateConfig?.minDate || new Date(1960, 0, 1)}
      maxDate={dateConfig?.maxDate || new Date()}
      showTimeSelect={dateConfig?.showTime || false}
      calendarClassName=" !flex flex-row"
      minTime={dateConfig?.minTime || new Date(1960, 0, 1, 7, 0, 0)}
      maxTime={dateConfig?.maxTime || new Date(1960, 0, 1, 17, 0, 0)}
      name={name}
      className={
        className +
        "  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2"
      }
    />
  );
}
