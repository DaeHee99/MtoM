import Modal from "../common/Modal";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import TextAreaInput from "../common/TextAreaInput";
import StarInput from "../common/StarInput";
import { postCommentApi } from "../../api/comment";
import { useNavigate } from "react-router-dom";

export default function ReviewModal({ isOpen, setIsOpen, postId }) {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm();
  const closeModal = () => setIsOpen(false);
  const onSubmit = async (data) => {
    const result = await postCommentApi({ ...data, postId: postId });
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
        <h1 className="text-2xl font-bold text-stone-800">후기 작성</h1>
        <div>
          <StarInput name="star" control={control}></StarInput>
        </div>
        <TextAreaInput
          id="introduce"
          placeholder="후기를 입력하세요"
          register={register("content")}
          rows={5}
        ></TextAreaInput>
        <Button type="submit">등록하기</Button>
      </form>
    </Modal>
  );
}
