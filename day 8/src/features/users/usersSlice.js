
import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from '../../permissions/defineAbilities';

const initialState = {
  user: {
    id: 'admin1',
    name: 'Demo User',
    role: ROLES.ADMIN,
    tenant: 'omniful-logistics',
  },
  isAuthenticated: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserRole(state, action) {
      state.user.role = action.payload;
    },
    setTenant(state, action) {
      state.user.tenant = action.payload;
    },
    setUserId(state, action) {
      state.user.id = action.payload;
    },
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {
        id: '',
        name: '',
        role: '',
        tenant: '',
      };
    },
  },
});

export const { setUserRole, setTenant, setUserId, login, logout } = usersSlice.actions;
export default usersSlice.reducer;
