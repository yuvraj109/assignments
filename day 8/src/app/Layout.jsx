
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/users/usersSlice';
import { useTenant } from './TenantContext';
import { useAbility } from '../hooks/useAbility';
import { ACTIONS, SUBJECTS } from '../permissions/defineAbilities';
import { clearLocalStorage } from '../utils/storageUtils';
import Button from '../components/ui/Button';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const { tenant } = useTenant();
  const ability = useAbility();

  const handleLogout = () => {
    dispatch(logout());
  
    clearLocalStorage();
    navigate('/login');
  };

  const navigation = [
    {
      name: 'Orders',
      path: '/orders',
      action: ACTIONS.READ,
      subject: SUBJECTS.ORDER,
    },
    {
      name: 'Settings',
      path: '/settings',
      action: ACTIONS.READ,
      subject: SUBJECTS.SETTINGS,
    },
    {
      name: 'Audit Logs',
      path: '/logs',
      action: ACTIONS.READ,
      subject: SUBJECTS.LOG,
    },
  ];

  return (
    <div className="min-h-screen flex bg-sky-50">
    
      <aside className="w-64 bg-white shadow-md fixed h-full z-10 overflow-y-auto">
        <div className="py-6 px-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-black mb-6">Omniful Logistics</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.path} className='underline-offset-4 hover:underline'>
            
              {console.log('Navigation item:', item.name, 'Can access?', ability.can(item.action, item.subject))}
              
              <Link
                to={item.path}
                className="block py-3 px-4 rounded-lg text-black hover:bg-moss-50 hover:text-moss-700 transition-colors"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </aside>
      
      <div className="flex-1 flex flex-col ml-64">
       
        <header className=" text-black shadow-lg">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-black font-bold text-xl">
                Dashboard
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-black">
                
                <span className="capitalize">{user.role}</span>
               
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

       
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
