import { FC } from 'react';
import { logout } from 'src/service/authService';
import Divider from './Divider';
import Body from './typography/Body';

type Props = {
  email: string;
};

type ItemProps = {
  label: string;
  onClick: () => void;
};

const Menu: FC<Props> = ({ email }) => {
  const onLogout = () => {
    console.log('Logout clicked');
    // Add logout logic here
    logout();
  };

  const onViewRecords = () => {
    console.log('View records clicked');
    // Add navigation logic here
  };

  const onRecharge = () => {
    console.log('Recharge clicked');
    // Add recharge logic here
  };

  const Item: FC<ItemProps> = ({ label, onClick }) => (
    <Body className="cursor-pointer p-4 hover:bg-grey-700" onClick={onClick}>
      {label}
    </Body>
  );

  return (
    <div className="rounded-xl bg-background-menu-normal shadow-lg">
      <Body className="px-4 py-3 pt-4">{email}</Body>
      <Divider />
      <Item label="餘額與儲值" onClick={onRecharge} />
      <Item label="占卜紀錄" onClick={onViewRecords} />
      <Item label="登出" onClick={onLogout} />
    </div>
  );
};

export default Menu;
