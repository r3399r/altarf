import Textarea from 'src/components/Textarea';
import Spread from './Spread';
import StarTitle from './StarTitle';
import Button from 'src/components/Button';
import { useMemo, useState } from 'react';
import { Spread as SpreadList } from 'src/model/Spread';

type Props = {
  onNext: (id: string) => void;
};

const Step2Ask = ({ onNext }: Props) => {
  const [question, setQuestion] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>();
  const isReady = useMemo(
    () => (question.length > 0 && selectedId !== undefined ? true : false),
    [question, selectedId],
  );

  return (
    <>
      <StarTitle title="選擇一種牌陣" />
      <div className="mt-8 mb-10 flex gap-x-[40px] gap-y-8 flex-wrap justify-around sm:mb-[58px] md:mb-[80px]">
        {SpreadList.map((v) => {
          return (
            <Spread
              title={v.name}
              desc={v.desc}
              onClick={() => setSelectedId(v.id)}
              selected={selectedId === v.id}
            ></Spread>
          );
        })}
      </div>
      <StarTitle title="敘述你的問題" />
      <Textarea
        className="h-[120px] mt-8 mb-10"
        placeholder="50字以內"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="text-center">
        <Button
          className="mt-10"
          disabled={!isReady}
          onClick={() => {
            if (selectedId) onNext(selectedId);
          }}
        >
          我準備好抽牌了
        </Button>
      </div>
    </>
  );
};

export default Step2Ask;
