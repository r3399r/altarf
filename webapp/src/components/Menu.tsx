import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import { RootState } from 'src/redux/store';
import { logout } from 'src/service/authService';
import Divider from './Divider';
import Body from './typography/Body';

type Props = {
  onClose: () => void;
};

type ItemProps = {
  label: string;
  onClick: () => void;
};

const Menu = ({ onClose }: Props) => {
  const { email } = useSelector((state: RootState) => state.ui);
  const navigate = useNavigate();

  const onLogout = () => {
    onClose();
    logout();
  };

  const onViewRecords = () => {
    navigate(Page.Records);
    onClose();
  };

  const onViewWallet = () => {
    navigate(Page.Wallet);
    onClose();
  };

  const onContactUs = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSfr4pIQUo3cOJnIMrowx0bpARmK8sQUfBEWIdHFH4yM8TMQPQ/viewform?usp=dialog',
      '_blank',
    );
    onClose();
  };

  const Item = ({ label, onClick }: ItemProps) => (
    <Body className="cursor-pointer p-4 hover:bg-grey-700" onClick={onClick}>
      {label}
    </Body>
  );

  return (
    <div className="overflow-hidden rounded-xl bg-background-menu-normal shadow-lg">
      <Body className="px-4 py-3 pt-4">{email ?? '-'}</Body>
      <Divider />
      <Item label="餘額與儲值" onClick={onViewWallet} />
      <Item label="占卜紀錄" onClick={onViewRecords} />
      <Item label="聯絡我們" onClick={onContactUs} />
      <Item label="登出" onClick={onLogout} />
    </div>
  );
};

export default Menu;
