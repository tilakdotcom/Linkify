import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableColumns, tableDataForHome } from "@/data/DataForTable";

export function DataTable() {
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
              <TableCell>{data["Short Link"]}</TableCell>

              <TableCell>{data["Original Link"]}</TableCell>
              <TableCell>{data["QR Code"]}</TableCell>
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
