import { reviewsById } from "@/mock/reviews";
import { BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { requestHandler } from "./http";
// const mockReviewsData: BookReviewItem[] = [
//   {
//     id: 1,
//     userName: "bob",
//     content: "테스트 리뷰",
//     createdAt: "2024-07-20",

//     score: 5,
//   },
//   {
//     id: 2,
//     userName: "bob툐",
//     content: "테스트 리뷰",
//     createdAt: "2024-07-20",

//     score: 4,
//   },
// ];

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
