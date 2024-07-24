import { reviewsById } from "@/mock/reviews";
import { BookReviewItem } from "../models/book.model";
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

export const fetchBookReview = async (bookId: string) => {
  // Route 에서 bookId 수신
  // return await requestHandler<BookReviewItem>("get", `/reviews/${bookId}`);

  const response = await fetch(`http://localhost:9999/reviews/${bookId}`);
  const data = await response.json();
  return data;
};
