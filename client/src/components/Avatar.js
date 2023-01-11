import styled from "styled-components";

const StyledAvatar = styled.div`
	& > img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
`;

const Avatar = ({ imgURL }) => {
	return (
		<>
			<StyledAvatar>
				<img src={imgURL || "/images/미모티콘.png"} alt="avatar"></img>
			</StyledAvatar>
		</>
	);
};

export default Avatar;
