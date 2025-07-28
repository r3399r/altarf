import { useNavigate } from 'react-router-dom';
import IcBack from 'src/assets/ic-back.svg';
import Body from './typography/Body';

const Back = () => {
  const navigate = useNavigate();

  return (
    <div className="flex cursor-pointer items-center gap-px" onClick={() => navigate(-1)}>
      <img src={IcBack}></img>
      <Body>回前頁</Body>
    </div>
  );
};

export default Back;
