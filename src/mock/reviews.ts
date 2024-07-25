import { BookReviewItem } from "@/shared/models/book.model";
import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

const mockReviewsData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, idx) => ({
    id: idx,
    userName: faker.person.lastName() + faker.person.firstName(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
  })
);

export const reviewsById = http.get(
  "http://localhost:8888/reviews/:bookId",
  () => {
    const data: BookReviewItem[] = mockReviewsData;
    return HttpResponse.json(data, {
      status: 200,
    });
  }
);

export const addReview = http.post(
  "http://localhost:8888/reviews/:bookId",
  () => {
    return HttpResponse.json(
      { message: "리뷰가 등록되었습니다." },
      { status: 200 }
    );
  }
);

export const reviewForMain = http.get("http://localhost:8888/reviews", () => {
  return HttpResponse.json(mockReviewsData, { status: 200 });
});
