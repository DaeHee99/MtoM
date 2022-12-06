import Modal from "../common/Modal";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import TextAreaInput from "../common/TextAreaInput";
import StarInput from "../common/StarInput";

export default function ReviewModal({ isOpen, setIsOpen }) {
  const { register, control } = useForm();
  const closeModal = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className="relative space-y-2 py-8 px-7 bg-white">
        <h1 className="text-2xl font-bold text-stone-800">후기 작성</h1>
        <div>
          <StarInput name="major" control={control}></StarInput>
        </div>
        <TextAreaInput
          id="introduce"
          placeholder="후기를 입력하세요"
          register={register("review")}
          rows={5}
        ></TextAreaInput>
        <Button onClick={closeModal}>등록하기</Button>
      </form>
    </Modal>
  );
}
