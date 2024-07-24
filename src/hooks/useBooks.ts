import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book, Pagination } from "../shared/models";
import { fetchBooks } from "../shared/api/books.api";
import { QUERYSTRING } from "../shared/constants/queryString";
import { LIMIT } from "../shared/constants/pagination";
import { useQuery } from "react-query";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBookLoading } = useQuery({
    queryKey: ["books", location.search],
    queryFn: () => {
      return fetchBooks({
        category_id: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        news: params.get(QUERYSTRING.NEWS)
          ? Boolean(params.get(QUERYSTRING.NEWS))
          : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
      });
    },
  });

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);

  //   fetchBooks({
  //     category_id: params.get(QUERYSTRING.CATEGORY_ID)
  //       ? Number(params.get(QUERYSTRING.CATEGORY_ID))
  //       : undefined,
  //     news: params.get(QUERYSTRING.NEWS)
  //       ? Boolean(params.get(QUERYSTRING.NEWS))
  //       : undefined,
  //     currentPage: params.get(QUERYSTRING.PAGE)
  //       ? Number(params.get(QUERYSTRING.PAGE))
  //       : 1,
  //     limit: LIMIT,
  //   }).then(({ books, pagination }) => {
  //     setBooks(books);
  //     setPagination(pagination);
  //     setIsEmpty(books.length === 0);
  //   });
  // }, [location.search]);

  // return { books, pagination, isEmpty };
  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBookLoading,
  };
};
