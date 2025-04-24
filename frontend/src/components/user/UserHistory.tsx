import { HiOutlineFilter } from "react-icons/hi";
import { CustomButtonGray } from "../common/CustomButton";
import { DataTable } from "../app-ui/DataTable";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { getShortUrls } from "@/store/auth/uri";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

export default function UserHistory() {
  const dispatch = useAppDispatch();
  const { userUrls } = useTypeSelector((state) => state.uriRequest);
  const { user } = useTypeSelector((state) => state.auth);

  const lenthRef = useRef(0);

  useEffect(() => {
    if (user != null) {
      const fetchUriData = async () => {
        const result = await dispatch(getShortUrls());
        if (getShortUrls.fulfilled.match(result)) {
          dispatch(getShortUrls(result.payload?.data?.shortLink));
          lenthRef.current = result.payload?.data?.totalCount;
        } else if (getShortUrls.rejected.match(result)) {
          toast.error("Errorin getting URLs. Please try again.");
        }
      };
      fetchUriData();
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="flex justify-between items-center max-w-5xl mx-auto md:py-6 text-2xl font-semibold">
        <span>History ({lenthRef.current})</span>
        <CustomButtonGray className="md:text-sm">
          <HiOutlineFilter />
          Filter
        </CustomButtonGray>
      </div>

      <DataTable className="md:mt-2 mt-2" data={userUrls} />
    </>
  );
}
