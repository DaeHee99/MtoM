import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import FileInput from "../components/common/FileInput";
import { useForm } from "react-hook-form";
import { registApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const frm = new FormData();
    Object.entries(data).map((line) => frm.append(line[0], line[1]));
    console.log([...frm.entries()]);
    const result = await registApi(frm);
    if (result) {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } else alert("오류발생!");
  };

  return (
    <main className="w-full h-full">
      <div className="w-full max-w-md m-auto pt-20">
        <h2 className="text-center text-3xl font-bold">회원가입</h2>
        <h4 className="text-center text-lg pt-4 font-light">멘토링 서비스 AjouMtoM</h4>
        <form className="space-y-5 py-10 text-center" onSubmit={handleSubmit(onSubmit)}>
          <TextInput register={register("userID", { required: true })} placeholder="아이디를 입력하세요."></TextInput>
          <TextInput register={register("nickname", { required: true })} placeholder="닉네임를 입력하세요."></TextInput>
          <TextInput
            type="password"
            register={register("password", { required: true })}
            placeholder="비밀번호를 입력하세요."
          ></TextInput>
          <div>
            <div className="text-left text-stone-700 pb-2 text-lg">프로필 이미지</div>
            <FileInput id="이미지" control={control} name="ProfileImage" type="avatar"></FileInput>
          </div>
          <Button type="submit">회원가입하기</Button>
        </form>
      </div>
    </main>
  );
}
