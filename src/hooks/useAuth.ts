import { SignupProps } from "@/pages/Login";
import {
  login,
  resetPassword,
  resetRequest,
  signup,
} from "@/shared/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  // 상태
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();

  const userLogin = (data: SignupProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);
        showAlert("로그인이 완료되었습니다.");
        navigate("/");
      },
      (err) => {
        showAlert("로그인에 실패했습니다.");
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then(
      (res) => {
        showAlert("회원가입이 완료되었습니다.");
        navigate("/");
      },
      (err) => {
        showAlert("회원가입에 실패하였습니다.");
      }
    );
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화 되었습니다.");
      navigate("/login");
    });
  };

  const [resetRequested, setResetRequested] = useState<boolean>(false);

  const userResetRequested = (data: SignupProps) => {
    resetRequest(data).then(() => setResetRequested(true));
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequested,
    resetRequested,
    setResetRequested,
  };
};
