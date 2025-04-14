import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import Table from 'src/components/Table';
import H2 from 'src/components/typography/H2';
import { Page } from 'src/constant/Page';

const Records = () => {
  const navigate = useNavigate();

  const records = [
    {
      id: '12d02a76-bd93-47c1-8283-d1fb5c18fe8e',
      date: '2024/07/25',
      time: '16:19:03',
      item: '線上解牌',
    },
    {
      id: '2374285d-d217-43fc-9446-59fffc1c2519',
      date: '2024/07/25',
      time: '13:17:25',
      item: '線上解牌',
    },
    {
      id: '4c6c6041-bbb6-4080-a9de-f043f111ee2e',
      date: '2024/07/18',
      time: '22:05:35',
      item: '線上解牌',
    },
    {
      id: '4e722767-9c88-442e-bf70-a9c764b5e317',
      date: '2024/07/15',
      time: '10:05:26',
      item: '線上解牌',
    },
    {
      id: '563ef6ee-9921-42c6-89e7-273511b9e157',
      date: '2024/07/12',
      time: '12:52:32',
      item: '線上解牌',
    },
  ];

  const columns = [
    {
      header: '時間',
      accessor: (row: (typeof records)[0]) => `${row.date} ${row.time}`,
    },
    {
      header: '項目',
      accessor: (row: (typeof records)[0]) => row.item,
    },
    {
      accessor: (row: (typeof records)[0]) => (
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
      <Table data={records} columns={columns} rowKey={(row) => row.id} />
    </>
  );
};

export default Records;
