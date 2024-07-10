import React, { memo } from "react";
import Headers from "../shared/components/Headers";
import { formatNumber } from "../utils/format";

const COUNT = 10000;

function Home() {
  return (
    <>
      <Headers />
      <div>home</div>
      <div>count : {formatNumber(COUNT)}</div>
    </>
  );
}

export default memo(Home);
