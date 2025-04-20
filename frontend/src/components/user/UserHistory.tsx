import { HiOutlineFilter } from "react-icons/hi";
import { CustomButtonGray } from "../common/CustomButton";
import { DataTable } from "../app-ui/DataTable";
import { tableDataForHome } from "@/common/data/DataForTable";

export default function UserHistory() {
  return (
    <>
      <div className="flex justify-between items-center max-w-5xl mx-auto md:py-6 text-2xl font-semibold">
        <span>History ({tableDataForHome.length})</span>
        <CustomButtonGray className="md:text-sm">
          <HiOutlineFilter />
          Filter
        </CustomButtonGray>
      </div>

      <DataTable className="md:mt-2 mt-2" data={tableDataForHome} />
    </>
  );
}
