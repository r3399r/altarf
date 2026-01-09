import Input from 'src/components/Input';
import Textarea from 'src/components/Textarea';
import Body from 'src/components/typography/Body';

const TabInfo = () => (
  <div>
    <div className="flex flex-col gap-4">
      <Input label="顯示名稱" />
      <Textarea
        label="自我介紹"
        placeholder="請介紹您的塔羅經驗、專長領域、解牌風格..."
        className="h-30"
      />
    </div>
    <div className="my-6 h-px bg-border-divider-sub"></div>
    <Body bold>社群連結</Body>
    <div className="mt-4 flex flex-col gap-4">
      <Input label="Facebook" />
      <Input label="Instagram" />
      <Input label="YouTube" />
      <Input label="Threads" />
      <Input label="E-mail" />
      <Input label="個人網站" />
    </div>
    <div className="my-6 h-px bg-border-divider-sub"></div>
    <Body bold>解牌費用</Body>
    <Body size="m" className="my-4">
      使用者實際解牌的費用會額外加上 5% 的手續費。
    </Body>
    <Input inputMode="decimal" type="number" />
    <Body size="s" className="mt-1 text-text-input-helper">
      手續費：NTD$5
    </Body>
    <Body size="s" className="text-text-input-helper">
      實際費用：NTD$85
    </Body>
  </div>
);

export default TabInfo;
