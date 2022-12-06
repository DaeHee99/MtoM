import PageNav from "../components/main/PageNav";
import MainBanner from "../components/main/MainBanner";
import MainCardsFilter from "../components/main/MainCardsFilter";
import MainList from "../components/main/MainList";

export default function MainPage() {
  return (
    <main className="w-full h-full bg-gray-50">
      <MainBanner></MainBanner>
      <MainCardsFilter></MainCardsFilter>
      <MainList></MainList>
      <div className="pb-20">
        <PageNav endPage={5}></PageNav>
      </div>
    </main>
  );
}
