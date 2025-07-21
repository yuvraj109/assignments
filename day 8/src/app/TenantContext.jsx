
import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState('omniful-logistics');
  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}
