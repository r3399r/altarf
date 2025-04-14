import Button from 'src/components/Button';
import Table from 'src/components/Table';
import H2 from 'src/components/typography/H2';

const Records = () => {
  const records = [
    { id: '1', date: '2024/07/25', time: '16:19:03', item: '線上解牌' },
    { id: '2', date: '2024/07/25', time: '13:17:25', item: '線上解牌' },
    { id: '3', date: '2024/07/18', time: '22:05:35', item: '線上解牌' },
    { id: '4', date: '2024/07/15', time: '10:05:26', item: '線上解牌' },
    { id: '5', date: '2024/07/12', time: '12:52:32', item: '線上解牌' },
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
      accessor: () => <Button className="!px-4 !py-2">占卜結果</Button>,
      className: 'text-right',
    },
  ];

  return (
    <>
      <H2 className="mt-20 mb-[26px]">占卜結果</H2>
      <Table data={records} columns={columns} rowKey={(row) => row.id} />
    </>
  );
};

export default Records;
