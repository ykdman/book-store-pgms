import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../../shared/models";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../../../shared/constants/queryString";
import { ViewMode } from "./BooksViewSwitcher";

// const dummyBook: Book = {
//   id: 1,
//   title: "Dummy Book",
//   img: 5,
//   category_id: 1,
//   summary: "dummy Summary",
//   author: "dummy author",
//   price: 10000,
//   likes: 1,
//   form: "paperback",
//   isbn: "Dummy isbn",
//   detail: "Dummy Detail",
//   pages: 100,
//   contents: "dummy Contents",
//   pubDate: "2023-01-01",
// };
interface Props {
  books: Book[];
}
function BooksList({ books }: Props) {
  const [view, setView] = useState<ViewMode>("grid");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);

  return (
    <BooksListStyle view={view}>
      {books.map((book) => (
        <BookItem book={book} key={book.id} view={view} />
      ))}
    </BooksListStyle>
  );
}

interface BooksListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;
