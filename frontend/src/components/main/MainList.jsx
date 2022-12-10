import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function MainList({ contents }) {
  return (
    <>
      {contents.length !== 0 ? (
        <section className="max-w-5xl m-auto grid grid-cols-1 gap-2 pt-1 pb-12 px-6 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {contents.map((card) => (
            <Card key={card.postId} {...card}></Card>
          ))}
        </section>
      ) : (
        <div className="pt-20 pb-36 text-xl text-center text-gray-600 w-full">검색 결과가 없습니다.</div>
      )}
    </>
  );
}

function Card({ postId, title, major, grade, staravg, userNickname, userProfile }) {
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/mentoring/${postId}`);
  };

  return (
    <div className="p-4 border border-stone-200 shadow rounded-md bg-white cursor-pointer" onClick={onCardClick}>
      <h1 className="text-xl font-bold pb-2">{title}</h1>
      <p className="text-stone-600">학과 : {major}</p>
      <p className="text-stone-600">학년 : {grade}학년</p>
      <div className="flex items-center pt-4">
        <img src={userProfile} alt="유저 프로필" className="w-10 h-10 rounded-full object-cover"></img>
        <span className="ml-2 flex-1">{userNickname}</span>
        <span className="flex items-center">
          <StarIcon className="w-6 h-6 text-red-600 mr-1"></StarIcon> {staravg ? parseFloat(staravg).toFixed(1) : "0.0"}
        </span>
      </div>
    </div>
  );
}
