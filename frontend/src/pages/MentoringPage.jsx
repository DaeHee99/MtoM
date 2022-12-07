import Ordering from "../components/mentoring/Ordering";

const mentoringData = {
  postId: "12",
  title: "안녕하세요 구교현입니다.",
  major: "소프트웨어학과",
  grade: "4",
  star: "4.5",
  userNickname: "gugu",
  userProfile: "/mentoring.jpeg",
  content:
    "안녕하세요 반가워요 근데 이거 엔터가 되나요? \n 안될것 같죠? \n br를 넣어야 되는 이 더러운 세상 \npre-wrap 개꿀!",
};

export default function MentoringPage() {
  return (
    <main className="flex h-full items-stretch max-w-5xl w-full m-auto">
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
            <p className="text-stone-600">학과 : {mentoringData.major}</p>
            <p className="text-stone-600">학년 : {mentoringData.grade}학년</p>
          </div>
        </div>
        <section className="pt-10 whitespace-pre-wrap">{mentoringData.content}</section>
        <section className="mt-10 py-5 border-t border-t-red-500">
          <h3 className="text-3xl font-bold">리뷰란</h3>
        </section>
      </section>
      <Ordering></Ordering>
    </main>
  );
}
