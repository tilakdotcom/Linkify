interface CustomPaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const CustomPagination = ({
  totalPages,
  onPageChange,
  currentPage,
}: CustomPaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  console.log("curr page" , currentPage)

  return (
    <div className="flex justify-center space-x-1 text-sm sm:space-x-2 py-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="border border-gray-700 rounded-md hover:bg-gray-700 transition px-3 py-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt; Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`border border-gray-700 rounded-md hover:bg-gray-700 transition px-3 py-2 ${
            page === currentPage
              ? ""
              : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="border border-gray-700 rounded-md hover:bg-gray-700 transition px-3 py-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next &gt;
      </button>
    </div>
  );
};

export default CustomPagination;
