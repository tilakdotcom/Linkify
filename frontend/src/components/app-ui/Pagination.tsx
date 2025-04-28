import ReactPaginate from "react-paginate";

interface PaginatedItemsProps {
  pageCount: number;
}

export function PaginatedItems({ pageCount = 1 }: PaginatedItemsProps) {
  const handlePageClick = (event: { selected: number }) => {
    console.log("event ", event.selected);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center space-x-1 text-sm sm:space-x-2 py-1"
        pageClassName="border border-gray-700 rounded-md hover:bg-gray-700 transition"
        pageLinkClassName="px-3 py-2 text-gray-300 hover:text-white transition"
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
