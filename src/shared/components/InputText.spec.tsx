import { render, screen } from "@testing-library/react";

import { BookStoreThemeProvider } from "../../context/theme";
import InputText from "./InputText";
import React from "react";

describe("InputText 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="텍스트를 입력하세요" />
      </BookStoreThemeProvider>
    );
    expect(
      screen.getByPlaceholderText("텍스트를 입력하세요")
    ).toBeInTheDocument();
  });

  it("forwardRef 테스트", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="텍스트를 입력하세요" ref={ref} />
      </BookStoreThemeProvider>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // it("size prop 적용", () => {
  //   const { container } = render(
  //     <BookStoreThemeProvider>
  //       <Button size="large" scheme="normal">
  //         버튼
  //       </Button>
  //     </BookStoreThemeProvider>
  //   );
  //   expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
  // });

  // it("scheme prop 적용", () => {
  //   const { container } = render(
  //     <BookStoreThemeProvider>
  //       <Button size="large" scheme="primary">
  //         버튼
  //       </Button>
  //     </BookStoreThemeProvider>
  //   );
  //   expect(screen.getByRole("button")).toHaveStyle({
  //     color: "white",
  //     backgroundColor: "midnightblue",
  //   });
  // });
});
