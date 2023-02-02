import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Loading } from "../components/Loading";
import { Footer } from "../components/Footer";
import { MainHeader, MypageHeader, TitleHeader } from "../components/Header";
// challenge
import Home from "../pages/Home";
import HomeCategoryBoard from "../pages/HomeCategoryBoard";
import ChallengeDetail from "../pages/ChallengeDetail";
import CreateChallenge from "../pages/CreateChallenge";
import MyChallenge from "../pages/MyChallenge";
import MyChallengeUpload from "../pages/MyChallengeUpload";
import MyChallengeOthers from "../pages/MyChallengeOthers";
//mypage
import { MyPage } from "../pages/MyPage";
import { UserCreateChallenge } from "../pages/UserCreateChallenge";
import { UserCompleteChallenge } from "../pages/UserCompleteChallenge";
import { UserProfileEdit } from "../pages/UserProfileEdit";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
//community
import { Community } from "../pages/Community";
import { CommunityCategoryBoard } from "../pages/CommunityCategoryBoard";
import { CreatePost } from "../pages/CreatePost";
import { UpdatePost } from "../pages/UpdatePost";
import { PostDetail } from "../pages/PostDetail";

const Overlaps = ({ hasHeader, hasFooter }) => {
	return (
		<>
			{hasHeader && <MainHeader />}
			<Outlet />
			{hasFooter && <Footer />}
		</>
	);
};

export const Router = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<Overlaps hasHeader={false} hasFooter={false} />}>
					<Route path="/userCreate" element={<UserCreateChallenge />} />
					<Route path="/userComplete" element={<UserCompleteChallenge />} />
					<Route path="/editProfile" element={<UserProfileEdit />} />
					<Route
						path="/challenges/:categoryId"
						element={<HomeCategoryBoard />}
					/>
					<Route
						path="/challenges/:categoryId/:challengeId"
						element={<ChallengeDetail />}
					/>
					<Route path="/challenges/create" element={<CreateChallenge />} />
					<Route
						path="/mychallenge/:challengeId/upload"
						element={<MyChallengeUpload />}
					/>
					<Route
						path="/mychallenge/:challengeId/others"
						element={<MyChallengeOthers />}
					/>
				</Route>
				<Route element={<Overlaps hasHeader={true} hasFooter={true} />}>
					<Route path="/" element={<Home />} />
					<Route path="/mychallenge" element={<MyChallenge />} />
					<Route path="/community" element={<Community />} />
				</Route>
				<Route element={<Overlaps hasHeader={false} hasFooter={true} />}>
					<Route path="/mypage" element={<MyPage />} />
					<Route
						path="/community/:categoryId"
						element={<CommunityCategoryBoard />}
					/>
					<Route path="/createPost" element={<CreatePost />} />
					<Route path="/post/:boardId/update" element={<UpdatePost />} />
					<Route path="/post/:boardId" element={<PostDetail />} />
				</Route>
				<Route element={<Overlaps hasHeader={true} hasFooter={false} />}>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<SignIn />} />
				</Route>
			</Routes>
		</Suspense>
	);
};
