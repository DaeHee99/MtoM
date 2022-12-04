import Button from "../common/Button";
import SortingMenu from "./SortingMenu";
import { useSearchParams } from "react-router-dom";

const categorys = ["소프트웨어학과", "인공지능융합학과", "사이버보안학과", "미디어학과", "국방디지털융합학과"];

export default function MainCardsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {};
  for (const [key, val] of searchParams.entries()) {
    params[key] = val;
  }
  const onCategoryClick = (category) => () => setSearchParams({ ...params, category });
  const nowCategory = params.category || "소프트웨어학과";

  return (
    <section className="max-w-5xl m-auto px-6">
      <div className="flex items-center justify-center pt-10 flex-wrap">
        {categorys.map((category) => (
          <div key={category} className="mb-2 ml-2">
            <Button onClick={onCategoryClick(category)} active={nowCategory === category}>
              {category}
            </Button>
          </div>
        ))}
      </div>
      <div className="pt-6 w-full flex justify-end">
        <SortingMenu />
      </div>
    </section>
  );
}
