import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IcRatingLike from 'src/assets/ic-rating-like.svg';
import IcRatingLove from 'src/assets/ic-rating-love.svg';
import IcRatingNeutral from 'src/assets/ic-rating-neutral.svg';
import IcRatingUnclear from 'src/assets/ic-rating-unclear.svg';
import IcRatingUnlike from 'src/assets/ic-rating-unlike.svg';
import IcStar from 'src/assets/ic-starry.svg';
import PicAvatarAi from 'src/assets/pic-avatar-ai.svg';
import PicAvatarHuman from 'src/assets/pic-avatar-human.svg';
import Button from 'src/components/Button';
import Body from 'src/components/typography/Body';
import { Page } from 'src/constant/Page';
import { TarotReading } from 'src/model/backend/Tarot';

type Props = {
  tarotReading: TarotReading;
  doRating: (rating: number, readingId: string, isAi: boolean) => void;
  isOwner: boolean;
};

const ResultItem = ({ tarotReading, doRating, isOwner }: Props) => {
  const navigate = useNavigate();
  const { id, reading, createdAt, isAi, rating } = tarotReading;
  const [expandRating, setExpandRating] = useState<boolean>(false);

  const onRating = (rating: number) => {
    doRating(rating, id, isAi);
    setExpandRating(false);
  };

  const RatingOption = ({ rating, onClick }: { rating: number; onClick: () => void }) => {
    let icon: string;
    let label: string;
    switch (rating) {
      case 5:
        icon = IcRatingLove;
        label = '非常滿意';
        break;
      case 4:
        icon = IcRatingLike;
        label = '有幫助';
        break;
      case 3:
        icon = IcRatingNeutral;
        label = '普通';
        break;
      case 2:
        icon = IcRatingUnclear;
        label = '有點模糊';
        break;
      default:
        icon = IcRatingUnlike;
        label = '不喜歡';
        break;
    }

    return (
      <div
        className="flex w-fit cursor-pointer gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
        onClick={onClick}
      >
        <img className="w-[18px]" src={icon} />
        <Body size="s">{label}</Body>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={isAi ? PicAvatarAi : PicAvatarHuman} />
          <Body bold>{isAi ? 'AI解牌' : `塔羅師-${tarotReading.reader?.nickname}`}</Body>
        </div>
        <Body className="text-text-secondary">
          {createdAt && format(createdAt, 'yyyy/MM/dd HH:mm:ss')}
        </Body>
      </div>
      <Body className="mb-3 whitespace-pre-line">
        {reading === null &&
          (isAi
            ? 'AI解牌中... 請稍候一下再重新整理頁面。'
            : '塔羅師解牌中... 可能需要一段時間，請耐心等待，有結果時會寄 Email 通知您。')}
        {reading !== null && reading}
      </Body>
      {reading !== null && isOwner && (
        <div>
          {!expandRating && rating === null && (
            <div
              className="flex w-fit cursor-pointer items-center gap-1 rounded-[30px] bg-background-surface-tabbar px-3 py-2"
              onClick={() => setExpandRating(true)}
            >
              <img className="w-[18px]" src={IcStar} />
              <Body size="s">為此占卜評分</Body>
            </div>
          )}
          {!expandRating && rating !== null && (
            <RatingOption rating={rating} onClick={() => setExpandRating(true)} />
          )}
          {expandRating && (
            <div className="flex flex-wrap items-center gap-3">
              <RatingOption rating={5} onClick={() => onRating(5)} />
              <RatingOption rating={4} onClick={() => onRating(4)} />
              <RatingOption rating={3} onClick={() => onRating(3)} />
              <RatingOption rating={2} onClick={() => onRating(2)} />
              <RatingOption rating={1} onClick={() => onRating(1)} />
            </div>
          )}
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
