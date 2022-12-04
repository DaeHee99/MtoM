import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Header() {
  const navigater = useNavigate();
  const onRegistClick = () => {
    navigater("/regist");
  };
  const onLogoClick = () => {
    navigater("/");
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 py-3 border-b border-stone-900 bg-white">
      <div className="flex items-center justify-between m-auto w-full max-w-5xl px-6 ">
        <div className="text-2xl font-bold cursor-pointer" onClick={onLogoClick}>
          <span className="text-red-500">Ajou</span>
          <span className="text-stone-900">MtoM</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Button onClick={() => setIsOpen(true)}>로그인</Button>
          <Button onClick={onRegistClick}>회원가입</Button>
        </div>
      </div>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}></LoginModal>
    </header>
  );
}
