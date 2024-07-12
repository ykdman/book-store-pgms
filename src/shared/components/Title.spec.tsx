import { render, screen } from "@testing-library/react";

import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/theme";

describe("Title 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large" color="background">
          제목 테스트
        </Title>
      </BookStoreThemeProvider>
    );

    // 2. 확인

    expect(screen.getByText("제목 테스트")).toBeInTheDocument();
  });

  it("size prop 적용", () => {
    // 1. 렌더
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="background">
          제목 테스트
        </Title>
      </BookStoreThemeProvider>
    );
    expect(container.firstChild).toHaveStyle({ fontSize: "2rem" });
  });

  it("color prop 적용", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="primary">
          제목 테스트
        </Title>
      </BookStoreThemeProvider>
    );
    expect(container.firstChild).toHaveStyle({ color: "brown" });
  });
});
