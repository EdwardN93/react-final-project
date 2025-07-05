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
        className="hover:text-red-500"
      >
        &laquo; Prev
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
        >
          {i}
        </Link>
      );
    } else {
      jsx.push(
        <span className="text-red-500" key={i}>
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
        className="hover:text-red-500"
      >
        Next &raquo;
      </Link>
    );
  }

  return (
    <div className="mt-4 flex gap-4 items-center justify-between text-blue-700">
      <div>
        <select
          name="perPage"
          id="perPage"
          onChange={(e) => {
            handlePageLimit(Number(e.target.value));
            navigate("/?page=1");
          }}
          value={itemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className=" flex items-center justify-center mt-4 gap-4">
        Page: {jsx}
      </div>
    </div>
  );
}
