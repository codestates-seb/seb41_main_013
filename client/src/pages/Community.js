//커뮤니티 메인 페이지
import styled from "styled-components";

//components
import { PostSummary } from "../components/PostSummary";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import { HomeCategory } from "../components/Category";
import { Modal } from "../components/Modal";

//dummy
import { CommunityList } from "../data/dummy";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Community = () => {
	const user = null; //유저 정보 (from 로컬스토리지)
	const [createModal, setCreateModal] = useState(false);
	const handleCreate = () => {
		//로그인이 되어 있지 않다면
		if (!user) setCreateModal(true);
		else Navigate("./createPost");
	};
	return (
		<>
			<CommunitycContainer>
				{createModal && <Modal modalText="로그인 이후 글 작성이 가능합니다." />}
				<HomeCategory NavTo="community" />
				<div className="margin">
					<SearchInput />
				</div>
				{CommunityList.map((post) => (
					<div className="margin">
						<PostSummary
							title={post.title}
							content={post.content}
							writer={post.writer}
							postId={post.postId}
						/>
					</div>
				))}
			</CommunitycContainer>
			<CreateBtn onClick={handleCreate} />
			<BackToTopBtn />
		</>
	);
};

const CommunitycContainer = styled.div`
	margin-top: 15rem;
	margin-bottom: 6.5rem;

	.margin {
		margin-bottom: 1rem;
	}
`;
