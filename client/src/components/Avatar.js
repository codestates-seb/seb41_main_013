import styled from "styled-components";
import profileImg0 from "../images/profileImg0.png";
import profileImg1 from "../images/profileImg1.png";
import profileImg2 from "../images/profileImg2.png";
import profileImg3 from "../images/profileImg3.png";
import profileImg4 from "../images/profileImg4.png";
import profileImg5 from "../images/profileImg5.png";
import profileImg6 from "../images/profileImg6.png";
import profileImg7 from "../images/profileImg7.png";
import profileImg8 from "../images/profileImg8.png";
import profileImg9 from "../images/profileImg9.png";
import profileImg10 from "../images/profileImg10.png";
import profileImg11 from "../images/profileImg11.png";
import profileImg12 from "../images/profileImg12.png";
import profileImg13 from "../images/profileImg13.png";
import profileImg14 from "../images/profileImg14.png";
import profileImg15 from "../images/profileImg15.png";

export const profileImgBox = [
	profileImg0,
	profileImg1,
	profileImg2,
	profileImg3,
	profileImg4,
	profileImg5,
	profileImg6,
	profileImg7,
	profileImg8,
	profileImg9,
	profileImg10,
	profileImg11,
	profileImg12,
	profileImg13,
	profileImg14,
	profileImg15,
];

//props : 유저 이미지 파일 경로
const Avatar = (props) => {
	return (
		<>
			<StyledAvatar>
				<img
					src={profileImgBox[props.memberId % 16] || "/images/미모티콘.png"}
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
