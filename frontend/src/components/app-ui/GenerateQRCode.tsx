import { cn } from "@/lib/utils";
import QRCode from "react-qr-code";

interface QRCodeTypes {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  level?: "L" | "M" | "H" | "Q";
  className?: string;
}

export default function GenerateQRCode({
  value,
  bgColor,
  fgColor,
  level,
  size,
  className,
  ...rest
}: QRCodeTypes) {
  return (
    <div>
      <QRCode
        className={cn("", className)}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        size={size}
        value={value}
        {...rest}
      />
    </div>
  );
}
