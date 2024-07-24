import React from "react";
import styled from "styled-components";
import Title from "../shared/components/Title";
import {
  BooksEmpty,
  BooksFilter,
  BooksViewSwitcher,
  Pagination,
} from "../features/books/ui";
import BooksList from "../features/books/ui/BooksList";
import { useBooks } from "../hooks/useBooks";
import Loading from "@/shared/components/Loading";

function Books() {
  const { books, pagination, isEmpty, isBookLoading } = useBooks();
  console.log("books", books);
  console.log("pagination", pagination);

  if (isEmpty) {
    return <BooksEmpty />;
  }

  if (!books || !pagination || isBookLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        {/* 필터 */}
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {/* 목록 */}
        <BooksList books={books} />
        <Pagination pagination={pagination} />
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
