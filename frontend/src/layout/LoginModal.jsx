import Modal from "../components/common/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";
import { useForm } from "react-hook-form";
import { loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const closeModal = () => setIsOpen(false);
  const { register, handleSubmit } = useForm({
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    const result = await loginApi(data);
    if (result) {
      alert("로그인에 성공했습니다.");
      console.log(result);
      localStorage.setItem("isMentor", result.mentor);
      localStorage.setItem("nickname", result.nickname);
      navigate(0);
    } else {
      alert("다시 입력하세요.");
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className="relative space-y-3 px-10 py-8 bg-white" onSubmit={handleSubmit(onSubmit)}>
        <XMarkIcon
          className="absolute right-3 top-3 h-6 w-6 cursor-pointer text-red-500"
          onClick={closeModal}
        ></XMarkIcon>
        <h1 className="text-3xl font-bold">LOGIN</h1>
        <div className="py-4 space-y-2">
          <TextInput register={register("userID", { required: true })} placeholder="아이디를 입력하세요."></TextInput>
          <TextInput
            type="password"
            register={register("password", { required: true })}
            placeholder="비밀번호를 입력하세요."
          ></TextInput>
        </div>
        <Button type="submit">로그인하기</Button>
      </form>
    </Modal>
  );
}
