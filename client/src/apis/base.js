import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: "http://ec2-3-39-238-119.ap-northeast-2.compute.amazonaws.com:8080",
// });
const axiosInstance = axios.create({
	baseURL: "https://93da-121-129-154-70.jp.ngrok.io",
});

export const postMembers = (data) => axiosInstance.post("/api/members", data);
export const postAuth = (data) => axiosInstance.post("/api/auths/login", data);

// 이미지 업로드
export const postImg = (formData) =>
	axiosInstance.post("/api/upload", formData);
// 회원정보 수정
export const patchMembers = (data) => axiosInstance.post("/api/members", data);

// 회원이 생성한 챌린지 조회
export const getUserCreateChallenge = () =>
	axiosInstance.get("/api/challenges/host");
// 회원이 완료한 챌린지 조회
export const getUserCompletedChallenge = () =>
	axiosInstance.get("/api/challengers");
// 회원이 참여중인 챌린지 조회
export const getUserParticipateChallenge = () =>
	axiosInstance.get("/api/challengers");
