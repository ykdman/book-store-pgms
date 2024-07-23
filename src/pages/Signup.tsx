import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Title from "../shared/components/Title";
import InputText from "../shared/components/InputText";
import Button from "../shared/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../shared/api/auth.api";
import { useAlert } from "../hooks/useAlert";

export interface SignupProps {
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  // const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(email, password);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    signup(data).then((res) => {
      //성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };
  return (
    <>
      <Title size="large">회원가입</Title>
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
              회원가입
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

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
