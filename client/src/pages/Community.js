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
import { Loading } from "../components/Loading";

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
	const [searchTerm, setSearchTerm] = useState(""); //검색어

	useEffect(() => {
		getPostList();
	}, []);

	const getPostList = async () => {
		if (!hasMoreData) return;
		let url = `${process.env.REACT_APP_SERVER_URL}/api/boards?page=${page}`;
		try {
			if (searchTerm !== "") {
				url = `${process.env.REACT_APP_SERVER_URL}/api/boards/search?page=${page}&query=${searchTerm}`;
			}
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			});
			if (response.data.data.length === 0) {
				setHasData(false);
			}
			setPostList([...response.data.data]);
		} catch (error) {
			console.error(error);
		}
	};

	const loadMoreData = () => {
		setPage(page + 1);
		getPostList();
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setPage(1);
		setHasMoreData(true);
		getPostList();
	};

	return (
		<CommunityContainer>
			{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
			<HomeCategory NavTo="community" />
			<SearchInput
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === "Enter") handleSearch(e);
				}}
			/>
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
								date={post.createdAt}
								memberId={post.memberId}
								boardId={post.boardId}
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
