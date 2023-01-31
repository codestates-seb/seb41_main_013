import styled from "styled-components";
import { TitleHeader } from "../components/Header";
import dummyimage from "../assets/images/dummyimage.JPG";

const MyChallengeOthers = () => {
  return (
    <>
      <TitleHeader
        title=""
      />
      {/* map */}
      <ImageWrapper>
        <StyledImg src={dummyimage} alt="" />
        <StyledImg src={dummyimage} alt="" />
        <StyledImg src={dummyimage} alt="" />
        <StyledImg src={dummyimage} alt="" />
        <StyledImg src={dummyimage} alt="" />
      </ImageWrapper>
    </>
  );
};

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 36.4rem;
  gap: 0.2rem;
`;

const StyledImg = styled.img`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
`;

export default MyChallengeOthers;