import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Title from "../shared/components/Title";
import InputText from "../shared/components/InputText";
import Button from "../shared/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, signup } from "../shared/api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";

export interface SignupProps {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    login(data).then(
      (res) => {
        //상태변화
        storeLogin(res.token);
        // localStorage.setItem("token", res.token)

        showAlert("로그인 완료되었습니다.");

        navigate("/");
      },
      (error) => {
        showAlert("로그인에 실패 했습니다.");
      }
    );
  };

  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              // value={email}
              // onChange={handleEmailChange}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              // value={password}
              // onChange={handlePasswordChange}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요</p>
            )}
          </fieldset>
          <fieldset>
            <Button size="medium" scheme="primary">
              로그인
            </Button>
          </fieldset>
          <fieldset>
            <div className="info">
              <Link to="/reset">비밀번호 초기화</Link>
            </div>
          </fieldset>
        </form>
      </SignupStyle>
    </>
  );
}

export default Login;
