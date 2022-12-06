import Modal from "../common/Modal";
import Button from "../common/Button";

export default function ApplyModal({ isOpen, setIsOpen }) {
  const closeModal = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="relative space-y-3 py-8 px-7 bg-white">
        <h1 className="text-xl font-bold pb-3">멘토링 신청이 완료되었습니다.</h1>
        <Button onClick={closeModal}>확인</Button>
      </div>
    </Modal>
  );
}
