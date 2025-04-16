import { cn } from "@/common/lib/utils";
import QRCode from "react-qr-code";

interface QRCodeTypes {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  className?: string;
}

export default function GenerateQRCode({
  value,
  bgColor,
  fgColor,
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
        size={size}
        value={value}
        level="M"
        {...rest}
      />
    </div>
  );
}
