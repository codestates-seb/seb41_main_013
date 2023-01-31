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
import { NoDataDiv } from "../components/NoData";
<<<<<<< HEAD
import { Loading } from "../components/Loading";
=======
>>>>>>> 6f6f3d987b793446ad19303bef95f0f34a12ff95

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
				`${process.env.REACT_APP_SERVER_URL}/api/boards?page=${page}`,
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
			if (response.data.data.length < 10) {
				setHasMoreData(false);
			}
			setPostList([...postList, ...response.data.data]);
		} catch (error) {
			console.error(error);
		}
	};

	const loadMoreData = () => {
		setPage(page + 1);
		getPostList();
	};

	return (
		<CommunityContainer>
			{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
			<HomeCategory NavTo="community" />
			<SearchInput />
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
			<CreateBtn
				onClick={handleCreate}
				NavTo={isLogin ? "/createPost" : "/community"}
			/>
			<BackToTopBtn />
		</CommunityContainer>
	);
};

const CommunityContainer = styled.div`
	position: absolute;
	left: 0;
	top: 15rem;
	bottom: 6.5rem;
	overflow-y: scroll;
	width: 100%;
	padding: 0 1.3rem;

	::-webkit-scrollbar {
		display: none;
	}
`;
