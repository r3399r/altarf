import { useNavigate } from 'react-router-dom';
import {
  AI_COST,
  HUMAN_COST,
  POINT_FOR_NEW_USER,
  POINT_MONTHLY,
} from 'src/constant/backend/Balance';
import { Page } from 'src/constant/Page';
import Modal from './Modal';
import Body from './typography/Body';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ModalQuotaDesc = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      handleClose={onClose}
      title="使用額度說明"
      confirmText="前往儲值"
      cancelText="取消"
      handleConfirm={() => navigate(Page.Deposit)}
    >
      <>
        <Body bold>免費贈送</Body>
        <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-text-primary">
          <li>
            新加入用戶即贈送 <span className="text-text-primary">{POINT_FOR_NEW_USER}</span> 點
          </li>
          <li>
            加入後，每月 1 日贈送 <span className="text-text-primary">{POINT_MONTHLY}</span> 點
          </li>
        </ul>
        <Body bold className="mt-6">
          解牌方案
        </Body>
        <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-text-primary">
          <li>
            每日塔羅: <span className="text-text-primary">免費</span>
          </li>
          <li>
            線上解牌: AI解牌每次 <span className="text-text-primary">{AI_COST}</span>{' '}
            點；真人解牌每次 <span className="text-text-primary">{HUMAN_COST}</span> 點
          </li>
        </ul>
      </>
    </Modal>
  );
};

export default ModalQuotaDesc;
