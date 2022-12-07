import { useController } from "react-hook-form";
import { range } from "rambda";
import { StarIcon } from "@heroicons/react/24/outline";
import SolidIcon from "@heroicons/react/20/solid/index";

export default function StarInput({ ...props }) {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  const onStarChage = (elem) => () => {
    onChange(elem);
  };

  return (
    <div className="h-fit w-full flex items-center justify-center">
      {range(1, 6).map((elem) =>
        elem <= value ? (
          <SolidIcon.StarIcon
            key={elem + "checked"}
            className="text-yellow-300 w-8 h-8 cursor-pointer"
            onClick={onStarChage(elem)}
          ></SolidIcon.StarIcon>
        ) : (
          <StarIcon
            key={elem + "unchecked"}
            className="text-yellow-300 w-8 h-8 cursor-pointer"
            onClick={onStarChage(elem)}
          ></StarIcon>
        )
      )}
    </div>
  );
}
