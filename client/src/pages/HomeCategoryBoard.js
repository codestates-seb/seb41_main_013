import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { Input } from "../components/Input";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { Loading } from "../components/Loading";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

const HomeCategoryBoard = () => {
  const [selectedOption, setSelectedOption] = useState("new");
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  useEffect(() => {
    getAllChallengesList();
  }, [selectedOption]);

  const getAllChallengesList = async () => {
    if(!hasMoreData) return;
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/api/challenges/${selectedOption}?page=${page}`;
      if (searchTerm !== "") {
        url = `${process.env.REACT_APP_SERVER_URL}/api/challenges?page=${page}&query=${searchTerm}`;
      }
      const response = await axios.get(url);
      if (response.data.length < 10) { setHasMoreData(false); }
      setChallenges([...challenges, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getAllChallengesList();
  };

  const loadMoreData = () => {
    setPage(page + 1);
    getAllChallengesList();
  };

  const categoryId = {
		"우리 동네": "0",
		"운동": "1",
		"규칙적인 생활": "2",
		"기타": "3",
	};

  return (
    <HomeCategoryBoardWrapper>
      <TitleHeader
        title={challenges.category}
      />
      <StyledInput
        placeholder="검색어를 입력해주세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
      />
      <StyledSelect value={selectedOption} onChange={handleChange}>
        <option value="new">최신</option>
        <option value="hot">인기</option>
      </StyledSelect>
      <InfiniteScroll
        className="infinite-scroll"
        dataLength={challenges.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<Loading />}
      >
        {challenges.map((challenge) => (
          <HomeChallengeItem
            imgUrl={challenge.imageUrl}
            challengeTitle={challenge.title}
            challengerNum={challenge.challengerCount}
            challengeFrequency={challenge.frequency}
            challengeDate={`${challenge.StartAt} - ${challenge.EndAt}`}
            NavTo={`/challenges/${categoryId[challenge.category]}/${challenge.challengeId}`}
          />))}
      </InfiniteScroll>
      <BackToTopBtn />
    </HomeCategoryBoardWrapper>
  );
};

const HomeCategoryBoardWrapper = styled.div`
  margin-top: 5.2rem;

  & .infinite-scroll {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 1rem 0;
  padding: 0.6rem;
  border: 0.1rem solid #4d4d4d;
  border-radius: 0.8rem;
  font-size: 1.3rem;
  font-family: "Inter";
	font-style: normal;
`

const StyledSelect = styled.select`
  height: 2.5rem;
  font-size: 1.3rem;
  border-radius: 0.8rem;
`;

export default HomeCategoryBoard;