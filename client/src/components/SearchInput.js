//Input 컴포넌트를 이용한 검색창 컴포넌트
import { Input } from "../components/Input";

export const SearchInput = (props) => {
	return (
		<>
			<Input
				lineHeight="3rem"
				placeholder="검색어를 입력해주세요"
				fontSize="1rem"
				cols="74"
				margin="1rem 0 0 0"
			/>
		</>
	);
};
