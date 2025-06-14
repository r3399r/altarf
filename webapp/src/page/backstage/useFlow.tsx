import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/redux/store';

const useFlow = () => {
  const navigate = useNavigate();
  const { isReader } = useSelector((rootState: RootState) => rootState.ui);

  useEffect(() => {
    if (isReader === false) navigate('/online');
  }, [isReader]);
};

export default useFlow;
