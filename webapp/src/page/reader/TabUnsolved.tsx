import { format } from 'date-fns';
import Pagination from 'src/components/Pagination';
import Body from 'src/components/typography/Body';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import ResultForm from './ResultForm';

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
      {questions.data.map((q) => (
        <div key={q.id} className="rounded-lg bg-background-surface-list p-4">
          <div className="mb-4 flex flex-col gap-1">
            <Body>{q.question.question}</Body>
            <div className="flex">
              <Body size="s" className="flex-1 text-text-secondary">
                {q.createdAt ? format(q.createdAt, 'yyyy/MM/dd HH:mm:ss') : ''}
              </Body>
              <Body size="m" bold className="cursor-pointer text-text-secondary underline">
                查看牌陣
              </Body>
            </div>
            <Body size="s" className="text-text-secondary">
              by <span className="underline">{q.question.user.email}</span>
            </Body>
          </div>
          <ResultForm id={q.id} question={q.question.question} sendReading={sendReading} />
        </div>
      ))}
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
