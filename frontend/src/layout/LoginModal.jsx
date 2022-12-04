import Modal from "../components/common/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";

export default function LoginModal({ isOpen, setIsOpen }) {
  const closeModal = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="relative space-y-3 px-10 py-8 bg-white">
        <XMarkIcon
          className="absolute right-3 top-3 h-6 w-6 cursor-pointer text-red-500"
          onClick={closeModal}
        ></XMarkIcon>
        <h1 className="text-3xl font-bold">LOGIN</h1>
        <div className="py-4 space-y-2">
          <TextInput placeholder="아이디를 입력하세요."></TextInput>
          <TextInput placeholder="비밀번호를 입력하세요."></TextInput>
        </div>
        <Button type="submit">로그인하기</Button>
      </div>
    </Modal>
  );
}
