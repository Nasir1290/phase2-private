/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   MdOutlineArrowBackIosNew,
//   MdOutlineArrowForwardIos,
// } from "react-icons/md";

// interface PaginationProps {
//   totalPages: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   currentPage,
//   onPageChange,
// }) => {
//   return (
//     <div className="flex items-center justify-center space-x-5 mt-4">
//       {/* Previous Button */}
//       <button
//         className="p-2 text-primary disabled:text-gray-300"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <MdOutlineArrowBackIosNew className="w-4 h-4" />
//       </button>

//       {/* Page Numbers */}
//       {Array.from({ length: totalPages }, (_, index) => (
//         <button
//           key={index}
//           className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
//             currentPage === index + 1 ? "bg-primary text-white" : "text-black "
//           }`}
//           onClick={() => onPageChange(index + 1)}
//         >
//           {index + 1}
//         </button>
//       ))}

//       {/* Next Button */}
//       <button
//         className="p-2 text-primary disabled:text-gray-300"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         <MdOutlineArrowForwardIos className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default Pagination;

// import {
//   MdOutlineArrowBackIosNew,
//   MdOutlineArrowForwardIos,
// } from "react-icons/md";

// interface PaginationProps {
//   totalPages: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   currentPage,
//   onPageChange,
// }) => {
//   const renderPageNumbers = () => {
//     const pages = [];

//     // Always show first 5 pages
//     for (let i = 1; i <= Math.min(5, totalPages); i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
//             currentPage === i ? "bg-primary text-white" : "text-black"
//           }`}
//           onClick={() => onPageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     // Add ellipsis if there are more than 5 pages
//     if (totalPages > 5) {
//       pages.push(
//         <span key="ellipsis" className="text-black">
//           ...
//         </span>
//       );

//       // Add last page
//       pages.push(
//         <button
//           key={totalPages}
//           className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
//             currentPage === totalPages ? "bg-primary text-white" : "text-black"
//           }`}
//           onClick={() => onPageChange(totalPages)}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="flex items-center justify-center space-x-5 mt-4">
//       {/* Previous Button */}
//       <button
//         className="p-2 text-primary disabled:text-gray-300"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <MdOutlineArrowBackIosNew className="w-4 h-4" />
//       </button>

//       {/* Page Numbers */}
//       {renderPageNumbers()}

//       {/* Next Button */}
//       <button
//         className="p-2 text-primary disabled:text-gray-300"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         <MdOutlineArrowForwardIos className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // Handle invalid totalPages
  const validTotalPages = Math.max(0, totalPages);
  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), validTotalPages);

  const renderPageNumbers = () => {
    const pages: any = [];

    // Handle case when totalPages is 0
    if (validTotalPages === 0) {
      return pages;
    }

    // Show all pages if totalPages <= 6
    if (validTotalPages <= 6) {
      for (let i = 1; i <= validTotalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
              validCurrentPage === i ? "text-white bg-primary" : "text-black"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <button
          key={1}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
            validCurrentPage === 1 ? "bg-primary text-white" : "text-black"
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );

      // Show ellipsis after first page if currentPage > 3
      if (validCurrentPage > 3) {
        pages.push(
          <span key="start-ellipsis" className="text-black px-2">
            ...
          </span>
        );
      }

      // Show pages around current page
      const startPage = Math.max(2, validCurrentPage - 1);
      const endPage = Math.min(validTotalPages - 1, validCurrentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
              validCurrentPage === i ? "bg-primary text-white" : "text-black"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

      // Show ellipsis before last page if needed
      if (validCurrentPage < validTotalPages - 2) {
        pages.push(
          <span key="end-ellipsis" className="text-black px-2">
            ...
          </span>
        );
      }

      // Always show last page
      pages.push(
        <button
          key={validTotalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-medium ${
            validCurrentPage === validTotalPages ? "bg-primary text-white" : "text-black"
          }`}
          onClick={() => onPageChange(validTotalPages)}
        >
          {validTotalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-5 mt-4">
      {/* Previous Button */}
      <button
        className={`p-2 text-primary disabled:text-gray-300 ${validTotalPages === 0 ? "invisible" : ""}`}
        onClick={() => onPageChange(validCurrentPage - 1)}
        disabled={validCurrentPage === 1 || validTotalPages === 0}
      >
        <MdOutlineArrowBackIosNew className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        className={`p-2 text-primary disabled:text-gray-300 ${validTotalPages === 0 ? "invisible" : ""}`}
        onClick={() => onPageChange(validCurrentPage + 1)}
        disabled={validCurrentPage === validTotalPages || validTotalPages === 0}
      >
        <MdOutlineArrowForwardIos className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
