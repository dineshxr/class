import React from "react";
import { cn } from "../../lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-xl overflow-hidden",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
        "transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]",
        "shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
