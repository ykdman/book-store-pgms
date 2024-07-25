import { fetchBeskBooks, fetchBooks } from "@/shared/api/books.api";
import { fetchReviewAll } from "@/shared/api/review.api";
import { Book, BookReviewItem } from "@/shared/models";
import { useEffect, useState } from "react";

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchReviewAll().then((res) => {
      setReviews(res);
    });

    fetchBooks({
      category_id: undefined,
      news: true,
      currentPage: 1,
      limit: 4,
    }).then(({ books }) => {
      setNewBooks(books);
    });

    fetchBeskBooks().then((res) => {
      setBestBooks(res);
    });
  }, []);

  return { reviews, newBooks, bestBooks };
};
