import PageNav from "../components/main/PageNav";
import MainBanner from "../components/main/MainBanner";
import MainCardsFilter from "../components/main/MainCardsFilter";
import MainList from "../components/main/MainList";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { mentoringListApi } from "../api/mentoring";

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const queryList = [...searchParams];
  const [serverData, setServerData] = useState();

  useEffect(() => {
    async function getList() {
      const queryObj = {};
      queryList.map((elem) => (queryObj[elem[0]] = elem[1]));
      console.log(queryObj);
      const result = await mentoringListApi(queryObj);
      setServerData(result);
    }
    getList();
  }, [searchParams]);

  return (
    <main className="w-full h-full bg-gray-50 min-h-screen">
      <MainBanner></MainBanner>
      <MainCardsFilter></MainCardsFilter>
      {serverData ? (
        <>
          <MainList contents={serverData.contents}></MainList>
          <div className="pb-20">
            <PageNav endPage={parseInt((serverData.totalNum - 1) / 12) + 1}></PageNav>
          </div>
        </>
      ) : (
        <div>로딩중 ㅎ;</div>
      )}
    </main>
  );
}
