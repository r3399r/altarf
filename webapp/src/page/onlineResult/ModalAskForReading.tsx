import classNames from 'classnames';
import { useState } from 'react';
import IcSocialMediaFB from 'src/assets/ic-social-media-fb.svg';
import IcSocialMediaIG from 'src/assets/ic-social-media-ig.svg';
import IcSocialMediaThreads from 'src/assets/ic-social-media-threads.svg';
import IcSocialMediaYT from 'src/assets/ic-social-media-yt.svg';
import PicAvatarAi from 'src/assets/pic-avatar-ai.svg';
import PicAvatarHuman from 'src/assets/pic-avatar-human.svg';
import Modal from 'src/components/Modal';
import Body from 'src/components/typography/Body';
import { AI_COST } from 'src/constant/backend/Balance';
import { SocialMediaPlatform } from 'src/constant/backend/Reader';
import { Reader } from 'src/model/backend/entity/ReaderEntity';
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
  const [selectedIsAi, setSelectedIsAi] = useState<boolean>(true);

  const handleConfirm = () => {
    if (selectedIsAi) askAi();
    else if (selectedReader) askHuman(selectedReader.id, selectedReader.costPerReading);
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="選擇解牌方式"
      cancelText="取消"
      confirmText="下一步"
      handleConfirm={handleConfirm}
    >
      <div className="flex flex-col gap-4">
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
                  每次需花費 <span className="text-text-primary">{r.costPerReading}</span> 點
                </Body>
              </div>
              <Body>{r.bio}</Body>
              {r.social.length > 0 && (
                <div className="mt-1 flex gap-2">
                  {r.social.sort(compare('platform')).map((s) => {
                    switch (s.platform) {
                      case SocialMediaPlatform.FACEBOOK:
                        return (
                          <a href={s.url} target="_blank" rel="noreferrer">
                            <img key={s.id} src={IcSocialMediaFB} />
                          </a>
                        );
                      case SocialMediaPlatform.INSTAGRAM:
                        return (
                          <a href={s.url} target="_blank" rel="noreferrer">
                            <img key={s.id} src={IcSocialMediaIG} />
                          </a>
                        );
                      case SocialMediaPlatform.YOUTUBE:
                        return (
                          <a href={s.url} target="_blank" rel="noreferrer">
                            <img key={s.id} src={IcSocialMediaYT} />
                          </a>
                        );
                      case SocialMediaPlatform.THREADS:
                        return (
                          <a href={s.url} target="_blank" rel="noreferrer">
                            <img key={s.id} src={IcSocialMediaThreads} />
                          </a>
                        );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalAskForReading;
