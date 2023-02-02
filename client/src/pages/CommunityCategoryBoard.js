//커뮤니티 카테고리 선택 후 페이지
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//components
import { PostSummary } from "../components/PostSummary";
import { TitleHeader } from "../components/Header";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import { Modal } from "../components/Modal";
import { NoDataDiv } from "../components/NoData";

//props : 카테고리명 - 우리 동네/운동/규칙적인 생활/기타
export const CommunityCategoryBoard = () => {
	const { categoryId } = useParams();
	const category = ["우리동네", "운동", "생활습관", "기타"];
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

	const [cPostList, setCPostList] = useState([]);
	const [hasData, setHasData] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [searchTerm, setSearchTerm] = useState(""); //검색어

	useEffect(() => {
		getcPostList();
	}, []);

	const getcPostList = async () => {
		if (!hasMoreData) return;
		let url = `${process.env.REACT_APP_SERVER_URL}/api/boards?page=${page}&category=${category[categoryId]}`;
		try {
			if (searchTerm !== "") {
				url = `${process.env.REACT_APP_SERVER_URL}/api/boards/search?page=${page}&category=${category[categoryId]}&query=${searchTerm}`;
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
			setCPostList(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};
	const handleSearch = (e) => {
		e.preventDefault();
		setPage(1);
		setHasMoreData(true);
		getcPostList();
	};

	return (
		<CommunitycContainer>
			{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
			<TitleHeader title={category[categoryId]} />
			<SearchInput
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === "Enter") handleSearch(e);
				}}
			/>
			{hasData ? (
				<div>
					{cPostList.map((cpost) => (
						<PostSummary
							title={cpost.title}
							content={cpost.content}
							writer={cpost.memberName}
							boardId={cpost.boardId}
							date={cpost.createdAt}
							memberId={cpost.memberId}
						/>
					))}
				</div>
			) : (
				<NoDataDiv text="등록된 글이" />
			)}
			<CreateBtn
				onClick={handleCreate}
				NavTo={isLogin ? "/createPost" : `/community/${categoryId}`}
			/>
			<BackToTopBtn />
		</CommunitycContainer>
	);
};

const CommunitycContainer = styled.div`
	position: absolute;
	left: 0;
	top: 5rem;
	bottom: 6.5rem;
	overflow-y: scroll;
	width: 100%;
	padding: 0 1.3rem;

	.m {
		margin-bottom: 1rem;
	}
	::-webkit-scrollbar {
		display: none;
	}
`;
