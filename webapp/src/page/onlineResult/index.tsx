import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard-ts';
import { useDispatch } from 'react-redux';
import IcShare from 'src/assets/ic-share.svg';
import Button from 'src/components/Button';
import Canvas from 'src/components/Canvas';
import StarDivision from 'src/components/StarDivision';
import Body from 'src/components/typography/Body';
import H3 from 'src/components/typography/H3';
import { TAROT_CARD_LIST, TAROT_SPREAD_LIST } from 'src/constant/backend/Tarot';
import { setSnackbarMessage } from 'src/redux/uiSlice';
import { compare } from 'src/utils/compare';
import ModalAskForReading from './ModalAskForReading';
import ResultItem from './ResultItem';
import useFetch from './useFetch';

const OnlineResult = () => {
  const dispatch = useDispatch();
  const { result, mapReaders, url, askAi, askHuman, isAiSupport, isOwner, doRating } = useFetch();
  const [openAskForReading, setOpenAskForReading] = useState(false);

  if (!result) return <></>;

  return (
    <>
      <Canvas
        cardList={result.card.sort(compare('sequence')).map((v) => ({
          id: v.cardId,
          name: TAROT_CARD_LIST.find((c) => c.id === v.cardId)?.name ?? '',
          reversed: v.reversal,
        }))}
        showCardBack={false}
        spread={TAROT_SPREAD_LIST.find((s) => s.id === result.spreadId) ?? TAROT_SPREAD_LIST[0]}
      />
      <div className="rounded-lg bg-background-surface-overlay-normal px-8 py-4">
        <H3 className="mb-2">我的問題：</H3>
        <Body>{result.question}</Body>
      </div>
      <div className="relative mt-6 py-3">
        {isOwner && (
          <div className="text-center">
            <Button onClick={() => setOpenAskForReading(true)}>前往解牌</Button>
          </div>
        )}
        <CopyToClipboard text={url} onCopy={() => dispatch(setSnackbarMessage('已複製連結'))}>
          <img src={IcShare} className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer" />
        </CopyToClipboard>
      </div>
      {result.reading.length > 0 && (
        <StarDivision className="mt-15 px-4 py-14 sm:px-8" title="解牌結果">
          <div className="flex flex-col gap-14">
            {result.reading.map((v) => (
              <ResultItem key={v.id} tarotReading={v} doRating={doRating} isOwner={isOwner} />
            ))}
          </div>
        </StarDivision>
      )}
      <ModalAskForReading
        open={openAskForReading}
        handleClose={() => setOpenAskForReading(false)}
        isAiSupport={isAiSupport}
        askAi={askAi}
        askHuman={askHuman}
        readers={mapReaders}
      />
    </>
  );
};

export default OnlineResult;
