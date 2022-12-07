import cls from "../../utils/cls";

export default function Button({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={cls(
        "bg-white py-1.5 px-3 text-stone-900 text-base border border-red-500 rounded-md",
        active ? "outline outline-red-500" : "",
        "hover:outline hover:outline-red-500"
      )}
    >
      {children}
    </button>
  );
}
