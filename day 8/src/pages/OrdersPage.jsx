
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, setFilters, clearFilters } from '../features/orders/ordersSlice';
import { useAbility } from '../hooks/useAbility';
import { ACTIONS, SUBJECTS } from '../permissions/defineAbilities';
import OrderForm from '../features/orders/OrderForm';
import OrderTable from '../features/orders/OrderTable';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/ProtectedRoute';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const ability = useAbility();
  const { orders, status, filters } = useSelector((state) => state.orders);
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Load orders on component mount
  useEffect(() => {
    if (status === 'idle' || (orders.length === 0 && status !== 'loading')) {
      dispatch(loadOrders());
    }
  }, [status, dispatch, orders.length]);

  const handleCreateOrder = () => {
    setEditingOrder(null);
    setFormOpen(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingOrder(null);
  };

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-slate-600">Loading orders...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to load orders</div>
        <Button onClick={() => dispatch(loadOrders())}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="fade-in show space-y-6">
    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-moss-700">Orders Management</h1>
          <p className="text-slate-600 mt-1">
            Manage and track customer orders
          </p>
        </div>
        
       
        {console.log('Can create order?', ability.can(ACTIONS.CREATE, SUBJECTS.ORDER))}
        
        <ProtectedRoute
          action={ACTIONS.CREATE}
          subject={SUBJECTS.ORDER}
        >
          <Button onClick={handleCreateOrder} className='underline-offset-4 hover:underline'>
            Create New Order
          </Button>
        </ProtectedRoute>
      </div>

     
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Search"
            placeholder="Search by customer or address..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </Select>
          
          <Select
            label="Priority"
            value={filters.urgent}
            onChange={(e) => handleFilterChange('urgent', e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="true">Urgent</option>
            <option value="false">Normal</option>
          </Select>
          
          <div className="flex items-center">
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

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-moss-600">{orders.length}</div>
          <div className="text-slate-600">Total Orders</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'pending').length}
          </div>
          <div className="text-slate-600">Pending</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'processing').length}
          </div>
          <div className="text-slate-600">Processing</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'completed').length}
          </div>
          <div className="text-slate-600">Completed</div>
        </div>
      </div>

      
      <OrderTable onEditOrder={handleEditOrder} />

     
      <OrderForm
        order={editingOrder}
        open={formOpen}
        onClose={handleCloseForm}
      />
    </div>
  );
}
