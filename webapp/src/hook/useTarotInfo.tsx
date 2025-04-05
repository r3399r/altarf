import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { loadTarotBasicInfo } from 'src/service/tarotService';

const useTarotInfo = () => {
  const { spreadList, cardList } = useSelector((rootState: RootState) => rootState.tarot);

  useEffect(() => {
    const runEffect = async () => {
      await loadTarotBasicInfo();
    };

    runEffect();
  }, [spreadList, cardList]);

  return { spreadList, cardList };
};

export default useTarotInfo;
