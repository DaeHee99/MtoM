import { useState } from "react";
import { mentoringApplyApi } from "../../api/mentoring";
import { useParams } from "react-router-dom";
import Button from "../common/Button";
import ApplyModal from "./ApplyModal";

export default function Ordering({ show }) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { postId } = useParams();

  const onApplyClick = async () => {
    const result = await mentoringApplyApi(postId);
    if (result) setIsApplyOpen(true);
    else alert("이미 신청한 멘토입니다.");
  };

  return (
    <>
      <section className="w-fit px-4 hidden md:block">
        <div className="border border-red-500 rounded-md p-5 sticky top-32 w-60">
          {localStorage.getItem("nickname") ? (
            show ? (
              <>
                <h1 className="text-xl font-bold text-center text-stone-800">멘토링 하러가기</h1>
                <div className="pt-5 text-center">
                  <Button onClick={onApplyClick}>신청하기</Button>
                </div>
              </>
            ) : (
              <div>이미 신청하셨습니다.</div>
            )
          ) : (
            <div>로그인하세요.</div>
          )}
        </div>
      </section>
      <div className="fixed bottom-0 z-10 p-5 w-full flex items-center justify-center space-x-4 md:hidden border-t border-t-red-500">
        {localStorage.getItem("nickname") ? (
          show ? (
            <>
              <h1 className="text-xl font-bold text-center text-stone-800">멘토링 하러가기</h1>
              <div className="pt-5 text-center">
                <Button onClick={onApplyClick}>신청하기</Button>
              </div>
            </>
          ) : (
            <div>이미 신청하셨습니다.</div>
          )
        ) : (
          <div>로그인하세요.</div>
        )}
      </div>
      <ApplyModal isOpen={isApplyOpen} setIsOpen={setIsApplyOpen}></ApplyModal>
    </>
  );
}
