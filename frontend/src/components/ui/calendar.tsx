"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-[#141414]/80 backdrop-blur-xl rounded-xl border border-white/10", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-semibold text-gray-100",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "size-8 bg-white/5 border border-white/10 rounded-lg p-0 text-gray-400 hover:text-teal-400 hover:bg-white/10 hover:border-teal-500/50 transition-all duration-200",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-gray-500 rounded-lg w-9 font-medium text-[0.75rem] uppercase",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-teal-500/10 [&:has([aria-selected].day-range-end)]:rounded-r-lg",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-lg [&:has(>.day-range-start)]:rounded-l-lg first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg"
            : "[&:has([aria-selected])]:rounded-lg",
        ),
        day: cn(
          "size-9 p-0 font-normal text-gray-300 hover:bg-white/10 hover:text-teal-400 rounded-lg transition-all duration-200 aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-gradient-to-r aria-selected:from-teal-500 aria-selected:to-cyan-500 aria-selected:text-black",
        day_range_end:
          "day-range-end aria-selected:bg-gradient-to-r aria-selected:from-teal-500 aria-selected:to-cyan-500 aria-selected:text-black",
        day_selected:
          "bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:from-teal-400 hover:to-cyan-400 hover:text-black focus:from-teal-500 focus:to-cyan-500 focus:text-black shadow-lg shadow-teal-500/30",
        day_today: "bg-white/10 text-teal-400 font-semibold",
        day_outside:
          "day-outside text-gray-600 aria-selected:text-gray-400",
        day_disabled: "text-gray-600 opacity-50",
        day_range_middle:
          "aria-selected:bg-teal-500/10 aria-selected:text-teal-400",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
