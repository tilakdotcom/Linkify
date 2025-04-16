import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GenerateQRCode from "./GenerateQRCode";

type ShowQRProps = {
  qrCodeUrl: string;
};

export function ShowQR({ qrCodeUrl }: ShowQRProps) {
  const handleOnCopy = () => {
    navigator.clipboard.writeText(qrCodeUrl);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <GenerateQRCode
          className="size-6 md:size-10 cursor-pointer"
          value={qrCodeUrl}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px] md:w-[500px] bg-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">QR Code</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-gray-400 text-[13.5px] font-normal text-center max-w-2xl">
                Scan the QR code to get the link
              </p>
              <GenerateQRCode
                className="size-6 md:size-20 cursor-pointer"
                value={qrCodeUrl}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black cursor-pointer">
            Back
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleOnCopy}>
            Copy Link
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
