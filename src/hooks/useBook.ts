import { useEffect, useState } from "react";
import { Book, BookDetail } from "../shared/models";
import { fetchBook, likeBook, unlikeBook } from "../shared/api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../shared/api/carts.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const showAlert = useAlert();

  const [cartAdded, setCartAdded] = useState<boolean>(false);

  const addToCart = (quantity: number) => {
    if (!book) return;
    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  const likeToggle = () => {
    if (!isLoggedIn) {
      showAlert("로그인 하셔야 합니다.");
      return;
    }
    if (!book) return;

    if (book.liked) {
      // 라이크를 한 상태 => unlike
      unlikeBook(book.id).then(() =>
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1 === 0 ? 0 : book.likes - 1,
        })
      );
    } else {
      // 언 라이크 상태 => like 실행
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  useEffect(() => {
    if (!bookId) return;
    fetchBook(bookId).then((book) => setBook(book));
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
