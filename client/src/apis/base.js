import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const postMembers = (data) => axiosInstance.post("/api/members", data);
export const postAuth = (data) => axiosInstance.post("/api/auths/login", data);
export const getMembers = () => axiosInstance.get(`/api/members`);

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
