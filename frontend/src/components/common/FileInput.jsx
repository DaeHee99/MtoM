import { PaperClipIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { useController } from "react-hook-form";
import cls from "../../utils/cls";

const FileInput = ({ id, placeholder, upload, type = "basic", ...props }) => {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  const handleFileChange = async (e) =>
    upload ? onChange(await upload(e.currentTarget.files[0])) : onChange(e.currentTarget.files[0]);

  return (
    <div className={cls("flex items-center text-sm")}>
      {type === "avatar" ? (
        <AvatarType value={value}></AvatarType>
      ) : (
        <BasicType value={value} placeholder={placeholder}></BasicType>
      )}
      <label
        className={cls(
          "inline-flex justify-center items-center",
          "w-20 ml-2 px-2.5 py-1.5 border shadow-sm rounded-md bg-white border-stone-500",
          "text-sm font-medium text-stone-700",
          "hover:border-stone-500 hover:ring-1 hover:ring-stone-500",
          "focus:ring-1 focus:ring-stone-500 focus:border-stone-500 focus:outline-none"
        )}
        htmlFor={id}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.click();
        }}
        ref={ref}
      >
        {value ? "변경" : "업로드"}
      </label>
      <input id={id} type="file" className="hidden" onChange={handleFileChange}></input>
    </div>
  );
};

function getFileInfo(value) {
  const fileName = value && value.name;
  const fileUrl = value && (value instanceof File ? URL.createObjectURL(value) : value.url);
  return { fileName, fileUrl };
}

const AvatarType = ({ value }) => {
  const { fileName, fileUrl } = getFileInfo(value);

  return (
    <div className={cls("w-14 h-14 rounded-full mr-10", "sm:w-20 sm:h-20")}>
      {fileName ? (
        <img src={fileUrl} alt="profile File" className="rounded-full object-cover w-full h-full"></img>
      ) : (
        <UserCircleIcon className="h-full w-full text-stone-500"></UserCircleIcon>
      )}
    </div>
  );
};

const BasicType = ({ value, placeholder }) => {
  const { fileName, fileUrl } = getFileInfo(value);

  return (
    <div
      className={cls(
        "flex items-center w-full px-2.5 py-1.5 border border-stone-500 rounded-md shadow-sm bg-white group",
        "text-base text-stone-700",
        "placeholder:text-stone-400"
      )}
    >
      <PaperClipIcon
        className={cls(
          "flex-shrink-0 h-5 w-5 text-stone-500 cursor-pointer",
          fileUrl ? "group-hover:text-amber-500" : ""
        )}
        aria-hidden="true"
      />
      {fileName && fileUrl ? (
        <a
          className="flex-1 ml-2 truncate group-hover:text-amber-500 transition-colors cursor-pointer"
          href={fileUrl}
          target="blank"
        >
          {fileName}
        </a>
      ) : (
        <span className="flex-1 w-0 ml-2 truncate cursor-default text-stone-400">{placeholder}</span>
      )}
    </div>
  );
};

export default FileInput;
