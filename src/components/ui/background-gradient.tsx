import React from "react";
import { cn } from "../../lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-[22px] z-[1] transition-all duration-300",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
          "group-hover:opacity-100 opacity-75",
          "blur-xl group-hover:blur-2xl",
          animate && "animate-gradient"
        )}
      />
      <div
        className={cn(
          "relative z-[2] bg-white dark:bg-zinc-900",
          "rounded-[20px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
