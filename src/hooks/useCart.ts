import { useEffect, useState } from "react";
import { Cart } from "../shared/models";
import { deleteCart, fetchCart } from "../shared/api/carts.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
    });
  };

  useEffect(() => {
    fetchCart().then((carts) => {
      setCarts(carts);
      setIsEmpty(carts.length === 0);
    });
  }, []);

  return { carts, deleteCartItem, isEmpty };
};
