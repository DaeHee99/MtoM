import { Fragment } from "react";
import { add, filter, map, pipe, range, subtract } from "rambda";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import removeUndefined from "../../utils/removeUndefined";
import { useSearchParams } from "react-router-dom";
import cls from "../../utils/cls";

const SHOW_PAGE = 3;

export default function PageNav({ endPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {};
  for (const [key, val] of searchParams.entries()) {
    params[key] = val;
  }
  const pageNum = params.page ? parseInt(params.page) : 1;

  const pageClick = (idx) => () =>
    idx !== 1
      ? setSearchParams({
          ...params,
          page: idx,
        })
      : setSearchParams(
          removeUndefined({
            ...params,
            page: undefined,
          })
        );

  const prevClick = () =>
    params.page === "2"
      ? setSearchParams(
          removeUndefined({
            ...params,
            page: undefined,
          })
        )
      : setSearchParams({ ...params, page: parseInt(params.page) - 1 });

  const nextClick = () =>
    !params.page
      ? setSearchParams({
          ...params,
          page: 2,
        })
      : setSearchParams({
          ...params,
          page: parseInt(params.page) + 1,
        });

  const pages = PageNums(pageNum, endPage);

  return (
    <section className="flex items-center justify-center space-x-2">
      <PageButton onClick={prevClick} disabled={pageNum === 1}>
        <ChevronLeftIcon className="h-10 w-10"></ChevronLeftIcon>
      </PageButton>
      {share(pageNum - 1, SHOW_PAGE) !== 0 && (
        <>
          <PageButton onClick={pageClick(1)}>1</PageButton>
          <PageButton onClick={pageClick(pages[0] - 1)}>
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </PageButton>
        </>
      )}

      {pages.map((page) => (
        <Fragment key={page}>
          {page === pageNum ? (
            <PageButton highlight>{page}</PageButton>
          ) : (
            <PageButton onClick={pageClick(page)}>{page}</PageButton>
          )}
        </Fragment>
      ))}

      {share(pageNum - 1, SHOW_PAGE) * SHOW_PAGE + SHOW_PAGE < endPage && (
        <>
          <PageButton onClick={pageClick(pages[SHOW_PAGE - 1] + 1)}>
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </PageButton>
          <PageButton onClick={pageClick(endPage)}>{endPage}</PageButton>
        </>
      )}
      <PageButton onClick={nextClick} disabled={pageNum === endPage}>
        <ChevronRightIcon className="h-10 w-10"></ChevronRightIcon>
      </PageButton>
    </section>
  );
}

function PageButton({ children, onClick, highlight, disabled }) {
  return (
    <button
      type="button"
      className={cls(
        "flex h-8 w-8 items-center justify-center px-2 shadow-md",
        highlight ? "bg-red-500 text-white" : "bg-white text-darkGray",
        disabled ? "bg-transparent text-lightGray shadow-none" : ""
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function PageNums(pageNum, endPage) {
  return pipe(
    (pageNum) => subtract(pageNum, 1),
    (pageNum) => range(share(pageNum, SHOW_PAGE) * SHOW_PAGE, share(pageNum, SHOW_PAGE) * SHOW_PAGE + SHOW_PAGE),
    map(add(1)),
    filter((elem) => elem <= endPage)
  )(pageNum);
}

function share(divide, divider) {
  return parseInt((divide / divider).toString());
}
