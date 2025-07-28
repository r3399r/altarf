import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { dismissErrorModal } from 'src/redux/uiSlice';
import Modal from './Modal';

const ModalError = () => {
  const dispatch = useDispatch();
  const { openErrorModal: open, errorMessage } = useSelector((state: RootState) => state.ui);

  const onClose = () => {
    dispatch(dismissErrorModal());
  };

  return (
    <Modal open={open} handleClose={onClose} title="錯誤" confirmText="關閉">
      <>{errorMessage}</>
    </Modal>
  );
};

export default ModalError;
