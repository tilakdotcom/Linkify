import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableColumns, tableDataForHome } from "@/data/DataForTable";
import GenerateQRCode from "./GenerateQRCode";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { useState } from "react";

export function DataTable() {
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
          {tableDataForHome.map((data) => (
            <TableRow
              className="hover:bg-gray-900 bg-gray-900 text-sm"
              key={data["Original Link"]}
            >
              <TableCell className="flex  items-center justify-start gap-x-2">
                {data["Short Link"]}{" "}
                {copied === data["Short Link"] ? (
                  <TbCopyCheck className="md:size-5" />
                ) : (
                  <TbCopy
                    onClick={() => handleOnCopy(data["Short Link"])}
                    className="md:size-5"
                  />
                )}
              </TableCell>

              <TableCell>{data["Original Link"]}</TableCell>
              <TableCell>
                {
                  <GenerateQRCode
                    className="size-6 md:size-10"
                    value={data["QR Code"]}
                  />
                }
              </TableCell>
              <TableCell>{data["Clicks"]}</TableCell>
              <TableCell>{data["Status"]}</TableCell>
              <TableCell>{data["Date"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
