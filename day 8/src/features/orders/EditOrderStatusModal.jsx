
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveOrder } from './ordersSlice';
import { addLog } from '../logs/logsSlice';
import toast from 'react-hot-toast';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

export default function EditOrderStatusModal({ order, open, onClose }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(order?.status || 'pending');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  React.useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleSubmit = async () => {
    if (!order) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedOrder = {
        ...order,
        status,
        updatedAt: new Date().toISOString(),
      };
      
      await dispatch(saveOrder(updatedOrder)).unwrap();
      
      // Log the action
      dispatch(addLog({
        action: 'Updated Order Status',
        details: `Changed order #${order.id} status to ${status}`,
        user: 'current-user',
      }));
      
      toast.success('Order status updated successfully!');
      onClose();
      
    } catch (error) {
      toast.error('Failed to update order status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Update Order Status"
      actions={
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            Update Status
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-600 mb-2">
            Order #{order.id} - {order.customer}
          </p>
          <p className="font-medium">Current Status: 
            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
              order.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-slate-100 text-slate-800'
            }`}>
              {order.status}
            </span>
          </p>
        </div>
        
        <Select
          label="New Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
    </Modal>
  );
}
