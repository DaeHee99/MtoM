import Modal from "../common/Modal";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import TextAreaInput from "../common/TextAreaInput";
import TextInput from "../common/TextInput";
import { mentoringUpdateApi } from "../../api/mentoring";
import { useNavigate } from "react-router-dom";

export default function UpdateModal({ isOpen, setIsOpen, mentorPage }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: mentorPage?.title,
      content: mentorPage?.content,
    },
  });
  const closeModal = () => setIsOpen(false);
  const onSubmit = async (data) => {
    const result = await mentoringUpdateApi(mentorPage.postId, { ...data });
    if (result) {
      alert("등록 완료");
      closeModal();
      navigate(0);
    } else {
      alert("에러발생");
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className="relative space-y-2 py-8 px-7 bg-white" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold text-stone-800">멘토링 수정</h1>
        <TextInput register={register("title", { required: true })} placeholder="제목을 입력하세요."></TextInput>
        <TextAreaInput
          id="introduce"
          placeholder="내용을 입력하세요."
          register={register("content")}
          rows={5}
        ></TextAreaInput>
        <Button type="submit">등록하기</Button>
      </form>
    </Modal>
  );
}
