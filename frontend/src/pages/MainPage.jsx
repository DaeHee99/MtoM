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
  console.log(serverData);

  useEffect(() => {
    async function getList() {
      const queryObj = {};
      queryList.map((elem) => (queryObj[elem[0]] = queryObj[elem[1]]));
      const result = await mentoringListApi(queryObj);
      setServerData(result);
    }
    getList();
  }, []);

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
