import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../../store/authStore";

const BASE_URL = "http://localhost:8888";

const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? getToken() : "",
    },
    withCredentials: true,
    ...config,
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // 로그인 만료 처리
        removeToken();
        window.location.href = "/login";

        return;
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export const httpClient = createClient();
