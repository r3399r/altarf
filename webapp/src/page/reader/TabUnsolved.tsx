import Pagination from 'src/components/Pagination';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import QuestionCard from './QuestionCard';

type Props = {
  questions?: GetTarotReaderQuestionResponse;
  page: number;
  setPage: (page: number) => void;
  sendReading: (id: string, reading: string) => void;
};

const TabUnsolved = ({ questions, page, setPage, sendReading }: Props) => {
  if (!questions) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {questions.data.map((q) => (
          <QuestionCard key={q.id} status="unsolved" tarotReading={q} sendReading={sendReading} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          page={page}
          totalPages={questions?.paginate.totalPages}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
};

export default TabUnsolved;
