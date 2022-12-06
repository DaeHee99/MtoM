import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    postId: "1",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "2",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "3",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "4",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "5",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "6",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },

  {
    postId: "7",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "8",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "9",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "10",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "11",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
  {
    postId: "12",
    title: "안녕하세요 구교현입니다.",
    major: "소프트웨어학과",
    grade: "4",
    star: "4.5",
    userNickname: "gugu",
    userProfile: "/mentoring.jpeg",
  },
];

export default function MainList() {
  return (
    <section className="max-w-5xl m-auto grid grid-cols-1 gap-2 pt-1 pb-12 px-6 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.postId} {...card}></Card>
      ))}
    </section>
  );
}

function Card({ postId, title, major, grade, star, userNickname, userProfile }) {
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
          <StarIcon className="w-6 h-6 text-red-600 mr-1"></StarIcon> {star}
        </span>
      </div>
    </div>
  );
}
