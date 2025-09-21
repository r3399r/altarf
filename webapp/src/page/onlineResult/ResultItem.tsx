import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IcComment2 from 'src/assets/ic-comment-like.svg';
import IcComment1 from 'src/assets/ic-comment-love.svg';
import IcComment3 from 'src/assets/ic-comment-neutral.svg';
import IcComment4 from 'src/assets/ic-comment-unclear.svg';
import IcComment5 from 'src/assets/ic-comment-unlike.svg';
import IcStar from 'src/assets/ic-starry.svg';
import PicAvatarAi from 'src/assets/pic-avatar-ai.svg';
import PicAvatarHuman from 'src/assets/pic-avatar-human.svg';
import Button from 'src/components/Button';
import Body from 'src/components/typography/Body';
import { Page } from 'src/constant/Page';
import { TarotReading } from 'src/model/backend/Tarot';

type Props = {
  tarotReading: TarotReading;
};

const ResultItem = ({ tarotReading }: Props) => {
  const navigate = useNavigate();
  const { reading, repliedAt, isAi } = tarotReading;
  const [expandComment, setExpandComment] = useState<boolean>(false);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={isAi ? PicAvatarAi : PicAvatarHuman} />
          <Body bold>{isAi ? 'AI解牌' : `塔羅師-${tarotReading.reader?.nickname}`}</Body>
        </div>
        <Body className="text-text-secondary">
          {repliedAt && format(repliedAt, 'yyyy/MM/dd HH:mm:ss')}
        </Body>
      </div>
      <Body className="mb-3 whitespace-pre-line">
        {reading === null &&
          (isAi
            ? 'AI解牌中... 請稍候一下再重新整理頁面。'
            : '塔羅師解牌中... 可能需要一段時間，請耐心等待，有結果時會寄 Email 通知您。')}
        {reading !== null && reading}
      </Body>
      {!expandComment && (
        <div
          className="flex w-fit cursor-pointer items-center gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
          onClick={() => setExpandComment(true)}
        >
          <img className="w-[18px]" src={IcStar} />
          <Body size="s">為此占卜評分</Body>
        </div>
      )}
      {expandComment && (
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex cursor-pointer gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
            onClick={() => setExpandComment(false)}
          >
            <img className="w-[18px]" src={IcComment1} />
            <Body size="s">非常滿意</Body>
          </div>
          <div
            className="flex cursor-pointer gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
            onClick={() => setExpandComment(false)}
          >
            <img className="w-[18px]" src={IcComment2} />
            <Body size="s">有幫助</Body>
          </div>
          <div
            className="flex cursor-pointer gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
            onClick={() => setExpandComment(false)}
          >
            <img className="w-[18px]" src={IcComment3} />
            <Body size="s">普通</Body>
          </div>
          <div
            className="flex cursor-pointer gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
            onClick={() => setExpandComment(false)}
          >
            <img className="w-[18px]" src={IcComment4} />
            <Body size="s">有點模糊</Body>
          </div>
          <div
            className="flex cursor-pointer gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
            onClick={() => setExpandComment(false)}
          >
            <img className="w-[18px]" src={IcComment5} />
            <Body size="s">不喜歡</Body>
          </div>
        </div>
      )}
      <div className="mt-3 text-right">
        <Button
          appearance="secondary"
          className="!px-6 !py-3"
          onClick={() => navigate(Page.Online)}
        >
          <Body size="m">再問一題</Body>
        </Button>
      </div>
    </div>
  );
};

export default ResultItem;
