import axios from "axios";

export const axiosInstance = axios.create({});

export const parseJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

axiosInstance.interceptors.request.use(
  (conf) => {
    return conf;
  }
);
axiosInstance.interceptors.response.use(
  (conf) => {
    return conf.data;
  },
  (error) => {
    console.log(error);
    throw error;
  }
)