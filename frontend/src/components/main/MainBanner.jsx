export default function MainBanner() {
  return (
    <section className="w-full bg-red-100 py-5 h-52">
      <div className="m-auto h-full max-w-5xl px-6 flex items-stretch justify-start space-x-10">
        <img src="/mentoring.jpeg" alt="멘토링 배너 이미지" className="w-72 h-40 object-cover hidden sm:block"></img>
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-3xl pb-4">멘토링</h2>
          <p>대학에 대해 궁금한 게 있으신가요?</p>
          <p>대학 선배님들께 물어보세요~</p>
        </div>
      </div>
    </section>
  );
}
