import React, { memo } from "react";
import Headers from "../shared/components/Header/Headers";
import { formatNumber } from "../utils/format";
import Footer from "../shared/components/Footer";
import Title from "../shared/components/Title";

const COUNT = 10000;

function Home() {
  return (
    <>
      <Title size="small" color="background">
        제목 테스트
      </Title>
      <div>count : {formatNumber(COUNT)}</div>
    </>
  );
}

export default memo(Home);
