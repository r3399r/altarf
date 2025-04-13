import { FC } from 'react';
import { useSelector } from 'react-redux';
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

const Menu: FC<Props> = ({ onClose }) => {
  const { email } = useSelector((state: RootState) => state.ui);

  const onLogout = () => {
    onClose();
    logout();
  };

  const onViewRecords = () => {
    console.log('View records clicked');
    onClose();
    // Add navigation logic here
  };

  const onRecharge = () => {
    console.log('Recharge clicked');
    onClose();
    // Add recharge logic here
  };

  const Item: FC<ItemProps> = ({ label, onClick }) => (
    <Body className="cursor-pointer p-4 hover:bg-grey-700" onClick={onClick}>
      {label}
    </Body>
  );

  return (
    <div className="rounded-xl bg-background-menu-normal shadow-lg">
      <Body className="px-4 py-3 pt-4">{email ?? '-'}</Body>
      <Divider />
      <Item label="餘額與儲值" onClick={onRecharge} />
      <Item label="占卜紀錄" onClick={onViewRecords} />
      <Item label="登出" onClick={onLogout} />
    </div>
  );
};

export default Menu;
