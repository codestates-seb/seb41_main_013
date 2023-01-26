import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://d276-121-129-154-70.jp.ngrok.io",
});

export const postMembers = (data) => axiosInstance.post("/api/members", data);
