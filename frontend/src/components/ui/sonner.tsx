"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-[#1A1A1A]/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-gray-100 group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:shadow-black/50 group-[.toaster]:rounded-xl",
          title: "group-[.toast]:text-gray-100 group-[.toast]:font-semibold",
          description: "group-[.toast]:text-gray-400",
          actionButton: "group-[.toast]:bg-gradient-to-r group-[.toast]:from-teal-500 group-[.toast]:to-cyan-500 group-[.toast]:text-black group-[.toast]:font-semibold",
          cancelButton: "group-[.toast]:bg-white/10 group-[.toast]:text-gray-300",
          success: "group-[.toaster]:border-emerald-500/30 group-[.toaster]:bg-emerald-500/10",
          error: "group-[.toaster]:border-red-500/30 group-[.toaster]:bg-red-500/10",
          warning: "group-[.toaster]:border-amber-500/30 group-[.toaster]:bg-amber-500/10",
          info: "group-[.toaster]:border-blue-500/30 group-[.toaster]:bg-blue-500/10",
        },
      }}
      style={
        {
          "--normal-bg": "#1A1A1A",
          "--normal-text": "#F5F5F5",
          "--normal-border": "rgba(255, 255, 255, 0.1)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
