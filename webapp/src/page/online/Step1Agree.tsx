import StarDivision from 'src/components/StarDivision';
import Description from './Description';
import Button from 'src/components/Button';

type Props = {
  onNext: () => void;
};

const Step1Agree = ({ onNext }: Props) => {
  return (
    <>
      <StarDivision
        className="mt-[55px] px-4 py-6 pt-10 sm:mt-[95px] md:mt-[99px]"
        title="占卜前請先仔細閱讀"
      >
        <div className="flex flex-col gap-6">
          <Description
            title="開放的心態"
            description="保持一個開放、接受的心態。不要預設結果，而是允許塔羅牌提供你需要的信息。避免對特定結果有太多期望，這樣能夠更好地接受占卜的結果。"
          />
          <Description
            title="問題的明確性"
            description="在抽牌之前，確保你的問題是明確而具體的。清晰的問題有助於牌陣提供更有意義的回答。避免模糊或開放式的問題，而是專注於特定的問題。"
          />
          <Description
            title="冥想和專注"
            description="進行一些簡短的冥想，平靜你的思緒。專注於你想要得到答案的問題，並讓自己處於一個冷靜的狀態。"
          />
          <Description
            title="自主權"
            description="牌陣提供的只是可能的未來和建議，最終的決定還在於你自己。塔羅牌是一種工具，而不是命運的定數。"
          />
          <Description
            title="避免問的問題"
            description="死亡日期、法律事務、健康診斷、過於具體的時間、過於敏感的主題。"
          />
        </div>
      </StarDivision>
      <div className="text-center">
        <Button className="mt-10" onClick={onNext}>
          我同意
        </Button>
      </div>
    </>
  );
};

export default Step1Agree;
