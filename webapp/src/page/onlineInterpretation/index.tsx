import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard-ts';
import IcShare from 'src/assets/ic-share.svg';
import Button from 'src/components/Button';
import Canvas from 'src/components/Canvas';
import Modal from 'src/components/Modal';
import StarDivision from 'src/components/StarDivision';
import Body from 'src/components/typography/Body';
import H3 from 'src/components/typography/H3';
import useFetch from './useFetch';

const OnlineInterpretation = () => {
  const { result, url } = useFetch();
  const [open, setOpen] = useState(false);

  if (result === null) return <></>;

  return (
    <>
      <Canvas
        cardList={result.card.map((v) => ({
          id: v.cardId,
          name: v.card.name,
          reversed: v.reversal,
        }))}
        showCardBack={false}
        spreadId={result.spreadId}
      />
      <div className="rounded-lg bg-background-surface-overlay-normal px-8 py-4">
        <H3 className="mb-2">我的問題：</H3>
        <Body>{result.question}</Body>
      </div>
      <div className="relative mt-6 flex items-center justify-center gap-4 py-3">
        <Button onClick={() => setOpen(true)}>AI 解牌</Button>
        <Button>真人解牌</Button>
        <CopyToClipboard text={url}>
          <img src={IcShare} className="absolute right-0 cursor-pointer" />
        </CopyToClipboard>
      </div>
      {result.interpretationAi.length > 0 && (
        <StarDivision className="mt-15 px-4 py-10 sm:px-8 sm:py-14" title="解牌結果">
          <Body className="whitespace-pre-line">{result.interpretationAi[0].interpretation}</Body>
        </StarDivision>
      )}
      <Modal open={open} handleClose={() => setOpen(false)} title="AI 解牌">
        <div>使用 AI 解牌需花費 10 點</div>
      </Modal>
    </>
  );
};

export default OnlineInterpretation;
