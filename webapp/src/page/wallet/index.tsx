import classNames from 'classnames';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Pagination from 'src/components/Pagination';
import Table from 'src/components/Table';
import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import H3 from 'src/components/typography/H3';
import H4 from 'src/components/typography/H4';
import { BalanceTransactionType } from 'src/constant/backend/Balance';
import { Page } from 'src/constant/Page';
import useMediaQuery from 'src/hook/useMediaQuery';
import { GetUserTransactionResponse } from 'src/model/backend/api/User';
import { bn, bnFormat } from 'src/utils/bignumber';
import useFetch from './useFetch';

const Wallet = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { transactions, balance } = useFetch(page);
  const { isMobile } = useMediaQuery();

  const columnDepositPurchase = isMobile
    ? [
        {
          header: '儲值/消費',
          accessor: (row: GetUserTransactionResponse['data'][0]) => (
            <div>
              <Body size="m">
                {row.transactionType === BalanceTransactionType.DEPOSIT
                  ? bnFormat(row.amount)
                  : bn(row.amount).negated().toFormat()}
              </Body>
              <Body
                size="s"
                className={classNames({
                  'text-text-note-deposit': row.transactionType === BalanceTransactionType.DEPOSIT,
                  'text-text-note-spend': row.transactionType === BalanceTransactionType.PURCHASE,
                })}
              >
                {row.description}
              </Body>
            </div>
          ),
          className: 'text-right',
        },
      ]
    : [
        {
          header: '儲值',
          accessor: (row: GetUserTransactionResponse['data'][0]) => (
            <>
              {row.transactionType === BalanceTransactionType.DEPOSIT && (
                <div>
                  <Body size="m">{bnFormat(row.amount)}</Body>
                  <Body size="s" className="text-text-note-deposit">
                    {row.description}
                  </Body>
                </div>
              )}
            </>
          ),
          className: 'text-right',
        },
        {
          header: '消費',
          accessor: (row: GetUserTransactionResponse['data'][0]) => (
            <>
              {row.transactionType === BalanceTransactionType.PURCHASE && (
                <div>
                  <Body size="m">{bn(row.amount).negated().toFormat()}</Body>
                  <Body size="s" className="text-text-note-spend">
                    {row.description}
                  </Body>
                </div>
              )}
            </>
          ),
          className: 'text-right',
        },
      ];

  const columns = [
    {
      header: '時間',
      accessor: (row: GetUserTransactionResponse['data'][0]) => (
        <Body size="m">{format(row.transactedAt, 'yyyy/MM/dd HH:mm:ss')}</Body>
      ),
    },
    ...columnDepositPurchase,
    {
      header: '餘額',
      accessor: (row: GetUserTransactionResponse['data'][0]) => (
        <Body size="m">{bnFormat(row.balance)}</Body>
      ),
      className: 'text-right',
    },
  ];

  return (
    <>
      <H2 className="mt-10 mb-[26px] sm:mt-20">餘額與儲值</H2>
      <div className="mt-8 mb-20 flex items-center justify-between rounded-lg bg-background-surface-overlay-normal px-6 py-4">
        <H4>我的餘額：{bnFormat(balance)} 點</H4>
        <Button className="!px-6 !py-3 sm:!px-8 sm:!py-4" onClick={() => navigate(Page.Deposit)}>
          前往儲值
        </Button>
      </div>
      <H3 className="mb-6">儲值紀錄</H3>
      {transactions && (
        <Table data={transactions.data} columns={columns} rowKey={(row) => row.id} />
      )}
      {transactions && (
        <div className="mt-10">
          <Pagination
            page={page}
            totalPages={transactions.paginate.totalPages}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      )}
    </>
  );
};

export default Wallet;
