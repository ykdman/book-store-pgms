import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from "@/shared/models/book.model";
import styled from "styled-components";
import BookReviewItem from "./BookReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

function BookReview({ reviews, onAdd }: Props) {
  console.log("리뷰", reviews);
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem review={review} />
      ))}
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
