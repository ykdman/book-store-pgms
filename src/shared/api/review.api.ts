import { reviewsById } from "@/mock/reviews";
import { BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { requestHandler } from "./http";

interface AddBookResponse {
  message: string;
}
export const fetchBookReview = async (bookId: string) => {
  // Route 에서 bookId 수신
  return await requestHandler<BookReviewItem>("get", `/reviews/${bookId}`);
};

export const addBookReview = async (
  bookId: string,
  data: BookReviewItemWrite
) => {
  return await requestHandler<AddBookResponse>("post", `/reviews/${bookId}`);
};

export const fetchReviewAll = async () => {
  return await requestHandler<BookReviewItem[]>("get", "/reviews");
};
