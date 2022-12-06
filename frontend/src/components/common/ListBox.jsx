import { Listbox } from "@headlessui/react";
import { useController } from "react-hook-form";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import cls from "../../utils/cls";

const ListBox = ({ list, id, placeholder, ...props }) => {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  return (
    <Listbox value={value} onChange={onChange} as={Fragment}>
      <div className="relative">
        <Listbox.Button
          ref={(e) => (ref(e), e && (e.id = id))}
          className={cls(
            "flex",
            "w-full pl-2.5 pr-2 py-1.5 border border-stone-400 rounded-md shadow-sm bg-white",
            "text-base text-stone-600",
            "focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
          )}
        >
          <span className="flex-1 truncate text-left">{value ? value : placeholder}</span>
          <ChevronUpDownIcon className="w-6 h-full text-gray-400" aria-hidden="true" />
        </Listbox.Button>
        <Listbox.Options
          className={cls(
            "absolute z-10 mt-1 w-full max-h-60 overflow-scroll border border-stone-400 border-opacity-50 rounded-md shadow-sm bg-white",
            "text-stone-700",
            "divide-y divide-stone-400",
            "focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
          )}
        >
          {list.map((elem) => (
            <Listbox.Option
              key={elem}
              className={({ active }) =>
                cls(
                  active ? "text-white bg-stone-400" : "text-stone-600 bg-stonw-100",
                  "relative pl-2.5 pr-2 py-2 flex"
                )
              }
              value={elem}
            >
              {({ active }) => (
                <>
                  <span className={cls("flex-1 block truncate", value === elem ? "font-semibold" : "font-normal")}>
                    {elem}
                  </span>
                  {value === elem && (
                    <CheckIcon
                      className={cls("w-6 h-6", active ? "text-gray-100" : "text-gray-700")}
                      aria-hidden="true"
                    ></CheckIcon>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default ListBox;
