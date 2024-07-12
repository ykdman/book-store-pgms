import React, { memo } from "react";
import Headers from "../shared/components/Header/Headers";
import { formatNumber } from "../utils/format";
import Footer from "../shared/components/Footer";
import Title from "../shared/components/Title";
import Button from "../shared/components/Button";

const COUNT = 10000;

function Home() {
  return (
    <>
      <Title size="small" color="background">
        제목 테스트
      </Title>
      <Button size="large" scheme="normal">
        버튼 테스트
      </Button>
      <div>count : {formatNumber(COUNT)}</div>
    </>
  );
}

export default memo(Home);
