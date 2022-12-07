import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import ListBox from "../components/common/ListBox";
import { emailSendApi, mentorRegistApi } from "../api/authApi";

const categorys = ["소프트웨어학과", "인공지능융합학과", "사이버보안학과", "미디어학과", "국방디지털융합학과"];
const grades = ["1", "2", "3", "4"];

export default function MentorRegisterPage() {
  const { register, control, handleSubmit, formState, getValues } = useForm({
    mode: "onTouched",
    defaultValues: {
      grade: "4",
      major: "사이버보안학과",
    },
  });

  const onSubmit = async (data) => {
    const result = await mentorRegistApi(data);
    if (result) {
      alert("멘토 등록이 완료되었습니다.");
      navigator("/");
      localStorage.setItem("isMentor", true);
    } else alert("멘토 등록에 실패했습니다.");
  };
  const onEmailSend = async () => {
    if (formState.errors.email) {
      alert("이메일을 제대로 입력하세요");
      return;
    }
    const result = await emailSendApi({ email: getValues("email") });
    if (result) alert("메일 발송이 완료되었습니다.");
    else alert("메일 발송에 실패했습니다.");
  };

  return (
    <main className="w-full h-full">
      <div className="w-full max-w-md m-auto pt-20">
        <h2 className="text-center text-3xl font-bold">멘토 신청하기</h2>
        <h4 className="text-center text-lg pt-4 font-light">멘토가 되신 것을 환영합니다.</h4>
        <form className="space-y-5 py-10 text-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center space-x-2">
            <TextInput
              register={register("email", {
                required: "이메일은 필수 입력이란다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
              placeholder="학교 이메일을 입력하세요."
            ></TextInput>
            <div className="w-20">
              <Button type="button" onClick={onEmailSend}>
                전송
              </Button>
            </div>
          </div>
          <TextInput register={register("code")} placeholder="이메일 인증 코드를 입력하세요."></TextInput>
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
