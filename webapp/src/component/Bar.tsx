import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import IcAccount from 'src/image/ic-account.svg';
import PicLogo from 'src/image/pic-logo.svg';
import Body from './typography/Body';

const Bar = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  // const [isLogin, _setIsLogin] = useState(false);
  const isLogin = false;

  return (
    <div className="relative mx-4 mt-4 flex justify-center sm:mx-8">
      <Body className="absolute left-0 top-0 sm:top-4 sm:leading-9">
        <img className="sm:w-[143px] sm:h-[48px]" src={PicLogo} />
      </Body>
      <div className="absolute right-0 top-0 sm:top-4">
        {isLogin ? (
          <div className="flex items-center gap-6">
            <Body className="text-beige-300">餘額：NT$100</Body>
            <img src={IcAccount} className="h-6 sm:h-auto" />
          </div>
        ) : (
          <Body>以Google帳號登入</Body>
        )}
      </div>
      <div className="flex pt-10 sm:pt-0">
        <Body
          bold
          className={classNames('mx-6 py-4 cursor-pointer sm:leading-9', {
            'text-text-tab-focus border-b border-b-border-tab': tab === 0,
          })}
          onClick={() => {
            setTab(0);
            navigate(Page.Tarot);
          }}
        >
          線上解牌
        </Body>
        <Body
          bold
          className={classNames('mx-6 py-4 cursor-pointer sm:leading-9', {
            'text-text-tab-focus border-b border-b-border-tab': tab === 1,
          })}
          onClick={() => {
            setTab(1);
            navigate(Page.Daily);
          }}
        >
          每日塔羅
        </Body>
      </div>
    </div>
  );
};

export default Bar;
