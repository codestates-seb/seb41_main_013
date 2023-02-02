import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { Loading } from "../components/Loading";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { NoDataDiv } from '../components/NoData';

const HomeCategoryBoard = () => {
  const [selectedOption, setSelectedOption] = useState("new");
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const location = useLocation();
  const categoryNum = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setPage(1);
    setHasMoreData(true);
    getAllChallengesList();
  }

  useEffect(() => {
    getAllChallengesList();
  }, [selectedOption]);

  const category = {
		"0" : "우리동네",
		"1" : "운동",
		"2" : "생활습관",
		"3" : "기타",
	};

  const getAllChallengesList = async () => {
    if(!hasMoreData) return;
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/api/challenges/${selectedOption}?category=${category[categoryNum]}&page=${page}`;
      if (searchTerm !== "") {
        url = `${process.env.REACT_APP_SERVER_URL}/api/challenges?page=${page}&query=${searchTerm}`;
      }
      const response = await axios.get(url,
				{
					withCredentials: true,
				});
      if (response.data.data.length === 0) {
        setHasData(false);
      }
      setChallenges([...response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setHasMoreData(true);
    getAllChallengesList();
  };

  const loadMoreData = () => {
    setPage(page + 1);
    getAllChallengesList();
  };

  const categoryId = {
		"우리동네": "0",
		"운동": "1",
		"생활습관": "2",
		"기타": "3",
	};

  return (
    <HomeCategoryBoardWrapper>
      <TitleHeader
        title={category[categoryNum]}
      />
      <div className="searchSort">
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
      
      { hasData ? (<InfiniteScroll
        className="infinite-scroll"
        dataLength={challenges.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<Loading />}
      >
        {challenges.map((challenge) => (
          <HomeChallengeItem
            imgUrl={challenge.challengeImageUrl}
            challengeTitle={challenge.title}
            challengerNum={`${challenge.challengerCount}명`}
            challengeFrequency={challenge.frequency}
            challengeDate={`${challenge.startAt} - ${challenge.endAt}`}
            NavTo={`/challenges/${categoryId[challenge.category]}/${challenge.challengeId}`}
            key={challenge.challengeId}
            paddingTop="0"
            paddingBottom="1.3rem"
          />))}
      </InfiniteScroll>)
      :
      (<NoDataDiv
        text="관련된 챌린지" />)
      }
      </div>
      <BackToTopBtn />
    </HomeCategoryBoardWrapper>
  );
};

const HomeCategoryBoardWrapper = styled.div`
  position: absolute;
	left: 0;
	top: 5.2rem;
  bottom: 0;
	width: 100%;
  height: auto;
	padding: 0 1.3rem;

  & .searchSort {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & .infinite-scroll-component__outerdiv {
		overflow-y: scroll;

		::-webkit-scrollbar {
			display: none;
		}
	}

  & .infinite-scroll {
    display: flex;
    flex-wrap: wrap;

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
`;

const StyledSelect = styled.select`
  height: 2.5rem;
  width: 5.4rem;
  font-size: 1.3rem;
  border-radius: 0.8rem;
  margin-bottom: 1.3rem;
`;

export default HomeCategoryBoard;