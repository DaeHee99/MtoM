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
  const onMyPageClick = () => {
    navigater("/mypage/1");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header className="sticky top-0 py-3 border-b border-stone-900 bg-white">
      <div className="flex items-center justify-between m-auto w-full max-w-5xl px-6 ">
        <div className="text-2xl font-bold cursor-pointer" onClick={onLogoClick}>
          <span className="text-red-500">Ajou</span>
          <span className="text-stone-900">MtoM</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          {isLogin ? (
            <>
              <span>아무개님!</span>
              <Button onClick={onMyPageClick}>마이페이지</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsOpen(true)}>로그인</Button>
              <Button onClick={onRegistClick}>회원가입</Button>
            </>
          )}
        </div>
      </div>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}></LoginModal>
    </header>
  );
}
