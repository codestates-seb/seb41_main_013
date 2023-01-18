import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { Input } from "../components/Input";
import { HomeChallengeItem } from "../components/ChallengeItem";

const HomeCategoryBoard = () => {
  const [selectedOption, setSelectedOption] = useState("최신");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  // useEffect(() => {

  // }, [selectedOption]);

  return (
    <>
      <TitleHeader
        title=""
      />
      <Input
        placeholder="검색어를 입력해주세요"
      />
      <select value={selectedOption} onChange={handleChange}>
        <option value="최신">최신</option>
        <option value="인기">인기</option>
      </select>
      {/* map */}
      <HomeChallengeItemContainer>
        {/* <HomeChallengeItem
          imgUrl={challenge.imgUrl}
          challengeTitle={challenge.title}
          challengerNum={challenge.challengerNum}
          challengeFrequency={challenge.frequency}
          challengeDate={challenge.date}
        /> */}
        <HomeChallengeItem
          imgUrl=""
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
        />
        <HomeChallengeItem
          imgUrl=""
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
        />
      </HomeChallengeItemContainer>
      <BackToTopBtn />
    </>
  );
};

const HomeChallengeItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default HomeCategoryBoard;