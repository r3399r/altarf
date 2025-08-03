import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import Body from 'src/components/typography/Body';

type Props = {
  id: string;
  sendReading: (id: string, reading: string) => void;
};

type FormData = {
  content: string;
};

const Form = ({ id, sendReading }: Props) => {
  const { register, getValues } = useForm<FormData>();
  const [openAiConfirm, setOpenAiConfirm] = useState(false);

  const onSubmit = () => {
    sendReading(id, getValues().content);
  };

  return (
    <form>
      <Body bold>解牌</Body>
      <textarea className="w-full border p-2" {...register('content')}></textarea>
      <Button type="button" className="!p-2" onClick={() => setOpenAiConfirm(true)}>
        Submit
      </Button>
      <Modal
        open={openAiConfirm}
        handleClose={() => setOpenAiConfirm(false)}
        title="確認是否送出?"
        cancelText="取消"
        confirmText="確認"
        handleConfirm={onSubmit}
      >
        <div>確認是否送出?</div>
      </Modal>
    </form>
  );
};

export default Form;
