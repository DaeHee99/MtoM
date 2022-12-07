import MentoringView from "../components/mypage/MentoringView";
import ProfileView from "../components/mypage/ProfileView";

export default function MypagePage() {
  return (
    <div className="flex flex-col items-start max-w-5xl px-8 m-auto py-20 space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0">
      <ProfileView />
      <MentoringView />
    </div>
  );
}
