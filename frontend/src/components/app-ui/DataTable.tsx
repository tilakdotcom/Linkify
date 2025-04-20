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
import { UserLinkTable } from "@/common/types/user";

type DataTableProps = {
  data: UserLinkTable[];
};

export function DataTable({ data }: DataTableProps) {
  const [copied, setCopied] = useState<string>("");
  const handleOnCopy = (url: string) => {
    if (copied === url) return;
    if (copied !== "") {
      clearTimeout(0);
    }
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="max-w-5xl mx-auto md:mt-10 mt-7">
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
                {data.shortLink}{" "}
                {copied === data.shortLink ? (
                  <TbCopyCheck className="md:size-5" />
                ) : (
                  <TbCopy
                    onClick={() => handleOnCopy(data.shortLink)}
                    className="md:size-5"
                  />
                )}
              </TableCell>

              <TableCell>
                {data.originalLink.substring(0, 50)}
                {data.originalLink.length > 50 ? "..." : ""}
              </TableCell>
              <TableCell>
                <ShowQR qrCodeUrl={data.shortLink} />
              </TableCell>
              <TableCell>{data.clicks}</TableCell>
              <TableCell>{data.status ? "Active" : "Inactive"}</TableCell>
              <TableCell>{data.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
