import { cn } from "@/common/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[92vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[1280px] mx-auto py-10 px-1 ",
        className
      )}
    >
      {children}
    </div>
  );
}
