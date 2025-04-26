import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableColumns } from "@/common/data/DataForTable";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { useState } from "react";
import { ShowQR } from "./ShowQR";
import { ShortLink } from "@/common/types/user";
import { cn } from "@/common/lib/utils";
import { formatDate } from "./DateFotmate";
import toast from "react-hot-toast";
import { frontendUri } from "@/common/lib/getEnv";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

type DataTableProps = {
  data: ShortLink[];
  className?: string;
  addAction?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export function DataTable({
  data,
  className,
  addAction,
  onDelete,
  onEdit,
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

  const filterTableHeaders = TableColumns.filter(
    (col) => col.isToAdd !== false
  );

  return (
    <div className={cn("max-w-5xl mx-auto md:mt-10 mt-7", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800 ">
            {(addAction ? TableColumns : filterTableHeaders).map((column) => (
              <TableHead
                key={column.name}
                className="text-white text-sm capitalize"
              >
                {column.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-900">
          {data.map((data) => (
            <TableRow
              className="hover:bg-gray-900 bg-gray-900 text-sm"
              key={data.shortLink}
            >
              <TableCell className="flex  items-center justify-start gap-x-2">
                {frontendUri + data.shortLink}{" "}
                {copied === data.shortLink ? (
                  <TbCopyCheck className="md:size-5" />
                ) : (
                  <TbCopy
                    onClick={() => handleOnCopy(frontendUri + data.shortLink)}
                    className="md:size-5"
                  />
                )}
              </TableCell>

              <TableCell>
                {data.longLink.substring(0, 50)}
                {data.longLink.length > 50 ? "..." : ""}
              </TableCell>
              <TableCell>
                <ShowQR qrCodeUrl={data.shortLink} />
              </TableCell>
              <TableCell>{data?.visits || 0}</TableCell>
              <TableCell className="text-green-500 font-semibold">
                {data.isActive ? "Active" : "Inactive"}
              </TableCell>
              <TableCell>{formatDate(data.createdAt)}</TableCell>
              {addAction === true && (
                <TableCell>
                  <div className="flex items-center justify-center gap-x-2">
                    <button
                      onClick={() => onEdit && onEdit(data.id)}
                      className="bg-blue-500 hover:bg-blue-700 p-1 rounded-full text-white cursor-pointer"
                      title="Edit"
                    >
                      <FiEdit className="md:size-4" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(data.shortLink)}
                      className="bg-red-500 cursor-pointer hover:bg-red-700 p-1 rounded-full text-white"
                      title="Delete"
                    >
                      <RiDeleteBin5Line className="md:size-4" />
                    </button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
