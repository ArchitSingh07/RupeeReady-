import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white/5 border-white/10 text-gray-100 [&>svg]:text-teal-400",
        destructive:
          "bg-red-500/10 border-red-500/30 text-red-200 [&>svg]:text-red-400 *:data-[slot=alert-description]:text-red-300/80",
        success:
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-200 [&>svg]:text-emerald-400 *:data-[slot=alert-description]:text-emerald-300/80",
        warning:
          "bg-amber-500/10 border-amber-500/30 text-amber-200 [&>svg]:text-amber-400 *:data-[slot=alert-description]:text-amber-300/80",
        info:
          "bg-blue-500/10 border-blue-500/30 text-blue-200 [&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-300/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight text-white",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-gray-400 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
