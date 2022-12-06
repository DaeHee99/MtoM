import cls from "../../utils/cls.js";

export default function TextInput({ register, ...rest }) {
  return (
    <input
      {...register}
      {...rest}
      autoComplete="off"
      className={cls(
        "w-full px-2.5 py-1.5 border border-stone-500 rounded-md shadow-sm bg-white outline-none",
        "text-base text-stone-700",
        "placeholder:text-stone-400",
        "focus:ring-stone-500 focus:ring-1 focus:border-stone-500"
      )}
    ></input>
  );
}
