import { getShortUrls } from "@/store/auth/uri";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import ReactPaginate from "react-paginate";
import Loading from "../common/Loading";
import toast from "react-hot-toast";
import { useState } from "react";

interface PaginatedItemsProps {
  pageCount: number;
}

export function PaginatedItems({ pageCount }: PaginatedItemsProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypeSelector((state) => state.uriRequest);
  const [currentPage, setCurrecntPage] = useState(0);
  if (isLoading) return <Loading />;
  const handlePageClick = async (event: { selected: number }) => {
    const page = event.selected + 1;
    const result = await dispatch(getShortUrls(page.toLocaleString()));
    if (getShortUrls.fulfilled.match(result)) {
      dispatch({
        type: "SET_USER_URLS",
        payload: result.payload?.data?.shortLink,
      });
      setCurrecntPage(page)
      toast.success("page updated.");
    } else if (getShortUrls.rejected.match(result)) {
      toast.error("URL is already deleted. Please wait.");
    }
    console.info("events", page);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        forcePage={currentPage}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center space-x-1 text-sm sm:space-x-2 py-1 mt-6"
        pageClassName="border border-gray-700 rounded-md hover:bg-gray-700 transition"
        pageLinkClassName="px-3 py-2 text-gray-300 hover:text-white transition cursor-pointer"
        previousClassName="border border-gray-700 rounded-md hover:bg-gray-700 transition"
        previousLinkClassName="px-3 py-2 text-gray-300 hover:text-white transition"
        nextClassName="border border-gray-700 rounded-md hover:bg-gray-700 transition"
        nextLinkClassName="px-3 py-2 text-gray-300 hover:text-white transition"
        breakClassName="border border-gray-700 rounded-md hover:bg-gray-700 transition"
        breakLinkClassName="px-3 py-2 text-gray-400"
        activeClassName="bg-gray-700"
        activeLinkClassName="text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
        disabledLinkClassName="cursor-not-allowed"
      />
    </>
  );
}
