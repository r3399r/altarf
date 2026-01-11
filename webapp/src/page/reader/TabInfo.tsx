import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import tarotReaderEndpoint from 'src/api/tarotReaderEndpoint';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Textarea from 'src/components/Textarea';
import Body from 'src/components/typography/Body';
import { SocialMediaPlatform } from 'src/constant/backend/Reader';
import { RootState } from 'src/redux/store';
import { finishWaiting, setErrorMessage, setUser, startWaiting } from 'src/redux/uiSlice';
import { bn } from 'src/utils/bignumber';

type FormData = {
  nickname: string;
  bio: string;
  facebook: string;
  instagram: string;
  youtube: string;
  threads: string;
  email: string;
  website: string;
  costPerReading: number;
};

const TabInfo = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const { user } = useSelector((rootState: RootState) => rootState.ui);
  const dispatch = useDispatch();

  const costPerReading = bn(watch('costPerReading'));
  const preFee = costPerReading.times(0.05).dp(0, 4);
  const fee = preFee.lt(5) ? bn(5) : preFee;
  const total = costPerReading.plus(fee);

  const onSubmit = (data: FormData) => {
    if (!user?.reader?.id) return;
    dispatch(startWaiting());
    const social = [];
    if (data.facebook) social.push({ platform: SocialMediaPlatform.FACEBOOK, url: data.facebook });
    if (data.instagram)
      social.push({ platform: SocialMediaPlatform.INSTAGRAM, url: data.instagram });
    if (data.youtube) social.push({ platform: SocialMediaPlatform.YOUTUBE, url: data.youtube });
    if (data.threads) social.push({ platform: SocialMediaPlatform.THREADS, url: data.threads });
    if (data.email) social.push({ platform: SocialMediaPlatform.EMAIL, url: data.email });
    if (data.website) social.push({ platform: SocialMediaPlatform.WEBSITE, url: data.website });
    const paylaod = {
      nickname: data.nickname,
      bio: data.bio,
      social,
      costPerReading: Number(data.costPerReading),
    };
    tarotReaderEndpoint
      .putTarotReaderId(user.reader.id, paylaod)
      .then((res) => {
        dispatch(
          setUser({
            ...user,
            reader: res.data,
          }),
        );
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  useEffect(() => {
    if (user !== null) {
      setValue('nickname', user.reader?.nickname || '');
      setValue('bio', user.reader?.bio || '');
      setValue('costPerReading', user.reader?.costPerReading || 0);
      const social = user.reader?.social || [];
      setValue(
        'facebook',
        social.find((s) => s.platform === SocialMediaPlatform.FACEBOOK)?.url || '',
      );
      setValue(
        'instagram',
        social.find((s) => s.platform === SocialMediaPlatform.INSTAGRAM)?.url || '',
      );
      setValue(
        'youtube',
        social.find((s) => s.platform === SocialMediaPlatform.YOUTUBE)?.url || '',
      );
      setValue(
        'threads',
        social.find((s) => s.platform === SocialMediaPlatform.THREADS)?.url || '',
      );
      setValue('email', social.find((s) => s.platform === SocialMediaPlatform.EMAIL)?.url || '');
      setValue(
        'website',
        social.find((s) => s.platform === SocialMediaPlatform.WEBSITE)?.url || '',
      );
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input label="顯示名稱" {...register('nickname')} />
        <Textarea
          label="自我介紹"
          placeholder="請介紹您的塔羅經驗、專長領域、解牌風格..."
          className="h-30"
          {...register('bio')}
        />
      </div>
      <div className="my-6 h-px bg-border-divider-sub"></div>
      <Body bold>社群連結</Body>
      <div className="mt-4 flex flex-col gap-4">
        <Input label="Facebook" {...register('facebook')} />
        <Input label="Instagram" {...register('instagram')} />
        <Input label="YouTube" {...register('youtube')} />
        <Input label="Threads" {...register('threads')} />
        <Input label="E-mail" {...register('email')} />
        <Input label="個人網站" {...register('website')} />
      </div>
      <div className="my-6 h-px bg-border-divider-sub"></div>
      <Body bold>解牌費用</Body>
      <Body size="m" className="my-4">
        使用者實際解牌的費用會額外加上 5% 的手續費。僅支援整數
      </Body>
      <Input inputMode="decimal" type="number" {...register('costPerReading')} />
      <Body size="s" className="mt-1 text-text-input-helper">
        手續費：NTD${fee.toFormat()}
      </Body>
      <Body size="s" className="text-text-input-helper">
        實際費用：NTD${total.toFormat()}
      </Body>
      <div className="mt-10 flex justify-center">
        <Button type="submit">儲存</Button>
      </div>
    </form>
  );
};

export default TabInfo;
