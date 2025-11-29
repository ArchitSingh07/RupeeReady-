import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-gray-300 placeholder:text-gray-500 selection:bg-teal-500/30 selection:text-white bg-white/5 backdrop-blur-sm border-white/10 flex h-11 w-full min-w-0 rounded-xl border px-4 py-2.5 text-base text-gray-100 transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-teal-500/20 file:rounded-lg file:px-3 file:text-sm file:font-medium file:text-teal-400 file:cursor-pointer file:hover:bg-teal-500/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:border-white/20 hover:bg-white/[0.07]",
        "focus:border-teal-500/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-teal-500/20",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500/50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
