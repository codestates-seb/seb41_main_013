import styled from "styled-components";

//props : 유저 이미지 파일 경로
const Avatar = (props) => {
	return (
		<>
			<StyledAvatar>
				<img src={props.imgURL || "/images/미모티콘.png"} alt="avatar"></img>
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
