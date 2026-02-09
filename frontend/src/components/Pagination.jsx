import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-3 mt-16 mb-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all duration-300 ${currentPage === 1
                        ? "text-gray-300 cursor-not-allowed bg-gray-50 border border-gray-100"
                        : "text-gray-700 bg-white border border-gray-100 hover:border-indigo-600 hover:text-indigo-600 shadow-sm active:scale-95"
                    }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-[24px] border border-gray-100 shadow-sm">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-12 h-12 rounded-xl font-black text-sm transition-all duration-300 flex items-center justify-center ${currentPage === page
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all duration-300 ${currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed bg-gray-50 border border-gray-100"
                        : "text-gray-700 bg-white border border-gray-100 hover:border-indigo-600 hover:text-indigo-600 shadow-sm active:scale-95"
                    }`}
            >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
