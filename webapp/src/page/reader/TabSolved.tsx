import Pagination from 'src/components/Pagination';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import QuestionCard from './QuestionCard';

type Props = {
  questions?: GetTarotReaderQuestionResponse;
  page: number;
  setPage: (page: number) => void;
};

const TabSolved = ({ questions, page, setPage }: Props) => {
  if (!questions) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        {questions.data.map((q) => (
          <QuestionCard key={q.id} status="solved" tarotReading={q} />
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

export default TabSolved;
