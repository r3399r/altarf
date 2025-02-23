import { useSelector } from 'react-redux';
import IcLoader from 'src/assets/ic-loader.svg';
import { RootState } from 'src/redux/store';
import { Backdrop } from '@mui/material';

const Loader = () => {
  const { workload } = useSelector((rootState: RootState) => rootState.ui);

  return (
    <Backdrop open={workload > 0}>
      <div className="w-20 outline-none">
        <img src={IcLoader} />
      </div>
    </Backdrop>
  );
};

export default Loader;
