import { cn } from "@/common/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export default function LinkButton({
  to,
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link to={to || "#"} className={cn("", className)}>
      {children}
    </Link>
  );
}
