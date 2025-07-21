
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store';
import { TenantProvider } from './TenantContext';
import Layout from './Layout';
import LoginPage from '../pages/LoginPage';
import OrdersPage from '../pages/OrdersPage';
import SettingsPage from '../pages/SettingsPage';
import LogsPage from '../pages/LogsPage';
import { login } from '../features/users/usersSlice';

function RequireAuth({ children }) {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const dispatch = useDispatch();
  
  useEffect(() => {
     try {
      const state = localStorage.getItem('omnifulState');
      if (state) {
        const parsedState = JSON.parse(state);
        if (parsedState.users && parsedState.users.isAuthenticated) {
          dispatch(login());
        }
      }
    } catch (err) {
      console.error('Error checking authentication from localStorage:', err);
    }
  }, [dispatch]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/orders" replace />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="logs" element={<LogsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <TenantProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TenantProvider>
    </Provider>
  );
}
