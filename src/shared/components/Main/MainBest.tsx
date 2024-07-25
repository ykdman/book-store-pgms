import BestBookItem from "@/features/books/ui/BestBookItem";
import { Book } from "@/shared/models";
import styled from "styled-components";

interface Props {
  books: Book[];
}
function MainBest({ books }: Props) {
  return (
    <MainBestStyle>
      {books.map((book, index) => (
        <BestBookItem key={book.id} book={book} itemIndex={index} />
      ))}
    </MainBestStyle>
  );
}

const MainBestStyle = styled.div`
  padding: 12px 0 0 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;

export default MainBest;
