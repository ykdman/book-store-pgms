import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";

import logo from "../../../assets/img/bookstorelogo1.svg";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../models";
import { fetchCategory } from "../../api/category.api";
import { useCategory } from "../../../hooks/useCategory";
import { useAuthStore } from "../../../store/authStore";

// const CATEGORY = [
//   {
//     id: null,
//     name: "전체",
//   },
//   {
//     id: 1,
//     name: "동화",
//   },
//   {
//     id: 2,
//     name: "소설",
//   },
//   {
//     id: 3,
//     name: "사회",
//   },
// ];

function Headers() {
  const { categories } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const naviagate = useNavigate();
  return (
    <HeaderStyle>
      <h1 className="logo">
        <img src={logo} alt="book store" />
      </h1>
      <nav className="category">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={
                  category.id === null
                    ? "/books"
                    : `/books?category_id=${category.id}`
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        {isLoggedIn && (
          <ul>
            <li>
              <Link to="/cart">장바구니</Link>
            </li>
            <li>
              <Link to="/orderlist">주문내역</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  storeLogout();
                  naviagate("/login");
                }}
              >
                로그아웃
              </button>
            </li>
          </ul>
        )}
        {!isLoggedIn && (
          <ul>
            <li>
              <a href="/login">
                <FaSignInAlt />
                로그인
              </a>
            </li>
            <li>
              <a href="/signup">
                <FaRegUser />
                회원가입
              </a>
            </li>
          </ul>
        )}
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;

      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;

          display: flex;
          align-items: center;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;
          svg {
            margin-right: 2px;
          }
        }
      }
    }
  }
`;

export default Headers;
