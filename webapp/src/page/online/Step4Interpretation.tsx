import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import { format } from 'date-fns';
import H3 from 'src/components/typography/H3';
import StarDivision from 'src/components/StarDivision';
import IcShare from 'src/assets/ic-share.svg';
import IcLink from 'src/assets/ic-link.svg';

const tmpInterpretation = `今天的你，正位的「世界」意味著一個圓滿的結束，也是一個新的開始，真是太好了！這張牌代表著成熟、成就和圓滿，今天你會感受到自己在某個領域的成功，無論是工作還是生活上的挑戰，都將迎來一個美好的結局。

建議你好好享受這份成功，並且把它轉化為新的動力，勇敢地展望未來。記得將這份喜悅和周遭的人分享，讓大家一同感受到你的能量！

加油！每一個結束都是為了讓新的開始更美好，今天是充滿祝福的一天，抓住機會，讓自己飛得更高！`;

const Step4Interpretation = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <H2>占卜結果</H2>
        <Body size="m">{format(new Date(), 'yyyy/MM/dd HH:mm:ss')}</Body>
      </div>
      <div className="flex gap-[28px] sm:gap-[60px] flex-wrap justify-center mt-16">
        <div className="flex flex-col items-center w-[90px] sm:w-[132px]">
          <img
            src={'/card/CUPS_ACE.jpg'}
            className="border-white border-4 rounded-md rotate-180 h-[200px]"
          />
          <div className="mt-5 text-center">
            <Body>Ace of Pantacles</Body>
            <Body>錢幣一</Body>
          </div>
        </div>
        <div className="flex flex-col items-center w-[90px] sm:w-[132px]">
          <img
            src={'/card/CUPS_ACE.jpg'}
            className="border-white border-4 rounded-md rotate-180 h-[200px]"
          />
          <div className="mt-5 text-center">
            <Body>Ace of Pantacles of ABCDE</Body>
            <Body>錢幣一</Body>
          </div>
        </div>
        <div className="flex flex-col items-center w-[90px] sm:w-[132px]">
          <img
            src={'/card/CUPS_ACE.jpg'}
            className="border-white border-4 rounded-md rotate-180 h-[200px]"
          />
          <div className="mt-5 text-center">
            <Body>Ace of Pantacles</Body>
            <Body>錢幣一</Body>
          </div>
        </div>
      </div>
      <div className="mt-10 px-8 py-4 bg-background-surface-overlay-normal rounded-[8px]">
        <H3 className="mb-2">我的問題：</H3>
        <Body>晚餐吃什麼？</Body>
      </div>
      <StarDivision className="mt-[100px] py-10 px-4 sm:py-14 sm:px-8" title="抽牌結果">
        <Body className="whitespace-pre-line">{tmpInterpretation}</Body>
      </StarDivision>
      <div className="flex justify-end mt-4 gap-3">
        <img src={IcShare} className="cursor-pointer" />
        <img src={IcLink} className="cursor-pointer" />
      </div>
    </>
  );
};

export default Step4Interpretation;
