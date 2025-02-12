import { Outlet } from 'react-router-dom';
import Bar from './components/Bar';

const AppLayout = () => (
  <>
    <Bar />
    <div className="mx-4 sm:mx-10 md:mx-auto md:w-[900px]">
      <Outlet />
    </div>
  </>
);

export default AppLayout;
