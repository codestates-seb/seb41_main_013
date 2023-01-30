//커뮤니티 메인 페이지
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

//components
import { PostSummary } from "../components/PostSummary";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import { HomeCategory } from "../components/Category";
import { Modal } from "../components/Modal";
import { Loading } from "../components/Loading";
import { NoDataDiv } from "../components/NoData";

//dummy
//import { CommunityList } from "../data/dummy";

export const Community = () => {
	//유저 정보
	const accessToken = localStorage.getItem("authorization");
	const isLogin = useSelector((state) => state.loginStatus.status);

	const [createModal, setCreateModal] = useState(false);
	const handleCreate = () => {
		//로그인이 되어 있지 않다면
		if (!isLogin) {
			setCreateModal(true);
			setTimeout(() => {
				setCreateModal(false);
			}, 1000);
		}
	};

	const [postList, setPostList] = useState([]);
	const [hasData, setHasData] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);

	useEffect(() => {
		getPostList();
	}, []);

	const getPostList = async () => {
		if (!hasMoreData) return;
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/boards`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.data.data.length === 0) {
				setHasData(false);
			}
			if (response.data.length < 10) {
				setHasMoreData(false);
			}
			setPostList(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const loadMoreData = () => {
		setPage(page + 1);
		getPostList();
	};

	return (
		<>
			{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
			<HomeCategory NavTo="community" />
			<CommunityContainer>
				<div className="margin">
					<SearchInput />
				</div>
				{hasData ? (
					<InfiniteScroll
						className="infinite-scroll"
						dataLength={postList.length}
						next={loadMoreData}
						hasMore={hasMoreData}
						loader={<Loading />}
					>
						{postList.map((post) => (
							<div className="m">
								<PostSummary
									title={post.title}
									content={post.content}
									writer={post.memberName}
									postId={post.boardId}
									date={post.createdAt}
								/>
							</div>
						))}
					</InfiniteScroll>
				) : (
					<NoDataDiv text="등록된 글이" />
				)}
				{/*{CommunityList.map((post) => (
						<div className="margin">
							<PostSummary
								title={post.title}
								content={post.content}
								writer={post.writer}
								postId={post.postId}
							/>
						</div>
					))}*/}
			</CommunityContainer>
			<CreateBtn onClick={handleCreate} NavTo={!createModal && "/createPost"} />
			<BackToTopBtn />
		</>
	);
};

export const CommunityContainer = styled.div`
	margin-bottom: 6.5rem;

	.margin {
		margin-top: 15rem;
		margin-bottom: 1rem;
	}
	.marg {
		margin-top: 5rem;
		margin-bottom: 1rem;
	}
	.m {
		margin-bottom: 1rem;
	}
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
