import classNames from 'classnames';
import { useState } from 'react';
import Back from 'src/components/Back';
import Button from 'src/components/Button';
import H2 from 'src/components/typography/H2';
import H4 from 'src/components/typography/H4';
import { bnFormat } from 'src/utils/bignumber';
import useFetch from './useFetch';

const Deposit = () => {
  const { items, onCreateOrder } = useFetch();
  const [selectedItem, setSelectedItem] = useState<string>();

  return (
    <div className="mt-2 sm:mt-6">
      <Back />
      <H2 className="mt-2 mb-8">選擇儲值金額</H2>
      <div className="mb-10 flex flex-wrap gap-6">
        {items?.map((v) => (
          <div
            key={v.id}
            className={classNames(
              'flex w-[calc(50%-12px)] flex-col items-center justify-center rounded-lg border py-6 md:w-[calc((100%-64px)/3)] md:gap-8',
              {
                'border-border-focus bg-background-surface-list': selectedItem === v.id,
                'border-border-spread-normal': selectedItem !== v.id,
              },
            )}
            onClick={() => setSelectedItem(v.id)}
          >
            <H4>{bnFormat(v.amount)} 點</H4>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={() => onCreateOrder(selectedItem)}>下一步</Button>
      </div>
    </div>
  );
};

export default Deposit;
