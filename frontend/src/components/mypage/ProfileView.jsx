import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function ProfileView({ isMentor, data }) {
  const navigate = useNavigate();

  const onMentorRegistClick = () => {
    navigate("/regist-mentor");
  };

  return (
    <section className="w-full border border-gray-100 shadow-md rounded-lg py-5 px-3 flex flex-col items-center sm:w-96">
      <figure className="w-32 h-32 rounded-full overflow-hidden">
        <img src={data.userProfile} alt="프로필이미지" className="w-full h-full"></img>
      </figure>
      <h2 className="text-3xl font-bold text-stone-700 pt-6">{data.nickname}</h2>
      <div className="w-full px-3 pt-3 text-stone-500 pb-6 max-w-sm m-auto">
        {isMentor ? (
          <>
            <p>학년 : {data.grade}학년</p>
            <p>학과 : {data.major}</p>
            <p>이메일 : {data.email}</p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {!isMentor && <Button onClick={onMentorRegistClick}>멘토신청</Button>}
        <Button>수정하기</Button>
      </div>
    </section>
  );
}
