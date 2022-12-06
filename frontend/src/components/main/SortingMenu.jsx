import PopTransition from "../common/PopTransition";
import { Menu } from "@headlessui/react";
import { CheckIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";
import cls from "../../utils/cls";

const orderCategory = [
  {
    value: "최신순",
    name: "최신순",
  },
  {
    value: "별점순",
    name: "별점순",
  },
];

export default function SortingMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {};
  for (const [key, val] of searchParams.entries()) {
    params[key] = val;
  }
  const onMenuClick = (sorted) => () => setSearchParams({ ...params, sorted });
  const nowSorted = searchParams.get("sorted") || "최신순";

  return (
    <Menu as="div" className="relative inline-block text-left text-darkGray">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center justify-center">
            {orderCategory.filter((menu) => menu.value === nowSorted)[0].name}
            <ChevronUpIcon
              className={cls("ml-1 h-5 w-5 transition-transform", open ? "rotate-180" : "")}
            ></ChevronUpIcon>
          </Menu.Button>
          <PopTransition>
            <Menu.Items
              as="ul"
              className="absolute right-0 mt-1 w-fit rounded-md bg-white shadow-lg focus:outline-none"
            >
              {orderCategory.map((menu) => (
                <Menu.Item key={menu.value}>
                  {({ active }) => (
                    <li
                      className={cls(
                        active ? "border-none bg-red-500 text-white" : "text-gray-900",
                        "flex w-32 cursor-pointer items-center space-x-1 rounded-md px-4 py-2.5 text-sm"
                      )}
                      onClick={onMenuClick(menu.value)}
                    >
                      {nowSorted === menu.value ? (
                        <CheckIcon className={cls("h-4 w-4", active ? "text-white" : "text-darkPurPle")} />
                      ) : (
                        <div className="h-4 w-4"></div>
                      )}
                      <span>{menu.name}</span>
                    </li>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </PopTransition>
        </>
      )}
    </Menu>
  );
}
