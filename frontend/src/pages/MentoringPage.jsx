import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteCommentApi, getCommentApi } from "../api/comment";
import { mentoringPostApi } from "../api/mentoring";
import Button from "../components/common/Button";
import Ordering from "../components/mentoring/Ordering";

export default function MentoringPage() {
  const { postId } = useParams();
  const [mentoringData, setMentoringData] = useState();
  const [commentData, setCommentData] = useState();

  useEffect(() => {
    async function getServerData() {
      const result = await mentoringPostApi(postId);
      console.log(result);
      setMentoringData(result);
    }
    getServerData();
  }, [postId]);

  useEffect(() => {
    async function getServerData() {
      const result = await getCommentApi(postId);
      console.log(result);
      setCommentData(result);
    }
    getServerData();
  }, [postId]);

  const onCommentDelete = (elem) => async () => {
    const result = await deleteCommentApi(elem);
    if (result) {
      alert("삭제되었습니다.");
      setCommentData((commentData) => ({
        ...commentData,
        contents: commentData.contents.filter((comment) => comment.commentId !== elem),
      }));
    } else {
      alert("오류 발생");
    }
  };

  return (
    <main className="flex h-full items-stretch max-w-5xl w-full m-auto">
      {mentoringData ? (
        <section className="h-fit flex-1 p-4 pt-8 sm:p-10">
          <h1 className="text-4xl font-bold pb-2">{mentoringData.title}</h1>
          <div className="flex items-center justify-start space-x-6">
            <div className="flex items-center">
              <img
                src={mentoringData.userProfile}
                alt="유저 프로필"
                className="w-16 h-16 rounded-full object-cover"
              ></img>
              <span className="ml-2 flex-1 text-2xl">{mentoringData.userNickname}</span>
            </div>
            <div className="bg-gray-200 rounded-md p-5 my-3 text-lg font-bold w-fit">
              <p className="text-stone-600">학과 : {mentoringData.mentormajor}</p>
              <p className="text-stone-600">학년 : {mentoringData.grade}학년</p>
            </div>
          </div>
          <section className="pt-10 whitespace-pre-wrap">{mentoringData.content}</section>
          <section className="mt-10 py-5 border-t border-t-red-500">
            <h3 className="text-3xl font-bold">리뷰란</h3>
            {commentData ? (
              <div className="py-6">
                {commentData.contents.map((elem) => (
                  <div key={elem._id} className="flex space-x-2 items-center">
                    <div className="py-4 border-y border-gray-300 flex justify-between flex-1">
                      <span className="text-gray-600">닉네임 : {elem.userNickName}</span>
                      <span className="text-gray-800 whitespace-pre-wrap">{elem.content}</span>
                      <span className="text-gray-500">별점 : {elem.star}</span>
                    </div>
                    <Button onClick={onCommentDelete(elem.commentId)}>삭제</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div>로딩중</div>
            )}
          </section>
        </section>
      ) : (
        <div>로딩중</div>
      )}
      <Ordering></Ordering>
    </main>
  );
}
