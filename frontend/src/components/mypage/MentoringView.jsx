import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ReviewModal from "./ReviewModal";

export default function MentoringView({ isMentor }) {
  return (
    <section className="w-full border border-gray-100 shadow-md px-5 py-5 min-h-[30rem] rounded-md">
      <h2 className="text-3xl font-semibold">{!isMentor ? "내가 신청한 멘토들" : "멘토링 관리"}</h2>
      {!isMentor ? <MenteePart /> : <MentorPart />}
    </section>
  );
}

const mentorData = [
  {
    userProfile: "/mentoring.jpeg",
    userNickname: "Cuzz",
  },
  {
    userProfile: "/mentoring.jpeg",
    userNickname: "Cuzz",
  },
];

function MenteePart() {
  const onReviewClick = () => setIsReviewOpen(true);
  const onChatClick = () => {};
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <section className="py-5 space-y-3">
      {mentorData.map((mentor, index) => (
        <div
          key={mentor.userNickname + index}
          className="flex items-center justify-start p-3 border border-gray-200 rounded-lg"
        >
          <figure className="w-16 h-16 rounded-full overflow-hidden">
            <img src="/mentoring.jpeg" alt="프로필 이미지" className="w-full h-full" />
          </figure>
          <h3 className="text-xl font-bold pl-5 flex-1">{mentor.userNickname}</h3>
          <div className="space-x-2 flex items-center">
            <Button onClick={onReviewClick}>후기작성</Button>
            <Button onClick={onChatClick}>채팅하기</Button>
            <XMarkIcon className="w-10 h-10 text-red-500 cursor-pointer" />
          </div>
        </div>
      ))}
      <ReviewModal isOpen={isReviewOpen} setIsOpen={setIsReviewOpen} />
    </section>
  );
}

function MentorPart() {
  const navigate = useNavigate();
  const onMentoringCreate = () => navigate("/regist-mentoring");

  return (
    <section>
      <div className="border border-gray-300 w-full h-full flex flex-col justify-center items-center py-10 rounded-lg mt-10 space-y-4">
        <h1>아직 멘토링을 생성하지 않으셨습니다.</h1>
        <Button onClick={onMentoringCreate}>멘토링 생성하기</Button>
      </div>
      {/* <div className="border border-gray-300 w-full p-5 mt-10 rounded-md flex flex-col items-center justify-center space-x-2">
        <div className="max-w-[20rem] w-fit">
          <h3 className="text-lg font-semibold">안녕하세요. 구교현입니다.</h3>
          <div>
            <p>학과 : 소프트웨어</p>
            <p>학년 : 4학년</p>
          </div>
        </div>
        <div className="flex mt-6 space-x-2">
          <Button>수정하기</Button>
          <Button>채팅하기</Button>
        </div>
      </div> */}
    </section>
  );
}
