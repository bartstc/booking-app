import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Spinner } from '../Spinner';
import { Callback, Logout, LogoutCallback, SilentRenew } from './AuthRoutes';

const Home = lazy(() => import('../../pages/Home'));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='home' element={<Home />} />

        <Route path='signin-oidc' element={<Callback />} />
        <Route path='logout' element={<Logout />} />
        <Route path='logout-callback' element={<LogoutCallback />} />
        <Route path='silentrenew' element={<SilentRenew />} />

        <Route path='*' element={<Navigate to={'home'} />} />
      </Routes>
    </Suspense>
  );
};

export { PublicRoutes };
