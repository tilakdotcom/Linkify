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

type DataTableProps = {
  data: ShortLink[];
  className?: string;
};

export function DataTable({ data, className }: DataTableProps) {
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
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800 ">
            {TableColumns.map((column) => (
              <TableHead key={column.name} className="text-white text-sm">
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
              <TableCell>{data?.visits || 30}</TableCell>
              <TableCell>{data.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>{formatDate(data.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
