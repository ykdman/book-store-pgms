import React from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

function Error() {
  // router에서 발생한 에러 정보를 가져온다.
  const error = useRouteError() as RouteError;
  return (
    <div>
      <h1>오류가 발생 했습니다.</h1>
      <p>다음과 같은 오류가 발생 했습니다.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default Error;
