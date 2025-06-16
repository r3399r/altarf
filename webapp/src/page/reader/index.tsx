import { format } from 'date-fns';
import Body from 'src/components/typography/Body';
import { Page } from 'src/constant/Page';
import Form from './Form';
import useFetch from './useFetch';

const Reader = () => {
  const { result } = useFetch();

  if (!result) return <div>Loading...</div>;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OPEN':
        return '開放中';
      case 'IN_PROGRESS':
        return '等待解牌中';
      case 'DONE':
        return '已完成';
      default:
        return '未知狀態';
    }
  };

  return (
    <>
      {result.map((v) => (
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
            <Body>{v.question.spread.name}</Body>
          </div>
          <div className="flex gap-2">
            <Body bold>抽牌</Body>
            {v.question.card.map((o) => (
              <Body>
                ({o.sequence}){o.card.name}
              </Body>
            ))}
          </div>
          <div>
            <Body bold>問題</Body>
            <Body>{v.question.question}</Body>
          </div>
          <Form />
        </div>
      ))}
    </>
  );
};

export default Reader;
