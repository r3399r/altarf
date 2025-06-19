import { format } from 'date-fns';
import PicAvatarAi from 'src/assets/pic-avatar-ai.svg';
import PicAvatarHuman from 'src/assets/pic-avatar-human.svg';
import Body from 'src/components/typography/Body';
import { TarotInterpretation } from 'src/model/backend/Tarot';

type Props = {
  tarotInterpretation: TarotInterpretation;
};

const ResultItem = ({ tarotInterpretation }: Props) => {
  const { interpretation, repliedAt, isAi } = tarotInterpretation;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={isAi ? PicAvatarAi : PicAvatarHuman} />
          <Body bold>{isAi ? 'AI解牌' : '塔羅師'}</Body>
        </div>
        <Body className="text-text-secondary">
          {repliedAt && format(repliedAt, 'yyyy/MM/dd HH:mm:ss')}
        </Body>
      </div>
      <Body className="whitespace-pre-line">
        {interpretation === null && isAi === true && 'AI解牌中... 請稍候一下再重新整理頁面'}
        {interpretation === null &&
          isAi === false &&
          '塔羅師解牌中... 可能需要一段時間，請耐心等待'}
        {interpretation !== null && interpretation}
      </Body>
    </div>
  );
};

export default ResultItem;
