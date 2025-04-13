import { useGoogleLogin } from '@react-oauth/google';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import userEndpoint from 'src/api/userEndpoint';
import IcAccount from 'src/assets/ic-account.svg';
import IcGoogle from 'src/assets/ic-google.svg';
import PicLogo from 'src/assets/pic-logo.svg';
import { Page } from 'src/constant/Page';
import { RootState } from 'src/redux/store';
import { finishWaiting, setBalance, setEmail, startWaiting } from 'src/redux/uiSlice';
import { login } from 'src/service/authService';
import Button from './Button';
import Menu from './Menu';
import Body from './typography/Body';

const Bar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname === '/daily' ? 1 : 0);
  const { isLogin, balance } = useSelector((rootState: RootState) => rootState.ui);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const onLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => login(tokenResponse.code),
    onError: (error) => console.log('Login Failed', error),
    flow: 'auth-code',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuVisible(false);
    };

    if (menuVisible) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  useEffect(() => {
    if (isLogin) {
      dispatch(startWaiting());
      userEndpoint
        .getUser()
        .then((res) => {
          dispatch(setEmail(res.data.email));
          dispatch(setBalance(res.data.balance));
        })
        .finally(() => {
          dispatch(finishWaiting());
        });
    }
  }, [isLogin, dispatch]);

  return (
    <div className="relative mx-4 mt-4 flex justify-center sm:mx-8">
      <Body className="absolute top-0 left-0 sm:top-2 sm:leading-9">
        <img className="sm:h-[48px] sm:w-[143px]" src={PicLogo} />
      </Body>
      <div className="absolute top-0 right-0 sm:top-2">
        {isLogin ? (
          <div className="relative flex items-center gap-6">
            <Body className="text-text-primary">{`餘額: ${balance ?? '-'} 點`}</Body>
            <img
              src={IcAccount}
              className="h-6 cursor-pointer sm:h-auto"
              onMouseDown={(e) => {
                e.stopPropagation();
                setMenuVisible(!menuVisible);
              }}
            />
            {menuVisible && (
              <div ref={menuRef} className="absolute top-10 right-0 z-10">
                <Menu onClose={() => setMenuVisible(false)} />
              </div>
            )}
          </div>
        ) : (
          <Body>
            <Button
              appearance="secondary"
              className="!px-3 !py-[9.5px] !text-[14px]"
              onClick={() => onLogin()}
            >
              <div className="flex items-center gap-1">
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
          className={classNames('mx-6 cursor-pointer py-4 sm:leading-9', {
            'border-b border-b-border-tab text-text-tab-focus': tab === 0,
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
          className={classNames('mx-6 cursor-pointer py-4 sm:leading-9', {
            'border-b border-b-border-tab text-text-tab-focus': tab === 1,
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
