import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Body from 'src/components/typography/Body';

type Props = {
  id: string;
  sendInterpretation: (id: string, interpretation: string) => void;
};

type FormData = {
  content: string;
};

const Form = ({ id, sendInterpretation }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    sendInterpretation(id, data.content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Body bold>解牌</Body>
      <textarea className="w-full border p-2" {...register('content')}></textarea>
      <Button type="submit" className="!p-2">
        Submit
      </Button>
    </form>
  );
};

export default Form;
