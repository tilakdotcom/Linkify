import { getShortUrls, setCurrentPage } from "@/store/auth/uri";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import Loading from "../common/Loading";
import toast from "react-hot-toast";
import CustomPagination from "../common/CustomPagination";

interface PaginatedItemsProps {
  pageCount: number;
}

export function PaginatedItems({ pageCount }: PaginatedItemsProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypeSelector((state) => state.uriRequest);
  if (isLoading) return <Loading />;

  const handlePageClick = async (page: number) => {
    const result = await dispatch(getShortUrls(page.toLocaleString()));

    if (getShortUrls.fulfilled.match(result)) {
      dispatch({
        type: "SET_USER_URLS",
        payload: result.payload?.data?.shortLink,
      });
      dispatch(setCurrentPage(page));
      toast.success("page updated.");
    } else if (getShortUrls.rejected.match(result)) {
      toast.error("Please wait.");
    }
  };

  return (
    <CustomPagination
      totalPages={pageCount}
      onPageChange={handlePageClick}
    />
  );
}
