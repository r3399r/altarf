import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ecpayEndpoint from 'src/api/ecpayEndpoint';
import { GetECPayItemsResponse } from 'src/model/backend/api/ECPay';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFetch = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<GetECPayItemsResponse>();

  useEffect(() => {
    dispatch(startWaiting());
    ecpayEndpoint
      .getEcpayItems()
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [dispatch]);

  const onCreateOrder = (ecpayTradeItemId?: string) => {
    if (!ecpayTradeItemId) return;

    dispatch(startWaiting());
    ecpayEndpoint
      .getEcpayPayment({
        ecpayTradeItemId,
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

  return { items, onCreateOrder };
};

export default useFetch;
