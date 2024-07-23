import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../shared/components/Title";
import { CartStyle as OrderStyle } from "./Cart";
import CartSummary from "../features/carts/ui/CartSummary";
import { Delivery, OrderSheet } from "../shared/models/order.model";
import InputText from "../shared/components/InputText";
import Button from "../shared/components/Button";
import { useForm } from "react-hook-form";
import FindAddressButton from "../features/order/ui/FindAddressButton";
import { useAlert } from "../hooks/useAlert";
import { order } from "../shared/api/order.api";

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

function Order() {
  const location = useLocation();
  const orderDataFromCart: Omit<OrderSheet, "delivery"> = location.state;
  const { totalPrice, totalQuantity, firstBookTitle, items } =
    orderDataFromCart;

  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    showConfirm("주문을 진행하시겠습니까?", () => {
      // 서버로 데이터 넘겨주기
      order(orderData).then(() => {
        showAlert("주문이 처리 되었습니다.");
        navigate("/orderlist");
      });
    });
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <OrderStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue("address", address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력해 주세요.</p>
              )}

              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("addressDetail", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">상세주소를 입력해 주세요.</p>
              )}

              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("receiver", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error-text">수령인을 입력해 주세요.</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("contact", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">전화번호를 입력해 주세요.</p>
              )}
            </form>
          </div>

          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </OrderStyle>
    </>
  );
}

export default Order;
