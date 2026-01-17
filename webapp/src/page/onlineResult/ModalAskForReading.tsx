import classNames from 'classnames';
import { useState } from 'react';
import IcSocialMediaFB from 'src/assets/ic-social-media-fb.svg';
import IcSocialMediaIG from 'src/assets/ic-social-media-ig.svg';
import IcSocialMediaThreads from 'src/assets/ic-social-media-threads.svg';
import IcSocialMediaYT from 'src/assets/ic-social-media-yt.svg';
import PicAvatarAi from 'src/assets/pic-avatar-ai.svg';
import PicAvatarHuman from 'src/assets/pic-avatar-human.svg';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import Body from 'src/components/typography/Body';
import { AI_COST } from 'src/constant/backend/Balance';
import { SocialMediaPlatform } from 'src/constant/backend/Reader';
import { Reader } from 'src/model/backend/entity/ReaderEntity';
import { bn } from 'src/utils/bignumber';
import { compare } from 'src/utils/compare';

type ModalAskForReadingProps = {
  open: boolean;
  handleClose: () => void;
  isAiSupport: boolean;
  askAi: () => void;
  askHuman: (readerId: string, cost: number) => void;
  readers: Reader[];
};

const ModalAskForReading = ({
  open,
  handleClose,
  isAiSupport,
  askAi,
  askHuman,
  readers,
}: ModalAskForReadingProps) => {
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
  const [selectedIsAi, setSelectedIsAi] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const showNext = isAiSupport || readers.length > 0;

  const onConfirm = () => {
    if (selectedIsAi) askAi();
    else if (selectedReader) {
      const cost = selectedReader.cost + selectedReader.fee;
      askHuman(selectedReader.id, cost);
    }
    onClose();
  };

  const onClose = () => {
    setStep(1);
    setSelectedIsAi(false);
    setSelectedReader(null);
    handleClose();
  };

  const Step1 = () => (
    <div className="flex flex-col gap-4">
      <Body>已解過此題的塔羅師將不會進行重複解牌。</Body>
      {isAiSupport && (
        <div
          className={classNames(
            'flex cursor-pointer items-start gap-4 rounded-lg border border-border-spread-normal px-4 py-3',
            {
              '!border-border-spread-active': selectedIsAi,
            },
          )}
          onClick={() => {
            setSelectedIsAi(true);
            setSelectedReader(null);
          }}
        >
          <img src={PicAvatarAi} />
          <div className="flex flex-1 justify-between">
            <Body bold>AI解牌</Body>
            <Body size="m">
              每次需花費 <span className="text-text-primary">{AI_COST}</span> 點
            </Body>
          </div>
        </div>
      )}
      {readers.map((r) => (
        <div
          key={r.id}
          className={classNames(
            'flex cursor-pointer items-start gap-4 rounded-lg border border-border-spread-normal px-4 py-3',
            {
              '!border-border-spread-active': selectedReader?.id === r.id,
            },
          )}
          onClick={() => {
            setSelectedIsAi(false);
            setSelectedReader(r);
          }}
        >
          <img src={PicAvatarHuman} />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex justify-between">
              <Body bold>塔羅師-{r.nickname}</Body>
              <Body size="m">
                每次需花費{' '}
                <span className="text-text-primary">{bn(r.cost).plus(r.fee).toFormat()}</span> 點
              </Body>
            </div>
            <Body>{r.bio}</Body>
            {r.social.length > 0 && (
              <div className="mt-1 flex gap-2">
                {r.social.sort(compare('platform')).map((s) => {
                  switch (s.platform) {
                    case SocialMediaPlatform.FACEBOOK:
                      return (
                        <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
                          <img src={IcSocialMediaFB} />
                        </a>
                      );
                    case SocialMediaPlatform.INSTAGRAM:
                      return (
                        <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
                          <img src={IcSocialMediaIG} />
                        </a>
                      );
                    case SocialMediaPlatform.YOUTUBE:
                      return (
                        <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
                          <img src={IcSocialMediaYT} />
                        </a>
                      );
                    case SocialMediaPlatform.THREADS:
                      return (
                        <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
                          <img src={IcSocialMediaThreads} />
                        </a>
                      );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      ))}
      {showNext && (
        <div className="mt-3 flex justify-end gap-6">
          <Button appearance="secondary" onClick={onClose}>
            取消
          </Button>
          <Button disabled={!selectedIsAi && !selectedReader} onClick={() => setStep(2)}>
            下一步
          </Button>
        </div>
      )}
      {!showNext && (
        <div className="mt-3 flex justify-end">
          <Button onClick={onClose}>我知道了</Button>
        </div>
      )}
    </div>
  );

  const Step2 = () => {
    let cost = AI_COST.toString();
    if (selectedIsAi == false && selectedReader)
      cost = bn(selectedReader.cost).plus(selectedReader.fee).toFormat();

    return (
      <div>
        <div>
          選擇{' '}
          <span className="text-text-primary">
            {selectedIsAi ? 'AI' : `塔羅師-${selectedReader?.nickname}`}
          </span>{' '}
          解牌，花費 <span className="text-text-primary">{cost}</span> 點，是否確認？
        </div>
        <div className="mt-3 flex justify-end gap-6">
          <Button appearance="secondary" onClick={() => setStep(1)}>
            回上一步
          </Button>
          <Button onClick={onConfirm}>確認</Button>
        </div>
      </div>
    );
  };

  return (
    <Modal open={open} handleClose={onClose} title="選擇解牌方式">
      <>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
      </>
    </Modal>
  );
};

export default ModalAskForReading;
