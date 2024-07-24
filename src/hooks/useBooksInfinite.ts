import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book, Pagination } from "../shared/models";
import { fetchBook, fetchBooks } from "../shared/api/books.api";
import { QUERYSTRING } from "../shared/constants/queryString";
import { LIMIT } from "../shared/constants/pagination";
import { useInfiniteQuery, useQuery } from "react-query";

export const useBooksInfinity = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const category_id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;

    const news = params.get(QUERYSTRING.NEWS)
      ? Boolean(params.get(QUERYSTRING.NEWS))
      : undefined;

    const limit = LIMIT;

    const currentPage = pageParam;

    return fetchBooks({
      category_id,
      news,
      limit,
      currentPage,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["books", location.search],
    ({ pageParam = 1 }) => getBooks(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const isLastPage =
          Math.ceil(lastPage.pagination.totalBooks / LIMIT) ===
          lastPage.pagination.currentPage;
        return isLastPage ? null : lastPage.pagination.currentPage + 1;
      },
    }
  );

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBookLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
