import { format } from 'date-fns';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IcBack from 'src/assets/ic-back.svg';
import Pagination from 'src/components/Pagination';
import Table from 'src/components/Table';
import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import { Page } from 'src/constant/Page';
import { GetTarotQuestionResponse } from 'src/model/backend/api/Tarot';
import useFetch from './useFetch';

const Records = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state as string | null;
  const [page, setPage] = useState(1);
  const { result } = useFetch(page, email);

  const columns = [
    {
      header: '時間',
      accessor: (row: GetTarotQuestionResponse['data'][0]) => (
        <Body size="m">{format(new Date(row.createdAt), 'yyyy/MM/dd HH:mm:ss')}</Body>
      ),
      className: '!w-1/3',
    },
    {
      header: '題目',
      accessor: (row: GetTarotQuestionResponse['data'][0]) => (
        <Body
          size="m"
          className="cursor-pointer underline"
          onClick={() => navigate(`${Page.Online}/${row.id}`)}
        >
          {row.question}
        </Body>
      ),
      className: '!w-2/3',
    },
  ];

  return (
    <>
      {email === null && <H2 className="mt-10 mb-6 sm:mt-20">占卜紀錄</H2>}
      {email !== null && (
        <div className="my-6">
          <div className="mb-8 flex cursor-pointer items-center" onClick={() => navigate(-1)}>
            <img src={IcBack}></img>
            <Body>回前頁</Body>
          </div>
          <Body bold>{email} 的提問</Body>
        </div>
      )}
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

export default Records;
