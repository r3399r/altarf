import classNames from 'classnames';
import { useState } from 'react';
import Body from './typography/Body';

const Bar = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="relative mx-4 mt-4 flex justify-center sm:mx-8">
      <Body className="absolute left-0 top-0 sm:top-4">LOGO</Body>
      <Body className="absolute right-0 top-0 sm:top-4">以Google帳號登入</Body>
      <div className="flex pt-10 sm:pt-0">
        <Body
          bold
          className={classNames('mx-6 py-4 cursor-pointer', {
            'text-beige-300 border-b border-b-beige-300': tab === 0,
          })}
          onClick={() => setTab(0)}
        >
          線上解牌
        </Body>
        <Body
          bold
          className={classNames('mx-6 py-4 cursor-pointer', {
            'text-beige-300 border-b border-b-beige-300': tab === 1,
          })}
          onClick={() => setTab(1)}
        >
          每日塔羅
        </Body>
      </div>
    </div>
  );
};

export default Bar;
