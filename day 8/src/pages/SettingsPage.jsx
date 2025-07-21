
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSettings } from '../features/settings/settingsSlice';
import { useAbility } from '../hooks/useAbility';
import { ACTIONS, SUBJECTS } from '../permissions/defineAbilities';
import SettingsForm from '../features/settings/SettingsForm';
import ProtectedRoute from '../components/ProtectedRoute';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const ability = useAbility();

  useEffect(() => {
    if (settings.status === 'idle' || settings.status === 'failed') {
      dispatch(loadSettings());
    }
  }, [settings.status, dispatch]);

  return (
    <div className="fade-in show space-y-6">
     
      <div>
        <h1 className="text-2xl font-bold text-moss-700">Company Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your company information and preferences
        </p>
      </div>

    
      <ProtectedRoute
        action={ACTIONS.READ}
        subject={SUBJECTS.SETTINGS}
        fallback={
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-slate-500">
              You don't have permission to view settings.
            </div>
          </div>
        }
      >
        <ProtectedRoute
          action={ACTIONS.UPDATE}
          subject={SUBJECTS.SETTINGS}
          fallback={
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Company Name</label>
                    <div className="mt-2 p-2 border border-slate-300 rounded-md bg-slate-50">
                      {settings.companyName}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email Address</label>
                    <div className="mt-2 p-2 border border-slate-300 rounded-md bg-slate-50">
                      {settings.email}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Company Address</label>
                  <div className="mt-2 p-2 border border-slate-300 rounded-md bg-slate-50">
                    {settings.address}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Contact Number</label>
                    <div className="mt-2 p-2 border border-slate-300 rounded-md bg-slate-50">
                      {settings.contact}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 text-center text-sm text-slate-500">
                  You have read-only access to settings. Contact an administrator to make changes.
                </div>
              </div>
            </div>
          }
        >
          <SettingsForm />
        </ProtectedRoute>
      </ProtectedRoute>

      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
        <h3 className="font-medium text-sky-800 mb-2">Settings Information</h3>
        <ul className="text-sm text-sky-700 space-y-1">
          <li>• Settings are saved automatically when you submit the form</li>
          <li>• Changes are tenant-specific and won't affect other organizations</li>
          <li>• Contact information is used for customer communications</li>
          <li>• Only administrators can edit company settings</li>
        </ul>
      </div>
    </div>
  );
}
