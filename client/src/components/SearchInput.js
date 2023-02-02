//Input 컴포넌트를 이용한 검색창 컴포넌트
import styled from "styled-components";

export const SearchInput = (props) => {
	return (
		<StyledInput
			placeholder="검색어를 입력해주세요"
			value={props.value}
			onChange={props.onChange}
			onKeyUp={props.onKeyUp}
		/>
	);
};

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
