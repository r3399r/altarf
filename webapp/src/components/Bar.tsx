import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import IcAccount from 'src/assets/ic-account.svg';
import IcGoogle from 'src/assets/ic-google.svg';
import PicLogo from 'src/assets/pic-logo.svg';
import Body from './typography/Body';
import Button from './Button';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from 'src/service/authService';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { getUserProfile } from 'src/service/userService';

const Bar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname === '/daily' ? 1 : 0);
  const { isLogin } = useSelector((rootState: RootState) => rootState.ui);
  const [balance, setBalance] = useState<number>();

  const onLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => login(tokenResponse.code),
    onError: (error) => console.log('Login Failed', error),
    flow: 'auth-code',
  });

  useEffect(() => {
    if (isLogin) getUserProfile().then((res) => setBalance(res.balance));
  }, [isLogin]);

  return (
    <div className="relative mx-4 mt-4 flex justify-center sm:mx-8">
      <Body className="absolute left-0 top-0 sm:top-2 sm:leading-9">
        <img className="sm:w-[143px] sm:h-[48px]" src={PicLogo} />
      </Body>
      <div className="absolute right-0 top-0 sm:top-2">
        {isLogin ? (
          <div className="flex items-center gap-6">
            <Body className="text-text-primary">{`餘額: ${balance ?? '-'} 點`}</Body>
            <img src={IcAccount} className="h-6 sm:h-auto" />
          </div>
        ) : (
          <Body>
            <Button
              appearance="secondary"
              className="!px-3 !py-[9.5px] !text-[14px]"
              onClick={() => onLogin()}
            >
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
            navigate(Page.Online);
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
