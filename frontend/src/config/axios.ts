import { backendUri } from "@/common/lib/getEnv";
import axios, { AxiosInstance } from "axios";

const options = {
  withCredentials: true,
  baseURL: backendUri,
};

const API: AxiosInstance = axios.create(options);

export default API;
