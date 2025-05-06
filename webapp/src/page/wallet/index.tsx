import { useDispatch } from 'react-redux';
import ecpayEndpoint from 'src/api/ecpayEndpoint';
import Button from 'src/components/Button';
import Table from 'src/components/Table';
import H2 from 'src/components/typography/H2';
import H3 from 'src/components/typography/H3';
import H4 from 'src/components/typography/H4';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';

const Wallet = () => {
  const dispatch = useDispatch();
  const balance = 100; // Current balance
  const records = [
    { id: '1', date: '2024/07/25 16:19:03', deposit: 40, balance: 100 },
    { id: '2', date: '2024/07/25 13:17:25', expense: 20, balance: 60 },
    { id: '3', date: '2024/07/18 22:05:35', expense: 150, balance: 80 },
    { id: '4', date: '2024/07/15 10:05:26', expense: 20, balance: 230 },
    { id: '5', date: '2024/07/12 12:52:32', deposit: 250, balance: 250 },
    { id: '6', date: '2024/07/08 13:17:25', expense: 20, balance: 60 },
    { id: '7', date: '2024/07/05 22:05:35', expense: 150, balance: 80 },
    { id: '8', date: '2024/07/02 10:05:26', expense: 20, balance: 230 },
  ];

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
      .catch((error) => {
        console.error('Error fetching ecpayHtml:', error);
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  const columns = [
    { header: '時間', accessor: (row: (typeof records)[0]) => row.date },
    {
      header: '儲值',
      accessor: (row: (typeof records)[0]) => row.deposit,
      className: 'text-right',
    },
    {
      header: '消費',
      accessor: (row: (typeof records)[0]) => row.expense,
      className: 'text-right',
    },
    {
      header: '餘額',
      accessor: (row: (typeof records)[0]) => row.balance,
      className: 'text-right',
    },
  ];

  return (
    <>
      <H2 className="mt-10 mb-[26px] sm:mt-20">餘額與儲值</H2>
      <div className="mt-8 mb-20 flex items-center justify-between rounded-lg bg-background-surface-overlay-normal px-6 py-4">
        <H4>我的餘額：NT${balance}</H4>
        <Button className="!px-6 !py-3 sm:!px-8 sm:!py-4" onClick={onClick}>
          前往儲值
        </Button>
      </div>
      <H3 className="mb-6">儲值紀錄</H3>
      <Table data={records} columns={columns} rowKey={(row) => row.id} />

      {/* Pagination */}
      {/* <div className="flex justify-center items-center mt-6">
        <button className="px-3 py-1 mx-1 bg-secondary text-white rounded-full hover:bg-secondary-dark">
          1
        </button>
        <button className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">
          2
        </button>
        <button className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">
          3
        </button>
        <span className="px-3 py-1 mx-1 text-gray-500">...</span>
        <button className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">
          10
        </button>
      </div> */}
    </>
  );
};

export default Wallet;
