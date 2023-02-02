import styled from "styled-components";
import { useSelector } from "react-redux";

//props : 유저 이미지 파일 경로
const Avatar = (props) => {
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);

	return (
		<>
			<StyledAvatar>
				<img
					src={loginUserInfo.profileImg || "/images/미모티콘.png"}
					alt="avatar"
				></img>
			</StyledAvatar>
		</>
	);
};

const StyledAvatar = styled.div`
	& > img {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}
`;

export default Avatar;
