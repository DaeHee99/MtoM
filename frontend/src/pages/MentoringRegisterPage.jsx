import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../components/common/TextAreaInput";
import { mentoringCreateApi } from "../api/mentoring";

export default function MentoringRegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const result = await mentoringCreateApi(data);
    console.log(result);
    if (result) navigate("/");
    else alert("오류발생!");
  };

  return (
    <main className="w-full h-full">
      <div className="w-full max-w-md m-auto pt-20">
        <h2 className="text-center text-3xl font-bold">멘토링 등록하기</h2>
        <h4 className="text-center text-lg pt-4 font-light">여러분만의 멘토링🌝</h4>
        <form className="space-y-5 py-10 text-center" onSubmit={handleSubmit(onSubmit)}>
          <TextInput register={register("title", { required: true })} placeholder="제목을 입력하세요."></TextInput>
          <TextAreaInput
            register={register("content", { required: true })}
            placeholder="내용을 입력하세요."
            rows={5}
          ></TextAreaInput>
          <Button type="submit">멘토링 생성</Button>
        </form>
      </div>
    </main>
  );
}
