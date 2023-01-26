import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://02ec-121-129-154-70.jp.ngrok.io",
});

export const postMembers = (data) => axiosInstance.post("/api/members", data);
export const postAuth = (data) => axiosInstance.post("/api/auths/login", data);
