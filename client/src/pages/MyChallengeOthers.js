import styled from "styled-components";
import { TitleHeader } from "../components/Header";
import { Loading } from "../components/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { random } from "../images/random";

const MyChallengeOthers = () => {
  const [imagesUrl, setImagesUrl] = useState([]);
  const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);

  const location = useLocation();
  const challengeId = location.pathname.split("/")[2];
  const accessToken = localStorage.getItem("authorization");


  useEffect(() => {
    getAllImages();
  }, []);

  const getAllImages = async () => {
    if (!hasMoreData) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/snapshots/${challengeId}?page={page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      if (response.data.data.length < 30) {
				setHasMoreData(false);
			}
      setImagesUrl([...imagesUrl, ...response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreData = () => {
    setPage(page + 1);
    getAllImages();
  };

  return (
    <MyChallengeOthersWrapper>
      <TitleHeader
        title={imagesUrl.challengeName}
      />
      {/* <InfiniteScroll
				className="infinite-scroll"
        dataLength={imagesUrl.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<Loading />}
      > */}
        <ImageWrapper>
          {/* {imagesUrl.map((imageUrl) => (
            <StyledImg src={imageUrl.url} alt={imageUrl.url} />
          ))} */}
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
          <StyledImg src={random[Math.floor(Math.random() * random.length)]} alt="" />
        </ImageWrapper>
        
      {/* </InfiniteScroll> */}
    </MyChallengeOthersWrapper>
  );
};

const MyChallengeOthersWrapper = styled.div`
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

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledImg = styled.img`
  width: calc(33.33% - 0.2rem);
  aspect-ratio: 1/1;
  margin: 0.1rem;
  object-fit: cover;
`;

export default MyChallengeOthers;