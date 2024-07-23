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

type RequestMethod = "get" | "post" | "put" | "delete";

// 공통 요청 부분
export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T
) => {
  let response;
  switch (method) {
    case "post": {
      response = await httpClient.post(url, payload);
      break;
    }
    case "get": {
      response = await httpClient.get(url);
      break;
    }
    case "delete": {
      response = await httpClient.delete(url);
      break;
    }
    case "put": {
      response = await httpClient.put(url, payload);
      break;
    }
  }

  return response.data;
};
