import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import Textarea from 'src/components/Textarea';
import Body from 'src/components/typography/Body';

type Props = {
  id: string;
  question: string;
  sendReading: (id: string, reading: string) => void;
};

type FormData = {
  content: string;
};

const ResultForm = ({ id, question, sendReading }: Props) => {
  const { register, getValues } = useForm<FormData>();
  const [openAiConfirm, setOpenAiConfirm] = useState(false);

  const onSubmit = () => {
    sendReading(id, getValues().content);
  };

  return (
    <form>
      <Body size="m" className="mb-1 text-text-input-subtle">
        輸入解牌結果：
      </Body>
      <Textarea {...register('content')} />
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          className="!px-4 !py-2 text-[0.875rem]"
          onClick={() => setOpenAiConfirm(true)}
        >
          送出
        </Button>
      </div>
      <Modal
        open={openAiConfirm}
        handleClose={() => setOpenAiConfirm(false)}
        title="解牌結果"
        cancelText="取消"
        confirmText="送出"
        handleConfirm={onSubmit}
      >
        <>
          <Body>{question}</Body>
          <Body size="m" className="mt-6 mb-2 text-text-secondary">
            你的回答：
          </Body>
          <Body className="border-b-1 border-b-border-table-thead px-2 pb-4">
            {getValues().content}
          </Body>
          <Body className="mt-6">回答送出後不可更改。確定要送出嗎？</Body>
        </>
      </Modal>
    </form>
  );
};

export default ResultForm;
