import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-teal-500 to-cyan-500 text-black shadow-sm shadow-teal-500/25",
        secondary:
          "border-white/10 bg-white/10 text-gray-200 backdrop-blur-sm",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm shadow-red-500/25",
        outline:
          "border-white/20 text-gray-300 hover:border-teal-500/50 hover:text-teal-400 bg-transparent",
        success:
          "border-transparent bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-sm shadow-emerald-500/25",
        warning:
          "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-sm shadow-amber-500/25",
        info:
          "border-transparent bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm shadow-blue-500/25",
        premium:
          "border-transparent bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-sm shadow-purple-500/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
