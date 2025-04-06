import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import IcLoader from 'src/assets/ic-loader.svg';
import { format } from 'date-fns';
import H3 from 'src/components/typography/H3';
import StarDivision from 'src/components/StarDivision';
import IcShare from 'src/assets/ic-share.svg';
import IcLink from 'src/assets/ic-link.svg';
import { useLocation, useParams } from 'react-router-dom';
import { TarotQuestion } from 'src/model/backend/entity/TarotQuestionEntity';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { getTarotQuestionById } from 'src/service/tarotService';

const OnlineInterpretation = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as TarotQuestion | null;
  const [result, setResult] = useState<TarotQuestion | null>(state);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (state === null) getTarotQuestionById(id ?? '').then((res) => setResult(res));
  }, [state, id]);

  useEffect(() => {
    if (!!result && result.interpretationAi.length > 0) return;

    const fetchData = async () => {
      const res = await getTarotQuestionById(id ?? '');
      setResult(res);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [result, id, intervalRef]);

  if (result === null) return <></>;

  return (
    <>
      <div className="flex justify-between items-center">
        <H2>占卜結果</H2>
        <Body size="m">
          {format(
            result.createdAt ? new Date(result.createdAt) : new Date(),
            'yyyy/MM/dd HH:mm:ss',
          )}
        </Body>
      </div>
      <div className="flex gap-[28px] sm:gap-[60px] flex-wrap justify-center mt-16">
        {result.card.map((v) => {
          return (
            <div key={v.id} className="flex flex-col items-center w-[90px] sm:w-[132px]">
              <img
                src={`/card/${v.cardId}.jpg`}
                className={classNames('border-white border-4 rounded-md h-[200px]', {
                  'rotate-180': v.reversal,
                })}
              />
              <div className="mt-5 text-center">
                <Body>{v.card.name}</Body>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 px-8 py-4 bg-background-surface-overlay-normal rounded-[8px]">
        <H3 className="mb-2">我的問題：</H3>
        <Body>{result.question}</Body>
      </div>
      <StarDivision className="mt-[100px] py-10 px-4 sm:py-14 sm:px-8" title="解牌結果">
        {result.interpretationAi.length === 0 ? (
          <div className="flex justify-center">
            <img className="w-20" src={IcLoader} />
          </div>
        ) : (
          <Body className="whitespace-pre-line">{result.interpretationAi[0].interpretation}</Body>
        )}
      </StarDivision>
      <div className="flex justify-end mt-4 gap-3">
        <img src={IcShare} className="cursor-pointer" />
        <img src={IcLink} className="cursor-pointer" />
      </div>
    </>
  );
};

export default OnlineInterpretation;
