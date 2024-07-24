import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Title from "../shared/components/Title";
import InputText from "../shared/components/InputText";
import Button from "../shared/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword, resetRequest, signup } from "../shared/api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuth } from "@/hooks/useAuth";

export interface ResetPasswordProps {
  email: string;
  password: string;
}

function ResetPassword() {
  // const [resetRequested, setResetRequested] = useState<boolean>(false);
  const {
    userResetPassword,
    resetRequested,
    userResetRequested,
    setResetRequested,
  } = useAuth();
  const hadleResetReqToggle = () => {
    setResetRequested((prev) => !prev);
  };

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>();

  const onSubmit = (data: ResetPasswordProps) => {
    if (resetRequested) {
      // 비밀번호 초기화 함수 호출
      userResetPassword(data);
    } else {
      // 초기화 요청
      userResetRequested(data);
    }
  };
  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
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
          {resetRequested && (
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
          )}
          <fieldset>
            <Button size="medium" scheme="primary">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
          <fieldset>
            <div className="info">
              <Link to="reset">비밀번호 초기화</Link>
            </div>
          </fieldset>
        </form>
      </SignupStyle>
    </>
  );
}

export default ResetPassword;
