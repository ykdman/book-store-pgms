import React from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../../shared/models";

const dummyBook: Book = {
  id: 1,
  title: "Dummy Book",
  img: 5,
  category_id: 1,
  summary: "dummy Summary",
  author: "dummy author",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "Dummy isbn",
  detail: "Dummy Detail",
  pages: 100,
  contents: "dummy Contents",
  pubDate: "2023-01-01",
};

function BooksList() {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  );
}

const BooksListStyle = styled.div``;

export default BooksList;
