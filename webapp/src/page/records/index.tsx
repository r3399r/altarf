import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Pagination from 'src/components/Pagination';
import Table from 'src/components/Table';
import Body from 'src/components/typography/Body';
import H2 from 'src/components/typography/H2';
import { Page } from 'src/constant/Page';
import { GetTarotQuestionResponse } from 'src/model/backend/api/Tarot';
import useFetch from './useFetch';

const Records = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { result } = useFetch(page);

  const columns = [
    {
      header: '時間',
      accessor: (row: GetTarotQuestionResponse['data'][0]) => (
        <Body size="m">{format(new Date(row.createdAt), 'yyyy/MM/dd HH:mm:ss')}</Body>
      ),
    },
    {
      header: '牌陣',
      accessor: (row: GetTarotQuestionResponse['data'][0]) => (
        <Body size="m">{row.spread.name}</Body>
      ),
    },
    {
      header: '問題',
      accessor: (row: GetTarotQuestionResponse['data'][0]) => <Body size="m">{row.question}</Body>,
    },
    {
      accessor: (row: GetTarotQuestionResponse['data'][0]) => (
        <Button className="!px-4 !py-2" onClick={() => navigate(`${Page.Online}/${row.id}`)}>
          占卜結果
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <>
      <H2 className="mt-10 mb-[26px] sm:mt-20">占卜紀錄</H2>
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
