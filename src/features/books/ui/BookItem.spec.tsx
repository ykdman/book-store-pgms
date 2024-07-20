import { render } from "@testing-library/react";
import BookItem from "./BookItem";
import React from "react";
import { BookStoreThemeProvider } from "../../../context/theme";
import { Book } from "../../../shared/models";
import { formatNumber } from "../../../utils/format";

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
  pub_date: "2023-01-01",
};

describe("BookItem Test", () => {
  it("렌더 테스트", () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText(formatNumber(dummyBook.price) + "원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      "src",
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
