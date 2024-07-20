import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { BookDetail } from "../../../shared/models";
import InputText from "../../../shared/components/InputText";
import Button from "../../../shared/components/Button";
import { addCart } from "../../../shared/api/carts.api";
import { useAlert } from "../../../hooks/useAlert";
import { Link } from "react-router-dom";
import { useBook } from "../../../hooks/useBook";

interface Props {
  book: BookDetail;
}

function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const showAlert = useAlert();
  const { addToCart, cartAdded } = useBook(book.id.toString());
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => addToCart(quantity)}
      >
        장바구니 담기
      </Button>

      <div className="added">
        <p>장바구니에 추가 되었습니다.</p>
        <Link to="/carts">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
}

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    opacity: ${({ $added }) => ($added ? "1" : "0")};
    transition: all 0.5s ease;
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;
export default AddToCart;
