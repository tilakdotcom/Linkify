import { cn } from "@/common/lib/utils";
import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  navigateTo?: () => void;
}
export function CustomButtonBlue({
  children,
  className,
  navigateTo,
}: CustomButtonProps) {
  return (
    <button
      onClick={navigateTo}
      className={cn(
        "bg-gradient-to-r from-blue-600 to-blue-700 bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer  text-sm md:text-base flex items-center gap-1",
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
        "bg-gradient-to-r from-gray-800 to-gray-900 text-white/80   py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:text-white border-[1px] border-gray-500 text-sm md:text-base flex items-center gap-1",
        className
      )}
    >
      {children}
    </button>
  );
}
