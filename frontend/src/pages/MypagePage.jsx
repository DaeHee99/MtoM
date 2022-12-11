import { useEffect } from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { getMyInfoApi } from "../api/mypageApi";
import MentoringView from "../components/mypage/MentoringView";
import ProfileView from "../components/mypage/ProfileView";
import myPageInfoAtom from "../recoil/myPageInfoAtom";

export default function MypagePage() {
  const isMentor = localStorage.getItem("isMentor") === "true";
  const [myInfo, setMyInfo] = useState(undefined);
  const setMyPageInfo = useSetRecoilState(myPageInfoAtom);

  useEffect(() => {
    async function getMyInfo() {
      const result = await getMyInfoApi();
      console.log(result);
      setMyInfo(result);
      setMyPageInfo(result);
    }
    getMyInfo();
  }, []);

  return (
    <>
      {myInfo ? (
        <div className="flex flex-col items-start max-w-5xl px-8 m-auto py-20 space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0">
          <ProfileView isMentor={isMentor} data={myInfo} />
          <MentoringView isMentor={isMentor} data={myInfo} />
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
