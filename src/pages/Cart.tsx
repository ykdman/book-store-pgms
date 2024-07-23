import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Title from "../shared/components/Title";
import { CartItem } from "../features/carts/ui";
import { useCart } from "../hooks/useCart";
import Empty from "../shared/components/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../features/carts/ui/CartSummary";
import Button from "../shared/components/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../shared/models/order.model";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { carts, deleteCartItem, isEmpty } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalCartItemQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.book_id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalCartItemPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.book_id)) {
        return acc + cart.price * cart.quantity;
      }

      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해 주세요.");
      return;
    } else {
      // 주문 액션 -> 주문서 작성으로 데이터 전달

      const firstBookTitle = carts.find(
        (item) => item.book_id === checkedItems[0]
      )!.title;

      const orderData: Omit<OrderSheet, "delivery"> = {
        items: checkedItems,
        totalPrice: totalCartItemPrice,
        totalQuantity: totalCartItemQuantity,
        firstBookTitle,
      };

      navigate("/order", { state: orderData });
    }
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((item) => (
                <CartItem
                  onDelete={handleItemDelete}
                  cart={item}
                  key={item.book_id}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalQuantity={totalCartItemQuantity}
                totalPrice={totalCartItemPrice}
              />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문 하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다."
            icon={<FaShoppingCart />}
            description={<>장바구니를 채워 보세요</>}
          />
        )}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;

    h1 {
      padding: 0 0 24px 0;
    }
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
  }

  .error-text {
    color: red;
    margin: 0;
    padding: 0 0 12px 0;
    text-align: right;
  }
`;

export default Cart;
