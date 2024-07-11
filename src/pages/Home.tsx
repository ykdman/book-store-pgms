import React, { memo } from "react";
import Headers from "../shared/components/Header/Headers";
import { formatNumber } from "../utils/format";
import Footer from "../shared/components/Footer";

const COUNT = 10000;

function Home() {
  return (
    <>
      <div>home</div>
      <div>count : {formatNumber(COUNT)}</div>
    </>
  );
}

export default memo(Home);
