import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import ListBox from "../components/common/ListBox";

const categorys = ["소프트웨어학과", "인공지능융합학과", "사이버보안학과", "미디어학과", "국방디지털융합학과"];
const grades = ["1", "2", "3", "4"];

export default function MentorRegisterPage() {
  const { register, control, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <main className="w-full h-full">
      <div className="w-full max-w-md m-auto pt-20">
        <h2 className="text-center text-3xl font-bold">멘토 신청하기</h2>
        <h4 className="text-center text-lg pt-4 font-light">멘토가 되신 것을 환영합니다.</h4>
        <form className="space-y-5 py-10 text-center" onSubmit={handleSubmit(onSubmit)}>
          <TextInput register={register("email")} placeholder="학교 이메일을 입력하세요."></TextInput>
          <ListBox list={grades} id="grade" name="grade" control={control} placeholder="학년을 선택하세요."></ListBox>
          <ListBox
            list={categorys}
            id="major"
            name="major"
            control={control}
            placeholder="학과를 선택하세요."
          ></ListBox>
          <Button type="submit">멘토등록하기</Button>
        </form>
      </div>
    </main>
  );
}
