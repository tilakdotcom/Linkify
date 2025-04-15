import { cn } from "@/lib/utils";
import React from "react";

interface CommonDivProps {
  className?: string;
  children: React.ReactNode;
}

export default function CommonDiv({ children, className }: CommonDivProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-gray-800 to-gray-900 text-white/80   py-1 px-1 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out  hover:text-white border-[1px] border-gray-500 text-sm md:text-base flex items-center gap-1",
        className
      )}
    >
      {children}
    </div>
  );
}
