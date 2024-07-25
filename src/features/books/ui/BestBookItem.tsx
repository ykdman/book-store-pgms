import { Book } from "@/shared/models";
import styled from "styled-components";
import { ViewMode } from "./BooksViewSwitcher";
import BookItem, { BookItemStyle } from "./BookItem";

interface Props {
  book: Book;
  itemIndex: number;
}

function BestBookItem({ book, itemIndex }: Props) {
  return (
    <BestBookItemStyle>
      <BookItem book={book} view="grid" />
      <div className="rank">{itemIndex + 1}</div>
    </BestBookItemStyle>
  );
}

const BestBookItemStyle = styled.div`
  position: relative;
  ${BookItemStyle} {
    .summary,
    .price,
    .likes {
      display: none;
    }
  }

  .rank {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.color.primary};
    border-radius: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    font-style: italic;
  }

  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default BestBookItem;
