import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

type PaginationProps = {
  totalCount: number;
  itemsPerPage: number;
  handlePageLimit: any;
  setPage: any;
  page: any;
};

export function Pagination({
  totalCount,
  itemsPerPage,
  handlePageLimit,
  page,
  setPage,
}: PaginationProps) {
  const navigate = useNavigate();
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const [params] = useSearchParams();

  useEffect(() => {
    const currentPage = Number(params.get("page")) || 1;
    setPage(currentPage);
  }, [params, setPage]);

  const jsx = [];
  let minPage = page - 2;
  let maxPage = page + 2;
  if (minPage < 1) minPage = 1;
  if (maxPage > numberOfPages) maxPage = numberOfPages;
  if (page > 1) {
    jsx.push(
      <Link
        key="prev"
        to={{
          search: `?page=${page - 1}`,
        }}
        className="border rounded px-2 py-1 hover:bg-sky-100 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200"
      >
        &laquo; Înapoi
      </Link>
    );
  }

  if (minPage > 1) {
    jsx.push(
      <Link
        key={1}
        to={{
          search: `?page=1`,
        }}
        className="hover:text-red-500"
      >
        1
      </Link>,
      <span key="leftdots">...</span>
    );
  }

  for (let i = minPage; i <= maxPage; i++) {
    if (page !== i) {
      jsx.push(
        <Link
          key={i}
          to={{
            search: `?page=${i}`,
          }}
          className="border border-gray-300 rounded px-3 py-1 mx-1 text-sm hover:border-blue-300 hover:bg-sky-100 hover:text-blue-600 transition-colors duration-200"
        >
          {i}
        </Link>
      );
    } else {
      jsx.push(
        <span
          className="px-3 py-1 mx-1 text-sm border border-red-300 rounded bg-red-100 text-red-600 font-semibold shadow-inner"
          key={i}
        >
          {i}
        </span>
      );
    }
  }

  if (maxPage < numberOfPages) {
    jsx.push(
      <span key="rightdots">...</span>,
      <Link
        key={numberOfPages}
        to={{
          search: `?page=${numberOfPages}`,
        }}
      >
        {numberOfPages}
      </Link>
    );
  }

  if (page < numberOfPages) {
    jsx.push(
      <Link
        key="next"
        to={{
          search: `?page=${page + 1}`,
        }}
        className="border rounded px-2 py-1 hover:bg-sky-100 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200"
      >
        Înainte &raquo;
      </Link>
    );
  }

  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-blue-700">
      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="perPage" className="text-sm font-medium">
          Rezultate pe pagină:
        </label>
        <select
          name="perPage"
          id="perPage"
          onChange={(e) => {
            handlePageLimit(Number(e.target.value));
            navigate("/?page=1");
          }}
          value={itemsPerPage}
          className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-sky-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value={totalCount}>Toate</option>
        </select>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center flex-wrap gap-2 text-sm">
        Pagina: {jsx}
      </div>
    </div>
  );
}
