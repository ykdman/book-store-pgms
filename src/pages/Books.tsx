import React, { useEffect, useRef } from "react";
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
import { useBooksInfinity } from "@/hooks/useBooksInfinite";
import Button from "@/shared/components/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBookLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinity();

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };
  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });
  // const moreRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         loadMore();
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   });

  //   if (moreRef.current) {
  //     observer.observe(moreRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, [books, moreRef]);

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
        {/* <Pagination pagination={pagination} /> */}
        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={hasNextPage ? false : true}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
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
