import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Bar from './components/Bar';
import ErrorModal from './components/ErrorModal';
import { logout } from './service/authService';
import emitter from './utils/eventEmitter';

const AppLayout = () => {
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const handleSessionExpired = () => {
      logout();
      setErrorMsg('請於登入後再試一次');
      setErrorOpen(true);
    };

    // Attach the listener
    emitter.on('sessionExpired', handleSessionExpired);

    // Cleanup the listener on component unmount
    return () => {
      emitter.off('sessionExpired', handleSessionExpired);
    };
  });

  return (
    <>
      <Bar />
      <div className="mx-4 mb-20 sm:mx-10 md:mx-auto md:w-[900px]">
        <Outlet />
      </div>
      <ErrorModal open={errorOpen} errorMessage={errorMsg} onClose={() => setErrorOpen(false)} />
    </>
  );
};

export default AppLayout;
