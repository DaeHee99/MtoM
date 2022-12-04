import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import CreateMentoringPage from "./pages/CreateMentoringPage";
import MainPage from "./pages/MainPage";
import MentoringPage from "./pages/MentoringPage";
import MypagePage from "./pages/MypagePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screeen">
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/mentoring/:postId" element={<MentoringPage></MentoringPage>}></Route>
          <Route path="/mypage/:userId" element={<MypagePage></MypagePage>}></Route>
          <Route path="/regist" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="/mentoring/regist" element={<CreateMentoringPage></CreateMentoringPage>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
