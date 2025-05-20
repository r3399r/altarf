import Modal from './Modal';

type ErrorModalProps = {
  open: boolean;
  errorMessage: string;
  onClose: () => void;
};

const ErrorModal = ({ open, errorMessage, onClose }: ErrorModalProps) => (
  <Modal open={open} handleClose={onClose} title="錯誤" confirmText="關閉">
    <>{errorMessage}</>
  </Modal>
);

export default ErrorModal;
