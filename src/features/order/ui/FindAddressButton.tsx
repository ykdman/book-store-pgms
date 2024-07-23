import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../../../shared/components/Button";

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function FindAddressButton({ onCompleted }: Props) {
  //1. '다음 포스트 코드' script 로드
  useEffect(() => {
    const script = document.createElement("script"); //<script></script>
    script.src = SCRIPT_URL; // <script src="~"></script>
    script.async = true; // <script src="~" async></script>

    document.head.appendChild(script); // <head> <script src="~" async></script></head>

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //2. 핸들러

  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  //3. 입력 작업

  return (
    <Button size="medium" scheme="normal" onClick={handleOpen} type="button">
      주소 찾기
    </Button>
  );
}

export default FindAddressButton;
