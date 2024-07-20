import React from "react";
import styled from "styled-components";
import { BookDetail } from "../../shared/models";
import Button from "../../shared/components/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

function LikeButton({ onClick, book }: Props) {
  return (
    <LikeButtonStyle
      size="medium"
      scheme={book.liked ? "like" : "normal"}
      onClick={onClick}
    >
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;
  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
