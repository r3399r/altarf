import Textarea from 'src/components/Textarea';
import Spread from './Spread';
import StarTitle from './StarTitle';
import Button from 'src/components/Button';
import { useMemo, useState } from 'react';

const Step2Choose = () => {
  const [question, setQuestion] = useState<string>('');
  const isReady = useMemo(() => (question.length > 0 ? true : false), [question]);

  return (
    <>
      <StarTitle title="選擇一種牌陣" />
      <div className="mt-8 mb-10 flex gap-x-[40px] gap-y-8 flex-wrap justify-around sm:mb-[58px] md:mb-[80px]">
        <Spread title="單張" desc="簡單，快速"></Spread>
        <Spread title="時間之流" desc="過去，現在，未來"></Spread>
        <Spread title="3" desc="說明"></Spread>
        <Spread title="4" desc="說明"></Spread>
        <Spread title="5" desc="說明"></Spread>
      </div>
      <StarTitle title="敘述你的問題" />
      <Textarea
        className="h-[120px] mt-8 mb-10"
        placeholder="50字以內"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="text-center">
        <Button className="mt-10" disabled={!isReady}>
          我準備好抽牌了
        </Button>
      </div>
    </>
  );
};

export default Step2Choose;
