import { getShortUrls } from "@/store/auth/uri";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import Loading from "../common/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import CustomPagination from "../common/CustomPagination";

interface PaginatedItemsProps {
  pageCount: number;
}

export function PaginatedItems({ pageCount }: PaginatedItemsProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypeSelector((state) => state.uriRequest);
  const [currentPage, setCurrentPage] = useState(0);
  if (isLoading) return <Loading />;

  const handlePageClick = async (page: number) => {
    const result = await dispatch(getShortUrls(page.toLocaleString()));
    if (getShortUrls.fulfilled.match(result)) {
      dispatch({
        type: "SET_USER_URLS",
        payload: result.payload?.data?.shortLink,
      });
      setCurrentPage(page);
      console.log("page h ye ", page);

      toast.success("page updated.");
    } else if (getShortUrls.rejected.match(result)) {
      toast.error("URL is already deleted. Please wait.");
    }
  };

  return (
    <>
      <CustomPagination
        key={"pagination"}
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={handlePageClick}
      />
    </>
  );
}
