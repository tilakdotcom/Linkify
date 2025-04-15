import { cn } from "@/lib/utils";
import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}
export function CustomButtonBlue({ children, className }: CustomButtonProps) {
  return (
    <button
      className={cn(
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white/80   py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:text-white  text-sm md:text-base",
        className
      )}
    >
      {children}
    </button>
  );
}
export function CustomButtonGray({ children, className }: CustomButtonProps) {
  return (
    <button
      className={cn(
        "bg-gradient-to-r from-gray-600 to-gray-700 text-white/80   py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:text-white border-[1px] border-gray-500 text-sm md:text-base",
        className
      )}
    >
      {children}
    </button>
  );
}
