import { useState } from "react";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
const items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

interface ItemsProps {
  currentItems: number[] | null;
}

function Items({ currentItems }: ItemsProps) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

interface PaginatedItemsProps {
  itemsPerPage: number;
}

export function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState<number>(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
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
