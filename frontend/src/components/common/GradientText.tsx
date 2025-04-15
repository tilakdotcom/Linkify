import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GradientText({ children, className }: Props) {
  return (
    <div
      className={cn(
        "text-sm font-bold cursor-pointer bg-gradient-to-r from-pink-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:via-70% ",
        className
      )}
    >
      {children}
    </div>
  );
}
