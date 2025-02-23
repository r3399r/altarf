import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import IcAccount from 'src/assets/ic-account.svg';
import IcGoogle from 'src/assets/ic-google.svg';
import PicLogo from 'src/assets/pic-logo.svg';
import Body from './typography/Body';
import Button from './Button';

const Bar = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  // const [isLogin, _setIsLogin] = useState(false);
  const isLogin = false;

  return (
    <div className="relative mx-4 mt-4 flex justify-center sm:mx-8">
      <Body className="absolute left-0 top-0 sm:top-2 sm:leading-9">
        <img className="sm:w-[143px] sm:h-[48px]" src={PicLogo} />
      </Body>
      <div className="absolute right-0 top-0 sm:top-2">
        {isLogin ? (
          <div className="flex items-center gap-6">
            <Body className="text-text-primary">餘額：NT$100</Body>
            <img src={IcAccount} className="h-6 sm:h-auto" />
          </div>
        ) : (
          <Body>
            <Button appearance="secondary" className="!px-3 !py-[9.5px] !text-[14px]">
              <div className="flex gap-1 items-center">
                <img src={IcGoogle} />
                <div>Google 登入</div>
              </div>
            </Button>
          </Body>
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
