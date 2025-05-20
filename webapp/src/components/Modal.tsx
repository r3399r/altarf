import { ModalProps, Modal as MuiModal } from '@mui/material';
import Button from './Button';
import H3 from './typography/H3';

type Props = ModalProps & {
  handleClose: () => void;
  title: string;
  cancelText?: string;
  confirmText?: string;
  handleCancel?: () => void;
  handleConfirm?: () => void;
};

const Modal = ({
  children,
  handleClose,
  title,
  cancelText,
  confirmText,
  handleCancel,
  handleConfirm,
  ...props
}: Props) => {
  const onCancel = () => {
    if (handleCancel) handleCancel();
    handleClose();
  };

  const onConfirm = () => {
    if (handleConfirm) handleConfirm();
    handleClose();
  };

  return (
    <MuiModal
      className="fixed inset-0 z-10 flex items-center justify-center"
      onClose={handleClose}
      {...props}
    >
      <div className="mx-4 w-full rounded-xl bg-background-surface-overlay-normal p-6 outline-none sm:mx-auto sm:w-[610px]">
        <div className="flex items-center justify-center gap-6">
          <div className="h-px flex-1 bg-icon-primary"></div>
          <H3>{title}</H3>
          <div className="h-px flex-1 bg-icon-primary"></div>
        </div>
        <div className="p-4">{children}</div>
        <div className="mt-3 flex justify-end gap-6">
          {cancelText && (
            <Button appearance="secondary" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {confirmText && <Button onClick={onConfirm}>{confirmText}</Button>}
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
