import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book, Pagination } from "../shared/models";
import { fetchBooks } from "../shared/api/books.api";
import { QUERYSTRING } from "../shared/constants/queryString";
import { LIMIT } from "../shared/constants/pagination";

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalBooks: 0,
    currentPage: 1,
  });
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    fetchBooks({
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
    }).then(({ books, pagination }) => {
      setBooks(books);
      setPagination(pagination);
      setIsEmpty(books.length === 0);
    });
  }, [location.search]);

  return { books, pagination, isEmpty };
};
