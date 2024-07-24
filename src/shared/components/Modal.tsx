import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: Props) {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setIsFadingOut(true);
    // onClose();
  };
  const handleOverlayClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <ModalStyle
      onClick={handleOverlayClick}
      className={isFadingOut ? "fade-out" : "fade-in"}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal-body" ref={modalRef}>
        <div className="modal-content">{children}</div>
        <button className="modal-close" onClick={handleClose}>
          <GrClose />
        </button>
      </div>
    </ModalStyle>,
    document.getElementById("modal")!
  );
}

const ModalStyle = styled.div`
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

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    max-width: 80%;

    transform: translate(-50%, -50%); // x 좌표 y좌표
    padding: 56px 32px 32px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;

    top: 0;
    right: 0;
    padding: 12px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export default Modal;
