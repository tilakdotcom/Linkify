import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { useState } from "react";
import { ShortLink } from "@/common/types/user";
import toast from "react-hot-toast";
import { frontendUri } from "@/common/lib/getEnv";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { HiMiniLink, HiMiniLinkSlash } from "react-icons/hi2";
import { formatDate } from "../app-ui/DateFotmate";
import { cn } from "@/common/lib/utils";

type DataTableProps = {
  data: ShortLink[];
  className?: string;
  addAction?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id?: string) => void;
  onStatusChange?: (uri: string, status: boolean) => void;
};

export function AccordionDataTable({
  data,
  className,
  addAction,
  onDelete,
  onEdit,
  onStatusChange,
}: DataTableProps) {
  const [copied, setCopied] = useState<string>("");

  const handleOnCopy = (url: string) => {
    if (copied === url) return;
    if (copied !== "") {
      clearTimeout(0);
    }
    navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("URL copied");
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className={cn("max-w-5xl mx-auto md:mt-10 mt-7", className)}>
      <Accordion type="multiple">
        {data.map((item) => (
          <AccordionItem key={item.shortLink} value={item.shortLink}>
            <AccordionTrigger className="md:text-lg font-medium  bg-gray-800 p-3 rounded-t-md hover:bg-gray-900 text-xs">
              {frontendUri + item.shortLink}
            </AccordionTrigger>
            <AccordionContent className="bg-gray-800 p-4 rounded-b-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">Original Link:</span>
                  <span className="text-xs sm:text-sm ">{item.longLink}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm  font-medium">Clicks:</span>
                  <span className="text-xs sm:text-sm ">{item.visits || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm  font-medium">Status:</span>
                  <button
                    onClick={() =>
                      onStatusChange &&
                      onStatusChange(item.shortLink, item.isActive)
                    }
                    className="flex items-center space-x-2"
                  >
                    {item.isActive ? (
                      <HiMiniLink className="bg-green-500 p-1 rounded-full text-white size-5" />
                    ) : (
                      <HiMiniLinkSlash className="bg-red-500 p-1 rounded-full text-white size-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm  font-medium">Date:</span>
                  <span className="text-xs sm:text-sm ">{formatDate(item.createdAt)}</span>
                </div>

                <div className="flex gap-x-2">
                  {addAction && (
                    <>
                      <button
                        onClick={() => onEdit && onEdit(item.id)}
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(item.shortLink)}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        title="Delete"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleOnCopy(frontendUri + item.shortLink)}
                    className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    title="Copy Link"
                  >
                    {copied === item.shortLink ? <TbCopyCheck /> : <TbCopy />}
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
