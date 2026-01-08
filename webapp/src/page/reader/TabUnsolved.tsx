import classNames from 'classnames';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from 'src/components/Canvas';
import Pagination from 'src/components/Pagination';
import Body from 'src/components/typography/Body';
import { TAROT_CARD_LIST, TAROT_SPREAD_LIST } from 'src/constant/backend/Tarot';
import { Page } from 'src/constant/Page';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import { compare } from 'src/utils/compare';
import ResultForm from './ResultForm';

type Props = {
  questions?: GetTarotReaderQuestionResponse;
  page: number;
  setPage: (page: number) => void;
  sendReading: (id: string, reading: string) => void;
};

const TabUnsolved = ({ questions, page, setPage, sendReading }: Props) => {
  const navigate = useNavigate();
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  if (!questions) return <div>Loading...</div>;

  return (
    <>
      {questions.data.map((q) => {
        const isExpanded = !!expandedMap[q.id];

        return (
          <div key={q.id} className="rounded-lg bg-background-surface-list p-4">
            <div className="mb-4 flex flex-col gap-1">
              <Body>{q.question.question}</Body>
              <div className="flex">
                <Body size="s" className="flex-1 text-text-secondary">
                  {q.createdAt ? format(q.createdAt, 'yyyy/MM/dd HH:mm:ss') : ''}
                </Body>
                <Body
                  size="m"
                  bold
                  className="cursor-pointer text-text-secondary underline"
                  onClick={() => setExpandedMap((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                >
                  {isExpanded ? '收合牌陣' : '查看牌陣'}
                </Body>
              </div>
              <Body size="s" className="text-text-secondary">
                by{' '}
                <span
                  className="cursor-pointer underline"
                  onClick={() => navigate(Page.Records, { state: q.question.user.email })}
                >
                  {q.question.user.email}
                </span>
              </Body>
            </div>
            <div
              className={classNames('overflow-hidden transition-all duration-1000 ease-in-out', {
                'max-h-100 sm:max-h-130': isExpanded,
                'max-h-0': !isExpanded,
              })}
            >
              <Canvas
                cardList={q.question.card.sort(compare('sequence')).map((v) => ({
                  id: v.cardId,
                  name: TAROT_CARD_LIST.find((c) => c.id === v.cardId)?.name ?? '',
                  reversed: v.reversal,
                }))}
                showCardBack={false}
                spread={
                  TAROT_SPREAD_LIST.find((s) => s.id === q.question.spreadId) ??
                  TAROT_SPREAD_LIST[0]
                }
              />
            </div>
            <ResultForm id={q.id} question={q.question.question} sendReading={sendReading} />
          </div>
        );
      })}
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
