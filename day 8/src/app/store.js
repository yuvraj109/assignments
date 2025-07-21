
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from '../features/orders/ordersSlice';
import settingsReducer from '../features/settings/settingsSlice';
import usersReducer from '../features/users/usersSlice';
import logsReducer from '../features/logs/logsSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('omnifulState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};


const saveState = (state) => {
  try {
    
    const stateToSave = {
      orders: {
        orders: state.orders.orders,
        filters: state.orders.filters,
        status: 'idle',
      },
      settings: {
        ...state.settings,
        status: 'idle',
      },
      users: {
        user: state.users.user,
        isAuthenticated: state.users.isAuthenticated,
      },
      logs: {
        logs: state.logs.logs,
        filters: state.logs.filters,
        status: 'idle',
      },
    };
    
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('omnifulState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    settings: settingsReducer,
    users: usersReducer,
    logs: logsReducer,
  },
  preloadedState: persistedState,
});

let timeoutId = null;
store.subscribe(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  timeoutId = setTimeout(() => {
    const state = store.getState();
    // Only save state if the user is authenticated
    if (state.users && state.users.isAuthenticated) {
      saveState(state);
    }
  }, 500); 
});
