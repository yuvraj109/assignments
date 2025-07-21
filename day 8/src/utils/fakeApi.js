

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockOrders = [
  {
    id: 1,
    customer: 'ABC Corp',
    address: '123 Business St, City',
    items: [{ name: 'Laptop', qty: 5 }, { name: 'Mouse', qty: 10 }],
    status: 'pending',
    urgent: false,
    notes: 'Standard delivery',
    assignedTo: 'operator1',
    createdAt: new Date('2024-01-15').toISOString(),
    createdBy: 'admin',
  },
  {
    id: 2,
    customer: 'XYZ Ltd',
    address: '456 Commerce Ave, Town',
    items: [{ name: 'Monitor', qty: 3 }],
    status: 'processing',
    urgent: true,
    notes: 'Rush order - needed by Friday',
    assignedTo: 'operator1',
    createdAt: new Date('2024-01-16').toISOString(),
    createdBy: 'manager',
  },
  {
    id: 3,
    customer: 'DEF Inc',
    address: '789 Trade Blvd, Village',
    items: [{ name: 'Keyboard', qty: 8 }, { name: 'Headset', qty: 4 }],
    status: 'completed',
    urgent: false,
    notes: 'Regular shipment',
    assignedTo: 'operator2',
    createdAt: new Date('2024-01-14').toISOString(),
    createdBy: 'admin',
  },
];

export const mockSettings = {
  companyName: 'Omniful Logistics',
  address: '100 Logistics Way, Warehouse District',
  contact: '+1 (555) 123-4567',
  email: 'contact@omniful.com',
};

export const mockLogs = [
  {
    id: 1,
    action: 'Created Order',
    details: 'Order #1 created for ABC Corp',
    user: 'admin',
    timestamp: new Date('2024-01-15T10:30:00').toISOString(),
  },
  {
    id: 2,
    action: 'Updated Settings',
    details: 'Company contact information updated',
    user: 'admin',
    timestamp: new Date('2024-01-15T09:15:00').toISOString(),
  },
  {
    id: 3,
    action: 'Deleted Order',
    details: 'Order #5 deleted',
    user: 'manager',
    timestamp: new Date('2024-01-14T16:45:00').toISOString(),
  },
];

export const fetchOrders = async () => {
  await delay(800);
  
  try {
    const state = localStorage.getItem('omnifulState');
    if (state) {
      const parsedState = JSON.parse(state);
      if (parsedState.orders && parsedState.orders.orders && parsedState.orders.orders.length > 0) {
        return parsedState.orders.orders;
      }
    }
  } catch (err) {
    console.error('Error reading orders from localStorage:', err);
  }
  
  return mockOrders;
};

export const createOrder = async (orderData) => {
  await delay(1000);
  const newOrder = {
    ...orderData,
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    createdBy: 'current-user',
  };
  return newOrder;
};

export const updateOrder = async (id, orderData) => {
  await delay(800);
  return { ...orderData, id };
};

export const deleteOrder = async (id) => {
  await delay(500);
  return id;
};

export const fetchSettings = async () => {
  await delay(600);
  
 
  try {
    const state = localStorage.getItem('omnifulState');
    if (state) {
      const parsedState = JSON.parse(state);
      if (parsedState.settings) {
       
        const { status, ...settings } = parsedState.settings;
        return settings;
      }
    }
  } catch (err) {
    console.error('Error reading settings from localStorage:', err);
  }
  
  return mockSettings;
};

export const updateSettings = async (settingsData) => {
  await delay(800);
  return settingsData;
};

export const fetchLogs = async () => {
  await delay(700);
  
  try {
    const state = localStorage.getItem('omnifulState');
    if (state) {
      const parsedState = JSON.parse(state);
      if (parsedState.logs && parsedState.logs.logs && parsedState.logs.logs.length > 0) {
        return parsedState.logs.logs;
      }
    }
  } catch (err) {
    console.error('Error reading logs from localStorage:', err);
  }
  
  return mockLogs;
};

export const createLog = async (logData) => {
  await delay(300);
  const newLog = {
    ...logData,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  };
  return newLog;
};
