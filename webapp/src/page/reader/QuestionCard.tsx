import classNames from 'classnames';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IcRatingLike from 'src/assets/ic-rating-like.svg';
import IcRatingLove from 'src/assets/ic-rating-love.svg';
import IcRatingNeutral from 'src/assets/ic-rating-neutral.svg';
import IcRatingUnclear from 'src/assets/ic-rating-unclear.svg';
import IcRatingUnlike from 'src/assets/ic-rating-unlike.svg';
import Canvas from 'src/components/Canvas';
import Body from 'src/components/typography/Body';
import { TAROT_CARD_LIST, TAROT_SPREAD_LIST } from 'src/constant/backend/Tarot';
import { Page } from 'src/constant/Page';
import { TarotReadingHuman } from 'src/model/backend/entity/TarotReadingHumanEntity';
import { compare } from 'src/utils/compare';
import ResultForm from './ResultForm';

type Props = {
  status: 'solved' | 'unsolved';
  tarotReading: TarotReadingHuman;
  sendReading?: (id: string, reading: string) => void;
};

const QuestionCard = ({ tarotReading, sendReading, status }: Props) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);

  const Rating = ({ rating }: { rating: number }) => {
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
      <div className="flex gap-1">
        <img className="w-[18px]" src={icon} />
        <Body size="s">{label}</Body>
      </div>
    );
  };

  return (
    <div key={tarotReading.question.id} className="rounded-lg bg-background-surface-list p-4">
      <div className="mb-4 flex flex-col gap-1">
        <Body>{tarotReading.question.question}</Body>
        <div className="flex">
          <Body size="s" className="flex-1 text-text-secondary">
            {tarotReading.createdAt ? format(tarotReading.createdAt, 'yyyy/MM/dd HH:mm:ss') : ''}
          </Body>
          <Body
            size="m"
            bold
            className="cursor-pointer text-text-secondary underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '收合牌陣' : '查看牌陣'}
          </Body>
        </div>
        <Body size="s" className="text-text-secondary">
          by{' '}
          <span
            className="cursor-pointer underline"
            onClick={() => navigate(Page.Records, { state: tarotReading.question.user.email })}
          >
            {tarotReading.question.user.email}
          </span>
        </Body>
      </div>
      <div
        className={classNames('overflow-hidden transition-all duration-1000 ease-in-out', {
          'max-h-100 sm:max-h-130': expanded,
          'max-h-0': !expanded,
        })}
      >
        <Canvas
          cardList={tarotReading.question.card.sort(compare('sequence')).map((v) => ({
            id: v.cardId,
            name: TAROT_CARD_LIST.find((c) => c.id === v.cardId)?.name ?? '',
            reversed: v.reversal,
          }))}
          showCardBack={false}
          spread={
            TAROT_SPREAD_LIST.find((s) => s.id === tarotReading.question.spreadId) ??
            TAROT_SPREAD_LIST[0]
          }
        />
      </div>
      {status === 'unsolved' && sendReading && (
        <ResultForm
          id={tarotReading.id}
          question={tarotReading.question.question}
          sendReading={sendReading}
        />
      )}
      {status === 'solved' && tarotReading.reading && (
        <div>
          <Body size="m" className="text-text-secondary">
            你的回答：
          </Body>
          <Body className="border-b-1 border-b-border-table-thead px-2 pt-2 pb-4">
            {tarotReading.reading}
          </Body>
          <div className="mt-2 flex items-center justify-between py-2">
            <Body size="s" className="text-text-secondary">
              {tarotReading.updatedAt ? format(tarotReading.updatedAt, 'yyyy/MM/dd HH:mm:ss') : ''}
            </Body>
            {tarotReading.rating ? (
              <Rating rating={tarotReading.rating} />
            ) : (
              <Body size="s">未評價</Body>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
