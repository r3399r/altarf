import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';

type Props = {
  questions?: GetTarotReaderQuestionResponse;
  page: number;
  setPage: (page: number) => void;
};

const TabSolved = ({ questions }: Props) => {
  console.log(questions);

  return <>solved</>;
};

export default TabSolved;
