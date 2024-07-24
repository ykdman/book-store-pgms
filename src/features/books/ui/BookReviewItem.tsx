import { BookReviewItem as IBookReviewItem } from "@/shared/models";
import { formatDate } from "@/utils/format";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  review: IBookReviewItem;
}

const Star = (props: Pick<IBookReviewItem, "score">) => {
  return (
    <span className="start">
      {Array.from({ length: props.score }, (_, idx) => (
        <span>
          <FaStar />
        </span>
      ))}
    </span>
  );
};

function BookReviewItem({ review }: Props) {
  return (
    <BookReviewItemStyle>
      <header className="header">
        <div className="left">
          <span>{review.userName}</span>
          <Star score={review.score} />
        </div>
        <div className="right">{formatDate(review.createdAt)}</div>
      </header>
      <div className="content">
        <p>{review.content}</p>
      </div>
    </BookReviewItemStyle>
  );
}

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    .left {
      display: flex;
    }

    .start {
      padding: 0 0 0 8px;
      svg {
        fill: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .content {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
  }
`;

export default BookReviewItem;
