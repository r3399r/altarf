import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import { RootState } from 'src/redux/store';
import TabInfo from './TabInfo';
import TabSolved from './TabSolved';
import TabUnsolved from './TabUnsolved';
import useFetch from './useFetch';

const Reader = () => {
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const [isReady, setIsReady] = useState(false);
  const { isReader } = useSelector((rootState: RootState) => rootState.ui);
  const navigate = useNavigate();
  const {
    unsolvedQuestions,
    unsolvedPage,
    setUnsolvedPage,
    solvedQuestions,
    solvedPage,
    setSolvedPage,
    sendReading,
  } = useFetch();

  useEffect(() => {
    if (isReader === false) navigate('/online');
    else if (isReader === true) setIsReady(true);
  }, [isReader]);

  if (!isReady) return <></>;

  return (
    <>
      <H2 className="mt-10 mb-4">塔羅師後台</H2>
      <div className="mb-4 flex gap-1 rounded-sm bg-background-surface-list p-0.5 text-center text-text-segment">
        <Body
          bold
          size="m"
          className={classNames('flex-1 cursor-pointer px-6 py-1', {
            'rounded-sm bg-background-surface-overlay-hover !text-text-primary': tab === 1,
          })}
          onClick={() => setTab(1)}
        >
          待解牌
        </Body>
        <Body
          bold
          size="m"
          className={classNames('flex-1 cursor-pointer px-6 py-1', {
            'rounded-sm bg-background-surface-overlay-hover !text-text-primary': tab === 2,
          })}
          onClick={() => setTab(2)}
        >
          已解牌
        </Body>
        <Body
          bold
          size="m"
          className={classNames('flex-1 cursor-pointer px-6 py-1', {
            'rounded-sm bg-background-surface-overlay-hover !text-text-primary': tab === 3,
          })}
          onClick={() => setTab(3)}
        >
          個人資訊
        </Body>
      </div>
      {tab === 1 && (
        <TabUnsolved
          questions={unsolvedQuestions}
          page={unsolvedPage}
          setPage={setUnsolvedPage}
          sendReading={sendReading}
        />
      )}
      {tab === 2 && (
        <TabSolved questions={solvedQuestions} page={solvedPage} setPage={setSolvedPage} />
      )}
      {tab === 3 && <TabInfo />}
    </>
  );
};

export default Reader;
