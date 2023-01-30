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

//dummy
import { CommunityList } from "../data/dummy";

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

	useEffect(() => {
		getcPostList();
	}, []);

	const getcPostList = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/boards/?category=${category[categoryId]}`,
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
			if (response.status === 200) console.log("성공");
			setCPostList(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<CommunitycContainer>
			{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
			<TitleHeader title={category[categoryId]} />
			<SearchInput />
			{hasData ? (
				<div>
					{cPostList.map((cpost) => (
						<PostSummary
							title={cpost.title}
							content={cpost.content}
							writer={cpost.writer}
							postId={cpost.postId}
						/>
					))}
				</div>
			) : (
				<NoDataDiv text="등록된 글이" />
			)}
			<CreateBtn onClick={handleCreate} NavTo={!createModal && "/createPost"} />
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
