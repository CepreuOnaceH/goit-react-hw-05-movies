import Home from '../Home/Home';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { BallTriangle } from 'react-loader-spinner';
const Layout = () => {
  return (
    <Suspense
      fallback={
        <h1>
          <BallTriangle />
        </h1>
      }
    >
      <Home />
      <Outlet />
    </Suspense>
  );
};

export default Layout;
