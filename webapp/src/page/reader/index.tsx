import { format } from 'date-fns';
import { useState } from 'react';
import Pagination from 'src/components/Pagination';
import Body from 'src/components/typography/Body';
import { ReadingHumanStatus, TAROT_CARD_LIST, TAROT_SPREAD_LIST } from 'src/constant/backend/Tarot';
import { Page } from 'src/constant/Page';
import { compare } from 'src/utils/compare';
import Form from './Form';
import useFetch from './useFetch';

const Reader = () => {
  const [page, setPage] = useState(1);
  const { result, sendReading } = useFetch(page);

  if (!result) return <div>Loading...</div>;

  const getStatusText = (status: string) => {
    switch (status) {
      case ReadingHumanStatus.OPEN:
        return '開放中';
      case ReadingHumanStatus.IN_PROGRESS:
        return '等待解牌中';
      case ReadingHumanStatus.DONE:
        return '已完成';
      default:
        return '未知狀態';
    }
  };

  return (
    <>
      {result.data.map((v) => (
        <div key={v.id} className="border p-3">
          <div className="flex gap-2">
            <Body bold>ID</Body>
            <Body className="cursor-pointer !text-beige-300" bold>
              <a href={`${Page.Online}/${v.questionId}`}>{v.questionId}</a>
            </Body>
          </div>
          <div className="flex gap-2">
            <Body bold>狀態</Body>
            <Body>{getStatusText(v.status)}</Body>
          </div>
          <div className="flex gap-2">
            <Body bold>創建日期</Body>
            <Body>{v.createdAt ? format(v.createdAt, 'yyyy/MM/dd HH:mm:ss') : '-'}</Body>
          </div>
          <div className="flex gap-2">
            <Body bold>牌陣</Body>
            <Body>{TAROT_SPREAD_LIST.find((s) => s.id === v.question.spreadId)?.name}</Body>
          </div>
          <div className="flex gap-2">
            <Body bold>抽牌</Body>
            {v.question.card.sort(compare('sequence')).map((o) => (
              <Body key={o.id}>
                ({Number(o.sequence) + 1}){o.reversal ? '逆位-' : '正位-'}
                {TAROT_CARD_LIST.find((c) => c.id === o.cardId)?.name}
              </Body>
            ))}
          </div>
          <div>
            <Body bold>問題</Body>
            <Body>{v.question.question}</Body>
          </div>
          {v.status === ReadingHumanStatus.IN_PROGRESS && (
            <Form id={v.id} sendReading={sendReading} />
          )}
          {v.status === ReadingHumanStatus.DONE && (
            <div>
              <Body bold>解牌</Body>
              <Body>{v.reading}</Body>
            </div>
          )}
        </div>
      ))}
      <div className="mt-10">
        <Pagination
          page={page}
          totalPages={result.paginate.totalPages}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
};

export default Reader;
