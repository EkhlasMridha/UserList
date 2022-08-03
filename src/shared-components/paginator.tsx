import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

interface PaginatorProps {
  totalCount?: number;
  pageSize?: number;
  onChange?: (pageNumber: number) => void;
  defaultPage?: number;
  page?: number;
}

export const Paginator = (props: PaginatorProps) => {
  const [currentPage, setPage] = useState<number>(props?.defaultPage ?? 1);
  const firsPageNumber = 1;
  const lastPageNumber = (props?.totalCount ?? 0) / (props?.pageSize ?? 1);

  let pageSize = props.pageSize ?? 1;
  let total = props.totalCount ?? 0;

  useEffect(() => {
    setPage(props.page ?? 1);
  }, [props.page]);

  let pagesCount = Math.ceil(total / pageSize);
  let pages = Array(pagesCount)
    .fill(0)
    .map((item, index) => index + 1);

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
    props.onChange && props.onChange(pageNumber);
  };
  console.log("Total: ", pagesCount);
  const disableClass = "bg-slate-200";
  const activeButtonHover = "bg-white hover:bg-gray-50";
  const activeClass = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  return (
    <div>
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={() =>
            changePage(
              currentPage > firsPageNumber ? currentPage - 1 : currentPage
            )
          }
          className={
            "cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 " +
            (currentPage > firsPageNumber ? activeButtonHover : disableClass)
          }
          disabled={currentPage === firsPageNumber}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {pages.map((item, index) => (
          <div
            key={index}
            className={
              "cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium " +
              (currentPage === item ? activeClass : null)
            }
            onClick={() => changePage(item)}
          >
            {item}
          </div>
        ))}

        <button
          onClick={() =>
            changePage(
              currentPage < lastPageNumber ? currentPage + 1 : currentPage
            )
          }
          className={
            "cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 " +
            (currentPage < lastPageNumber ? activeButtonHover : disableClass)
          }
          disabled={currentPage === lastPageNumber}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};
