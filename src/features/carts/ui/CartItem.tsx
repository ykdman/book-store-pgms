import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Cart } from "../../../shared/models";
import Button from "../../../shared/components/Button";
import Title from "../../../shared/components/Title";
import { formatNumber } from "../../../utils/format";
import CheckIconButton from "./CheckIconButton";
import { useAlert } from "../../../hooks/useAlert";

interface Props {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

function CartItem({ cart, checkedItems, onCheck, onDelete }: Props) {
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.book_id);
  }, [checkedItems, cart.book_id]);

  const { showConfirm } = useAlert();

  const handleCheck = () => {
    onCheck(cart.book_id);
  };

  const handleDelete = () => {
    // confirm 받고 삭제
    showConfirm("정말 삭제 하시겠습니까?", () => onDelete(cart.id));
  };

  return (
    <CartItemStyle>
      <div className="info">
        <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        <div>
          <Title size="medium">{cart.title}</Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}</p>
          <p className="quantity">{cart.quantity} 권</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;
export default CartItem;
