import classNames from 'classnames';
import { format } from 'date-fns';
import { CopyToClipboard } from 'react-copy-to-clipboard-ts';
import IcLink from 'src/assets/ic-link.svg';
import IcLoader from 'src/assets/ic-loader.svg';
import IcShare from 'src/assets/ic-share.svg';
import StarDivision from 'src/components/StarDivision';
import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import H3 from 'src/components/typography/H3';
import useFetch from './useFetch';

const OnlineInterpretation = () => {
  const { result, url } = useFetch();

  if (result === null) return <></>;

  return (
    <>
      <div className="mt-10 flex items-center justify-between sm:mt-20">
        <H2>占卜結果</H2>
        <Body size="m">
          {format(
            result.createdAt ? new Date(result.createdAt) : new Date(),
            'yyyy/MM/dd HH:mm:ss',
          )}
        </Body>
      </div>
      <div className="mt-16 flex flex-wrap justify-center gap-[28px] sm:gap-[60px]">
        {result.card.map((v) => (
          <div key={v.id} className="flex w-[90px] flex-col items-center sm:w-[132px]">
            <img
              src={`/card/${v.cardId}.jpg`}
              className={classNames('h-[200px] rounded-md border-4 border-white', {
                'rotate-180': v.reversal,
              })}
            />
            <div className="mt-5 text-center">
              <Body>{v.card.name}</Body>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-[8px] bg-background-surface-overlay-normal px-8 py-4">
        <H3 className="mb-2">我的問題：</H3>
        <Body>{result.question}</Body>
      </div>
      <StarDivision className="mt-[100px] px-4 py-10 sm:px-8 sm:py-14" title="解牌結果">
        {result.interpretationAi.length === 0 ? (
          <div className="flex justify-center">
            <img className="w-20" src={IcLoader} />
          </div>
        ) : (
          <Body className="whitespace-pre-line">{result.interpretationAi[0].interpretation}</Body>
        )}
      </StarDivision>
      <div className="flex justify-end gap-3 py-4">
        <img src={IcShare} className="cursor-pointer" />
        <CopyToClipboard text={url}>
          <img src={IcLink} className="cursor-pointer" />
        </CopyToClipboard>
      </div>
    </>
  );
};

export default OnlineInterpretation;
