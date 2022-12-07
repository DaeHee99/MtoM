import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function ProfileView() {
  const [isMentee, setIsMentee] = useState(true);
  const navigate = useNavigate();

  const onMentorRegistClick = () => {
    navigate("/regist-mentor");
  };

  return (
    <section className="w-full border border-gray-100 shadow-md rounded-lg py-5 px-3 flex flex-col items-center sm:w-96">
      <figure className="w-32 h-32 rounded-full overflow-hidden">
        <img src="/mentoring.jpeg" alt="프로필이미지" className="w-full h-full"></img>
      </figure>
      <h2 className="text-3xl font-bold text-stone-700 pt-6">Cuzz</h2>
      <div className="w-full px-3 pt-3 text-stone-500 pb-6 max-w-sm m-auto">
        {isMentee ? (
          <></>
        ) : (
          <>
            <p>학년 : 4학년</p>
            <p>학과 : 소프트웨어학과</p>
            <p>이메일 : rygus9@naver.com</p>
          </>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isMentee && <Button onClick={onMentorRegistClick}>멘토신청</Button>}
        <Button>수정하기</Button>
      </div>
    </section>
  );
}
