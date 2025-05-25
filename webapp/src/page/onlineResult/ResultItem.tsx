import { format } from 'date-fns';
import PicAvatarAi from 'src/assets/pic-avatar-ai.svg';
import Body from 'src/components/typography/Body';
import { TarotInterpretation } from 'src/model/backend/Tarot';

type Props = {
  tarotInterpretation: TarotInterpretation;
};

const ResultItem = ({ tarotInterpretation }: Props) => {
  const { interpretation, repliedAt } = tarotInterpretation;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={PicAvatarAi} />
          <Body bold>AI解牌</Body>
        </div>
        <Body className="text-text-secondary">
          {repliedAt && format(repliedAt, 'yyyy/MM/dd HH:mm:ss')}
        </Body>
      </div>
      <Body className="whitespace-pre-line">
        {interpretation ?? '解牌中... 請稍候一下再重新整理頁面'}
      </Body>
    </div>
  );
};

export default ResultItem;
