
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLogs, setLogFilters, clearLogFilters } from '../features/logs/logsSlice';
import { useAbility } from '../hooks/useAbility';
import { ACTIONS, SUBJECTS } from '../permissions/defineAbilities';
import LogsTable from '../features/logs/LogsTable';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/ProtectedRoute';

export default function LogsPage() {
  const dispatch = useDispatch();
  const { logs, status, filters } = useSelector((state) => state.logs);
  const ability = useAbility();

  useEffect(() => {
    if (status === 'idle' || (logs.length === 0 && status !== 'loading')) {
      dispatch(loadLogs());
    }
  }, [status, dispatch, logs.length]);

  const handleFilterChange = (filterName, value) => {
    dispatch(setLogFilters({ [filterName]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearLogFilters());
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-slate-600">Loading audit logs...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to load audit logs</div>
        <Button onClick={() => dispatch(loadLogs())}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <ProtectedRoute
      action={ACTIONS.READ}
      subject={SUBJECTS.LOG}
      fallback={
        <div className="text-center py-12">
          <div className="text-slate-500 mb-4">
            You don't have permission to view audit logs.
          </div>
        </div>
      }
    >
      <div className="fade-in show space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-moss-700">Audit Logs</h1>
          <p className="text-slate-600 mt-1">
            Track all user actions and system events
          </p>
        </div>

        {/* Logs Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-moss-600">{logs.length}</div>
            <div className="text-slate-600">Total Events</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {logs.filter(log => log.action.includes('Created') || log.action.includes('Updated')).length}
            </div>
            <div className="text-slate-600">Modifications</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">
              {logs.filter(log => log.action.includes('Deleted')).length}
            </div>
            <div className="text-slate-600">Deletions</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Search Action"
              placeholder="Search by action type..."
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
            />
            
            <Input
              label="Search User"
              placeholder="Search by username..."
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            />
            
            <Select
              label="Date Range"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </Select>
            
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <LogsTable />

        {/* Information Panel */}
        <div className="bg-moss-50 border border-moss-200 rounded-lg p-4">
          <h3 className="font-medium text-moss-800 mb-2">Audit Log Information</h3>
          <ul className="text-sm text-moss-700 space-y-1">
            <li>• All user actions are automatically logged with timestamps</li>
            <li>• Logs include user identification and detailed action descriptions</li>
            <li>• Use filters to find specific events or time periods</li>
            <li>• Logs are sorted by newest events first</li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}
