import H2 from 'src/components/typography/H2';

const Records = () => (
  // const records = [
  //   { date: '2024/07/25', time: '16:19:03', item: '線上解牌' },
  //   { date: '2024/07/25', time: '13:17:25', item: '線上解牌' },
  //   { date: '2024/07/18', time: '22:05:35', item: '線上解牌' },
  //   { date: '2024/07/15', time: '10:05:26', item: '線上解牌' },
  //   { date: '2024/07/12', time: '12:52:32', item: '線上解牌' },
  // ];

  <>
    <H2 className="mt-20">占卜結果</H2>
    {/* <div className="p-4">
        <div className="grid grid-cols-3 text-sm font-bold border-b border-gray-600 pb-2">
          <div>時間</div>
          <div>項目</div>
          <div></div>
        </div>
        {records.map((record, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center text-sm py-2 border-b border-gray-600"
          >
            <div>{`${record.date} ${record.time}`}</div>
            <div>{record.item}</div>
            <Button>
              占卜結果
            </Button>
          </div>
        ))}
      </div> */}
  </>
);
export default Records;
