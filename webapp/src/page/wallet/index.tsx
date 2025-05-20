import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ecpayEndpoint from 'src/api/ecpayEndpoint';
import Button from 'src/components/Button';
import Pagination from 'src/components/Pagination';
import Table from 'src/components/Table';
import H2 from 'src/components/typography/H2';
import H3 from 'src/components/typography/H3';
import H4 from 'src/components/typography/H4';
import { BalanceTransactionType } from 'src/constant/backend/Balance';
import { GetUserTransactionResponse } from 'src/model/backend/api/User';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';
import { bn, bnFormat } from 'src/utils/bignumber';
import useFetch from './useFetch';

const Wallet = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { result, balance } = useFetch(page);

  const onClick = () => {
    dispatch(startWaiting());
    ecpayEndpoint
      .getEcpayPayment({
        ecpayTradeItemId: '50e6e8fd-b1c8-4274-82e9-dbd3567ecf00',
        returnUrl: `${location.origin}/api/ecpay/notify`,
        // returnUrl: 'https://lookout-test.celestialstudio.net/api/ecpay/notify',
      })
      .then((r) => {
        // Create a temporary form element
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'; // ECPay endpoint
        form.target = '_blank';

        // Append all input fields to the form
        Object.keys(r.data).forEach((key) => {
          const typedKey = key as keyof typeof r.data;
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = key;
          hiddenInput.value = r.data[typedKey];
          form.appendChild(hiddenInput);
        });

        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  const columns = [
    {
      header: '時間',
      accessor: (row: GetUserTransactionResponse['data'][0]) =>
        format(row.transactedAt, 'yyyy/MM/dd HH:mm:ss'),
    },
    {
      header: '儲值',
      accessor: (row: GetUserTransactionResponse['data'][0]) =>
        row.transactionType === BalanceTransactionType.DEPOSIT ? bnFormat(row.amount) : '',
      className: 'text-right',
    },
    {
      header: '消費',
      accessor: (row: GetUserTransactionResponse['data'][0]) =>
        row.transactionType === BalanceTransactionType.PURCHASE
          ? bn(row.amount).negated().toFormat()
          : '',
      className: 'text-right',
    },
    {
      header: '餘額',
      accessor: (row: GetUserTransactionResponse['data'][0]) => bnFormat(row.balance),
      className: 'text-right',
    },
  ];

  return (
    <>
      <H2 className="mt-10 mb-[26px] sm:mt-20">餘額與儲值</H2>
      <div className="mt-8 mb-20 flex items-center justify-between rounded-lg bg-background-surface-overlay-normal px-6 py-4">
        <H4>我的餘額：{bnFormat(balance)} 點</H4>
        <Button className="!px-6 !py-3 sm:!px-8 sm:!py-4" onClick={onClick}>
          前往儲值
        </Button>
      </div>
      <H3 className="mb-6">儲值紀錄</H3>
      {result && <Table data={result.data} columns={columns} rowKey={(row) => row.id} />}
      {result && (
        <div className="mt-10">
          <Pagination
            page={page}
            totalPages={result.paginate.totalPages}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      )}
    </>
  );
};

export default Wallet;
