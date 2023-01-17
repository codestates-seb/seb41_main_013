import styled from "styled-components";
import { TitleHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";
import { Input } from "../components/Input";
import { SelectCategory } from "../components/Category";
import { ImageUploader } from "../components/ImageUploader";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useState } from 'react';

const CreateChallenge = () => {
  return (
    <>
      <TitleHeader
        title="챌린지 생성하기"
      />
      <Wrapper>
        <Input
          label="제목"
          placeholder="챌린지 제목을 입력해주세요"
        />
      </Wrapper>
      <Wrapper>
        <Label>카테고리</Label>
        <SelectCategory />
      </Wrapper>
      <Wrapper>
        <Label>사진</Label>
        <ImageUploader
          width="9rem"
          height="9rem"
        />
      </Wrapper>
      <Wrapper>
        <Label>기간</Label>
        <PickersWrapper>
          <DatePickers />
          <DatePickers />
        </PickersWrapper>
      </Wrapper>
      <Wrapper>
        <Label>빈도</Label>
        <BtnWrapper>
          {["매일", "주 1일", "주 2일", "주 3일", "주 4일", "주 5일", "주 6일"]
          .map((el, idx) => <Btn
            key={idx}
            background={theme.color.gray}
            color={theme.color.navy}
            btnText={el}
            // onClick
          />)}
        </BtnWrapper>
      </Wrapper>
      <Wrapper>
        <Label>인증시간</Label>
        <PickersWrapper>
          <TimePickers />
          <TimePickers />
        </PickersWrapper>
      </Wrapper>
      <Wrapper>
        <Input
        label="챌린지 소개"
        placeholder="인증방법을 포함하여 챌린지에 대한 소개를 작성해주세요"
        rows="12"
      />
      </Wrapper>
      <Wrapper>
        <Label>유의사항</Label>
        <p>챌린지를 등록하면 수정하실 수 없습니다.</p>
        <p>또한, 아직 시작되지 않았거나 참여자가 없는 경우에만 삭제 가능합니다.</p>
      </Wrapper>  
      <Btn
          background={theme.color.green}
          width="100%"
          height="4.8rem"
          // fontWeight="700"
          size="1.4rem"
          btnText="등록하기"
          margin="0"
        />
      {/* <TwoBtnModal 
        modalText="작성을 취소하시겠습니까?"
        btnTextOrg="네"
        btnTextGry="아니요"
      />
      <TwoBtnModal 
        modalText="등록하시겠습니까?"
        btnTextOrg="확인"
        btnTextGry="취소"
      /> */}
    </>
  );
};

const DatePickers = () => {
  const [date, setDate] = useState(dayjs());

  const handleChange = (e) => {
    setDate(e)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        inputFormat="YYYY/MM/DD"
        value={date}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

const TimePickers = () => {
  const [time, setTime] = useState(dayjs());

  // console.log(time.$H);
  // console.log(time.$m);

  const handleChange = (e) => {
    setTime(e)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledTimePicker
        value={time}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

const StyledTimePicker = styled(TimePicker)`
  width: 49%;

  & > div {
    font-size: 1.3rem;
    height: 4rem;
  }
`;

const StyledDatePicker = styled(DatePicker)`
width: 49%;

& > div {
  font-size: 1.3rem;
  height: 4rem;
}
`;

const PickersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-size: 1.4rem;
  line-height: 3rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default CreateChallenge;