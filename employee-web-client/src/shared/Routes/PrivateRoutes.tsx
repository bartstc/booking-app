import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Layout } from '../Layout';
import { Spinner } from '../Spinner';

import { LogoutCallback, Logout, Callback, SilentRenew } from './AuthRoutes';

const Booking = lazy(() => import('../../pages/Booking'));
const AddBooking = lazy(() => import('../../pages/AddBooking'));
const Customers = lazy(() => import('../../pages/Customers'));
const Employees = lazy(() => import('../../pages/Employees'));
const Offers = lazy(() => import('../../pages/Offers'));
const Schedules = lazy(() => import('../../pages/Schedules'));
const Schedule = lazy(() => import('../../pages/Schedule'));

const Dashboard = lazy(() => import('../../pages/Dashboard'));
const FacilitiesTab = lazy(() => import('../../pages/Dashboard/FacilitiesTab'));
const FacilityTab = lazy(() => import('../../pages/Dashboard/FacilityTab'));
const EditFacilityTab = lazy(() => import('../../pages/Dashboard/EditFacilityTab'));
const CreateFacilityTab = lazy(() => import('../../pages/Dashboard/CreateFacilityTab'));
const ReadEnterpriseTab = lazy(() => import('../../pages/Dashboard/EnterpriseTab'));
const EditEnterpriseTab = lazy(() => import('../../pages/Dashboard/EditEnterpriseTab'));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='bookings' element={<Booking />} />
        <Route path='add-booking' element={<AddBooking />} />
        <Route path='customers' element={<Customers />} />
        <Route path='employees' element={<Employees />} />
        <Route path='offers' element={<Offers />} />
        <Route path='schedules' element={<Schedules />} />
        <Route path='schedules/:scheduleId' element={<Schedule />} />

        <Route path='dashboard' element={<Dashboard />}>
          <Route path='enterprise/edit' element={<EditEnterpriseTab />} />
          <Route path='new-facility' element={<CreateFacilityTab />} />
          <Route path='facilities/:facilitySlug/edit' element={<EditFacilityTab />} />
          <Route path='facilities/:facilitySlug' element={<FacilityTab />} />
          <Route path='enterprise' element={<ReadEnterpriseTab />} />
          <Route path='facilities' element={<FacilitiesTab />} />
          <Route path='*' element={<Navigate to='enterprise' />} />
        </Route>

        <Route path='signin-oidc' element={<Callback />} />
        <Route path='logout' element={<Logout />} />
        <Route path='logout-callback' element={<LogoutCallback />} />
        <Route path='silentrenew' element={<SilentRenew />} />

        <Route path='*' element={<Navigate to={'dashboard/enterprise'} />} />
      </Routes>
    </Suspense>
  );
};

export { PrivateRoutes };
