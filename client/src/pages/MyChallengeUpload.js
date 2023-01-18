import styled from "styled-components";
import { Btn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { OneBtnModal, TwoBtnModal } from "../components/Modal";
import theme from "../components/theme";

const MyChallengeUpload = () => {
  return (
    <MyChallengeUploadWrapper>
      <TitleHeader
        title=""
      />
      <ImageUploader
        width="30rem"
        height="30rem"
      />
      <Btn
        background={theme.color.green}
        width="100%"
        height="4.8rem"
        // fontWeight="700"
        size="1.4rem"
        btnText="등록하기"
      />
      {/* <TwoBtnModal 
        modalText="등록하시겠습니까?"
        btnTextOrg="확인"
        btnTextGry="취소"
      />
      <OneBtnModal
        modalText="인증 가능한 시간이 아닙니다."
        btnText="확인"
      /> */}
    </MyChallengeUploadWrapper>
  );
};

const MyChallengeUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.3rem;
`;

export default MyChallengeUpload;