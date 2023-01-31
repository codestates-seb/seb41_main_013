import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const postMembers = (data) => axiosInstance.post("/api/members", data);
export const postAuth = (data) => axiosInstance.post("/api/auths/login", data);
