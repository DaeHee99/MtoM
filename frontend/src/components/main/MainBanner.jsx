export default function MainBanner() {
  return (
    <section className="w-full bg-red-100 py-5 h-52">
      <div className="m-auto h-full max-w-5xl px-6 flex items-stretch justify-start space-x-10">
        <img src="https://cdn.muhtwaplus.com/wp-content/uploads/2021/06/%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8-%D8%A7%D9%84%D8%B5%D9%8A%D9%81%D9%8A-2021-%D9%81%D9%8A-%D8%A8%D9%86%D9%88%D9%83-%D9%85%D8%B5%D8%B1.jpg" alt="멘토링 배너 이미지" className="w-72 h-40 object-cover hidden sm:block"></img>
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-3xl pb-4">멘토링</h2>
          <p>대학에 대해 궁금한 게 있으신가요?</p>
          <p>대학 선배님들께 물어보세요~</p>
        </div>
      </div>
    </section>
  );
}
