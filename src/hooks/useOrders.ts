import { useEffect, useState } from "react";
import { Order } from "../shared/models";
import { fetchOrder, fetchOrders } from "../shared/api/order.api";
import { OrderListItem } from "../shared/models/order.model";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      console.log("orderDeatail", orderDetail);
      setSelectedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        })
      );
    });
  };

  return { orders, selectOrderItem, selectedItemId };
};
