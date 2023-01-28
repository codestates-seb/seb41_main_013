//커뮤니티 카테고리 선택 후 페이지
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommunityContainer } from "./Community";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

//components
import { PostSummary } from "../components/PostSummary";
import { TitleHeader } from "../components/Header";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import { Modal } from "../components/Modal";
import { Loading } from "../components/Loading";

//dummy
//import { CommunityList } from "../data/dummy";

//props : 카테고리명 - 우리 동네/운동/규칙적인 생활/기타
export const CommunityCategoryBoard = () => {
	const { categoryId } = useParams();
	const category = ["우리동네", "운동", "규칙적인 생활", "기타"];
	//유저 정보
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);

	const [createModal, setCreateModal] = useState(false);
	const handleCreate = () => {
		//로그인이 되어 있지 않다면
		if (!loginUserInfo) {
			setCreateModal(true);
			setTimeout(() => {
				setCreateModal(false);
			}, 1000);
		}
	};

	const [postList, setPostList] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	useEffect(() => {
		getPostList();
	}, []);

	const loadMoreData = () => {
		setPage(page + 1);
		getPostList();
	};
	const getPostList = async () => {
		if (!hasMoreData) return;
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/boards`,
				{
					headers: {
						Authorization: `Bearer ${loginUserInfo.accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.data.length < 10) {
				setHasMoreData(false);
			}
			setPostList([...postList, ...response.data]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
			<TitleHeader title={category[categoryId]} />
			<CommunityContainer>
				<div className="marg">
					<SearchInput />
				</div>
				<InfiniteScroll
					className="infinite-scroll"
					dataLength={postList.length}
					next={loadMoreData}
					hasMore={hasMoreData}
					loader={<Loading />}
				>
					{postList
						.filter((post) => post.categoryId == categoryId)
						.map((cpost) => (
							<PostSummary
								title={cpost.title}
								content={cpost.content}
								writer={cpost.writer}
								postId={cpost.postId}
							/>
						))}
				</InfiniteScroll>
			</CommunityContainer>
			<CreateBtn onClick={handleCreate} NavTo={!createModal && "/createPost"} />
			<BackToTopBtn />
		</>
	);
};
