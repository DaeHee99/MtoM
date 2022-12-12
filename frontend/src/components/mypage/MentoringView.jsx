import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mentoringDeleteApi } from "../../api/mentoring";
import { getMentorPageApi } from "../../api/mypageApi";
import Button from "../common/Button";
import DeleteModal from "./DeleteModal";
import ReviewModal from "./ReviewModal";
import UpdateModal from "./UpdateModal";

export default function MentoringView({ isMentor, data }) {
  return (
    <section className="w-full border border-gray-100 shadow-md px-5 py-5 min-h-[30rem] rounded-md">
      <h2 className="text-3xl font-semibold">{!isMentor ? "내가 신청한 멘토들" : "멘토링 관리"}</h2>
      {!isMentor ? <MenteePart data={data} /> : <MentorPart data={data} />}
    </section>
  );
}

function MenteePart({ data }) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [postId, setPostId] = useState(undefined);
  const onReviewClick = (elem) => () => {
    setIsReviewOpen(true);
    setPostId(elem);
  };
  const onChatClick = () => {};

  return (
    <section className="py-5 space-y-3">
      {data.mlist.map((mentor, index) => (
        <div
          key={mentor.userNickname + index}
          className="flex items-center justify-start p-3 border border-gray-200 rounded-lg"
        >
          <figure className="w-16 h-16 rounded-full overflow-hidden">
            <img src={mentor.menteeProfile} alt="프로필 이미지" className="w-full h-full" />
          </figure>
          <h3 className="text-xl font-bold pl-5 flex-1">{mentor.mentorNickname}</h3>
          <div className="space-x-2 flex items-center">
            {!mentor.iscomment ? (
              <Button onClick={onReviewClick(mentor.postId)}>후기작성</Button>
            ) : (
              <span className="text-gray-500 select-none">후기 작성 완료</span>
            )}
            <Button onClick={onChatClick}>채팅하기</Button>
          </div>
        </div>
      ))}
      <ReviewModal isOpen={isReviewOpen} setIsOpen={setIsReviewOpen} postId={postId} />
    </section>
  );
}

function MentorPart({ data }) {
  const navigate = useNavigate();
  const onMentoringCreate = () => navigate("/regist-mentoring");
  const [mentorPage, setMentorPage] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  useEffect(() => {
    async function getServerData() {
      const result = await getMentorPageApi();
      console.log(result);
      setMentorPage(result);
    }
    getServerData();
  }, []);

  const onDeleteMentoring = async () => {
    const result = await mentoringDeleteApi(mentorPage.postId);
    if (result) {
      alert("성공적으로 삭제되었습니다.");
      navigate(0);
    } else {
      alert("에러 발생");
    }
  };

  return (
    <section>
      {data.mlist.length === 0}
      <div className="border border-gray-300 w-full h-full flex flex-col justify-center items-center py-10 rounded-lg mt-10 space-y-4">
        {mentorPage ? (
          !mentorPage.isPost ? (
            <>
              <h1>아직 멘토링을 생성하지 않으셨습니다.</h1>
              <Button onClick={onMentoringCreate}>멘토링 생성하기</Button>
            </>
          ) : (
            <section className="w-full">
              <h3 className="text-xl text-center"> 멘토링 제목 : {mentorPage.title}</h3>
              <div className="flex items-center justify-end space-x-2 pr-5 py-2">
                <Button
                  onClick={() => {
                    setIsDeleteModal(true);
                  }}
                >
                  멘토링 삭제
                </Button>
                <Button onClick={() => setIsUpdateModal(true)}>멘토링 수정</Button>
              </div>
              <div className="divide-y divide-gray-300 py-5 px-10 ">
                {data.mlist.map((elem) => (
                  <div className="py-5 flex items-center w-full" key={elem.menteeNickname}>
                    <img src={elem.menteeProfile} alt="멘티 프로필" className="w-10 h-10 object-cover mr-5"></img>
                    <span className="text-lg text-gray-800 flex-1">{elem.menteeNickname}</span>
                    <Button>채팅하기</Button>
                  </div>
                ))}
              </div>
              <DeleteModal
                isOpen={isDeleteModal}
                setIsOpen={setIsDeleteModal}
                deletePost={onDeleteMentoring}
              ></DeleteModal>
              <UpdateModal isOpen={isUpdateModal} setIsOpen={setIsUpdateModal} mentorPage={mentorPage}></UpdateModal>
            </section>
          )
        ) : (
          <div> 로딩중</div>
        )}
      </div>
    </section>
  );
}
