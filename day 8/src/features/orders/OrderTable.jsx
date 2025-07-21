
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { removeOrder } from './ordersSlice';
import { addLog } from '../logs/logsSlice';
import { useAbility } from '../../hooks/useAbility';
import { ACTIONS, SUBJECTS } from '../../permissions/defineAbilities';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ProtectedRoute from '../../components/ProtectedRoute';
import EditOrderStatusModal from './EditOrderStatusModal';

export default function OrderTable({ onEditOrder }) {
  const dispatch = useDispatch();
  const ability = useAbility();
  const { orders, filters } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.users.user);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [orderToUpdateStatus, setOrderToUpdateStatus] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (user.role === 'operator' && order.assignedTo !== user.id) {
        return false;
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!order.customer.toLowerCase().includes(searchTerm) &&
            !order.address.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      
      if (filters.status && order.status !== filters.status) {
        return false;
      }
      
      if (filters.urgent !== '' && order.urgent !== (filters.urgent === 'true')) {
        return false;
      }
      
      return true;
    });
  }, [orders, filters, user.role, user.id]);

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.customer}</div>
          <div className="text-sm text-slate-500">{row.original.address}</div>
        </div>
      ),
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.items.map((item, index) => (
            <div key={index} className="text-sm">
              {item.name} (x{item.qty})
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            row.original.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            row.original.status === 'processing' ? 'bg-blue-100 text-blue-800' :
            row.original.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-slate-100 text-slate-800'
          }`}>
            {row.original.status}
          </span>
          <button
            onClick={() => {
              setOrderToUpdateStatus(row.original);
              setStatusModalOpen(true);
            }}
            className="text-xs text-slate-600 hover:text-moss-600 hover:underline"
          >
            Edit
          </button>
        </div>
      ),
    },
    {
      accessorKey: 'urgent',
      header: 'Priority',
      cell: ({ row }) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          row.original.urgent ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
        }`}>
          {row.original.urgent ? 'Urgent' : 'Normal'}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
         
          
          <ProtectedRoute
            action={ACTIONS.DELETE}
            subject={SUBJECTS.ORDER}
            resource={row.original}
          >
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setOrderToDelete(row.original);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </ProtectedRoute>
        </div>
      ),
    },
  ], [onEditOrder]);

  const table = useReactTable({
    data: filteredOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    
    try {
      await dispatch(removeOrder(orderToDelete.id)).unwrap();
      
      dispatch(addLog({
        action: 'Deleted Order',
        details: `Deleted order #${orderToDelete.id} for ${orderToDelete.customer}`,
        user: 'current-user',
      }));
      
      toast.success('Order deleted successfully!');
      setDeleteModalOpen(false);
      setOrderToDelete(null);
      
    } catch (error) {
      toast.error('Failed to delete order. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            
            <tbody className="bg-white divide-y divide-slate-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-slate-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              
              <span className="text-sm text-slate-700">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              
              <Button
                size="sm"
                variant="secondary"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
            
            <div className="text-sm text-slate-700">
              Showing {table.getRowModel().rows.length} of {filteredOrders.length} orders
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Delete"
        actions={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteOrder}
            >
              Delete Order
            </Button>
          </div>
        }
      >
        <p className="text-slate-600">
          Are you sure you want to delete order #{orderToDelete?.id} for{' '}
          <strong>{orderToDelete?.customer}</strong>? This action cannot be undone.
        </p>
      </Modal>

      {/* Edit Status Modal */}
      <EditOrderStatusModal
        order={orderToUpdateStatus}
        open={statusModalOpen}
        onClose={() => {
          setStatusModalOpen(false);
          setOrderToUpdateStatus(null);
        }}
      />
    </>
  );
}
