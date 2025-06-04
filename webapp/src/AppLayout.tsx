import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Bar from './components/Bar';
import ModalError from './components/ModalError';
import Snackbar from './components/Snackbar';
import { logout } from './service/authService';
import emitter from './utils/eventEmitter';

const AppLayout = () => {
  useEffect(() => {
    const handleSessionExpired = () => {
      logout();
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
      <ModalError />
      <Snackbar />
    </>
  );
};

export default AppLayout;
