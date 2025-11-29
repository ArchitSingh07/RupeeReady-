import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-white/10 placeholder:text-gray-500 bg-white/5 backdrop-blur-sm flex field-sizing-content min-h-24 w-full rounded-xl border px-4 py-3 text-base text-gray-100 transition-all duration-300 outline-none md:text-sm",
        "hover:border-white/20 hover:bg-white/[0.07]",
        "focus:border-teal-500/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-teal-500/20",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
