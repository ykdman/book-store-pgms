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

function Books() {
  const { books, pagination, isEmpty } = useBooks();
  console.log("books", books);
  console.log("pagination", pagination);
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
        {!isEmpty && <BooksList books={books} />}
        {/* Empty */}
        {isEmpty && <BooksEmpty />}
        {/* 페이지네이션 */}
        {!isEmpty && <Pagination pagination={pagination} />}
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
