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

function Books() {
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        {/* 필터 */}
        <BooksFilter />
        <BooksViewSwitcher />
        {/* 목록 */}
        <BooksList />
        {/* Empty */}
        <BooksEmpty />
        {/* 페이지네이션 */}
        <Pagination />
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.section``;

export default Books;
