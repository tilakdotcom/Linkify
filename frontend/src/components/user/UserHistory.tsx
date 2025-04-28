import { HiOutlineFilter } from "react-icons/hi";
import { CustomButtonGray } from "../common/CustomButton";
import { DataTable } from "../app-ui/DataTable";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import {
  deleteShortUrl,
  getShortUrls,
  updateShortStatus,
} from "@/store/auth/uri";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { AccordionDataTable } from "../common/mobileData";
import { PaginatedItems } from "../app-ui/Pagination";
export default function UserHistory() {
  const dispatch = useAppDispatch();
  const { userUrls, isLoading } = useTypeSelector((state) => state.uriRequest);
  const { user } = useTypeSelector((state) => state.auth);
  const [lenthRef, setLengthState] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (user != null) {
      const fetchUriData = async () => {
        const result = await dispatch(getShortUrls("1"));
        if (getShortUrls.fulfilled.match(result)) {
          dispatch({
            type: "SET_USER_URLS",
            payload: result.payload?.data?.shortLink,
          });

          setLengthState(result.payload?.data?.totalCount);
          setPageCount(result.payload?.data?.totalPages);
        } else if (getShortUrls.rejected.match(result)) {
          toast.error("Errorin getting URLs. Please try again.");
        }
      };
      fetchUriData();
    }
  }, [dispatch, user]);

  if (isLoading) return <Loading />;

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteShortUrl(id));
    if (deleteShortUrl.fulfilled.match(result)) {
      setLengthState((p) => p - 1);
      toast.success("URL deleted successfully.");
    } else if (deleteShortUrl.rejected.match(result)) {
      toast.error("URL is already deleted. Please wait.");
    }
  };

  const handleOnStatusChange = async (uri: string, status: boolean) => {
    const result = await dispatch(
      updateShortStatus({
        uri,
        status: !status,
      })
    );
    if (deleteShortUrl.fulfilled.match(result)) {
      toast.success("URL deleted successfully.");
    } else if (deleteShortUrl.rejected.match(result)) {
      toast.error("Error deleting URL. Please try again.");
    }
  };
  const handleOnPremiumWarning = () => {
    toast.error("This feature is only available for premium users.");
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-5xl mx-auto md:py-6 text-2xl font-semibold">
        <span>History ({lenthRef})</span>
        <CustomButtonGray
          navigateTo={handleOnPremiumWarning}
          className="md:text-sm"
        >
          <HiOutlineFilter />
          Filter
        </CustomButtonGray>
      </div>
      {lenthRef > 0 ? (
        <>
          <PaginatedItems pageCount={pageCount} />

          <AccordionDataTable
            className="md:mt-2 mt-2 sm:hidden "
            data={userUrls}
            addAction
            onDelete={handleDelete}
            onEdit={handleOnPremiumWarning}
            onStatusChange={handleOnStatusChange}
          />
          <DataTable
            className="md:mt-2 mt-2 hidden sm:flex "
            data={userUrls}
            addAction
            onDelete={handleDelete}
            onEdit={handleOnPremiumWarning}
            onStatusChange={handleOnStatusChange}
          />
        </>
      ) : (
        <p className="sm:text-lg text-sm text-gray-300 mb-6 text-center">
          You haven&apos;t created any short links yet. Start shortening your
          links
        </p>
      )}
    </>
  );
}
