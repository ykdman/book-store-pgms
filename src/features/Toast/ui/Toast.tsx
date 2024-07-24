import { ToastItem, useToastStore } from "@/store/toastStore";
import styled from "styled-components";

import { FaBan, FaInfoCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import useTimeout from "@/hooks/useTimeout";

const TOAST_REMOVE_DELAY = 3000; // 3s

function Toast({ id, message, type }: ToastItem) {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const removeToast = useToastStore((state) => state.removeToast);
  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  useTimeout(() => {
    setIsFadingOut(true);
  }, TOAST_REMOVE_DELAY);

  // useEffect(() => {
  //   setIsFadingOut(false);
  //   const timer = setTimeout(() => {
  //     handleRemoveToast();
  //   }, TOAST_REMOVE_DELAY);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <ToastStyle
      className={isFadingOut ? "fade-out" : "fade-in"}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>
        {type === "info" && <FaInfoCircle />}
        {type === "error" && <FaBan />}
        {message}
      </p>
      <button onClick={handleRemoveToast}>
        <GrClose />
      </button>
    </ToastStyle>
  );
}

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out;
  }

  opacity: 0.8;
  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
`;

export default Toast;
