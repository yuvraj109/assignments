
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserRole, setTenant, setUserId, login } from '../features/users/usersSlice';
import { ROLES } from '../permissions/defineAbilities';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const tenants = [
  { id: 'omniful-logistics', name: 'Omniful Logistics' },
];

const userOptions = [
  { id: 'admin1', name: 'Admin User', role: ROLES.ADMIN },
  { id: 'manager1', name: 'Manager User', role: ROLES.MANAGER },
  { id: 'operator1', name: 'Operator User', role: ROLES.OPERATOR },
];

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  useEffect(() => {

    if (isAuthenticated) {
      navigate('/orders');
    }
    

    if (!isAuthenticated) {
      dispatch(setUserId(userOptions[0].id));
      dispatch(setUserRole(userOptions[0].role));
      dispatch(setTenant(tenants[0].id));
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleLogin = () => {
    dispatch(login());
    navigate('/orders');
  };

  const handleUserChange = (e) => {
    const selectedUser = userOptions.find(u => u.id === e.target.value);
    if (selectedUser) {
      dispatch(setUserId(selectedUser.id));
      dispatch(setUserRole(selectedUser.role));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-moss-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-moss-700 mb-2">Omniful Logistics</h1>
          <p className="text-slate-600">Multi-tenant Dashboard</p>
        </div>

        <div className="space-y-4">
          <Select
            label="Select Tenant"
            value={user.tenant}
            onChange={e => dispatch(setTenant(e.target.value))}
          >
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </Select>

          <Select
            label="Login as User"
            value={user.id}
            onChange={handleUserChange}
          >
            {userOptions.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </Select>

          <div className="pt-4">
            <Button 
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white hover:bg-moss-700 transition-colors"
              size="lg"
            >
              Login to Dashboard
            </Button>
          </div>

          <div className="text-center text-sm text-slate-500 mt-4">
            <p>Demo Mode - No real authentication required</p>
            <p>Switch roles to test different permission levels</p>
          </div>
        </div>
      </div>
    </div>
  );
}
