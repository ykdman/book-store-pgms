import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaBars,
  FaAngleRight,
} from "react-icons/fa";

import logo from "../../../assets/img/bookstorelogo1.svg";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../models";
import { fetchCategory } from "../../api/category.api";
import { useCategory } from "../../../hooks/useCategory";
import { useAuthStore } from "../../../store/authStore";
import Dropdown from "../Dropdown";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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

  const { isMobile } = useMediaQuery();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className="logo">
        <img src={logo} alt="book store" />
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
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
        <Dropdown toggleButton={<FaUserCircle />}>
          {isLoggedIn && (
            <ul>
              <li>
                <Link to="/carts">장바구니</Link>
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
          <ThemeSwitcher />
        </Dropdown>
      </nav>
    </HeaderStyle>
  );
}

interface HeaderStyleProps {
  $isOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
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
    .menu-button {
      display: none;
    }

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
      flex-direction: column;
      width: 100px;
      gap: 16px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;

          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
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

  // Mobile Width
  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;

      img {
        width: 40px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .category {
      .menu-button {
        display: flex;

        position: absolute;
        top: 14px;
        right: ${({ $isOpen }) => ($isOpen ? "62%" : "56px")};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
        transition: right 0.3s ease-in-out;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin: 0;
        padding: 24px;
        z-index: 1000;
        flex-direction: column;
        transition: right 0.3s ease-in-out;
      }
    }
  }
`;

export default Headers;
