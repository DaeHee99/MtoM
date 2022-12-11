import Modal from "../common/Modal";
import Button from "../common/Button";

export default function DeleteModal({ isOpen, setIsOpen, deletePost }) {
  const closeModal = () => setIsOpen(false);
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="py-8 px-8">
        <h3 className="text-2xl font-semibold">정말로 삭제하실 건가요?</h3>
        <div className="flex items-center space-x-2 justify-center pt-6">
          <Button onClick={deletePost}>삭제하기</Button>
          <Button onClick={closeModal}>취소하기</Button>
        </div>
      </div>
    </Modal>
  );
}
