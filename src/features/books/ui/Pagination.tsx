import React from "react";
import { Pagination as IPagination } from "../../../shared/models";
import { LIMIT } from "../../../shared/constants/pagination";
import styled from "styled-components";
import Button from "../../../shared/components/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../../shared/constants/queryString";

interface Props {
  pagination: IPagination;
}

function Pagination({ pagination }: Props) {
  const { currentPage, totalBooks } = pagination;
  console.log(currentPage);
  const pages: number = Math.ceil(totalBooks / LIMIT);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, idx) => (
              <li key={idx}>
                <Button
                  size="small"
                  scheme={
                    idx + 1 === Number(currentPage) ? "primary" : "normal"
                  }
                  key={idx}
                  onClick={() => handleClickPage(idx + 1)}
                >
                  {idx + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px;
  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

export default Pagination;
