
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { orderSchema } from '../../schemas/orderSchema';
import { saveOrder } from './ordersSlice';
import { addLog } from '../logs/logsSlice';
import { useFormDraft } from '../../hooks/useFormDraft';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function OrderForm({ order, open, onClose }) {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!order;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: order || {
      customer: '',
      address: '',
      items: [{ name: '', qty: 1 }],
      urgent: false,
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedValues = watch();
  const isUrgent = watch('urgent');

  useFormDraft('order-form-draft', watchedValues, setValue);

  useEffect(() => {
    if (!open) {
      localStorage.removeItem('order-form-draft');
      reset();
      setCurrentStep(1);
    }
  }, [open, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
 
      await dispatch(saveOrder(data)).unwrap();
      
      dispatch(addLog({
        action: isEditing ? 'Updated Order' : 'Created Order',
        details: `${isEditing ? 'Updated' : 'Created'} order for ${data.customer}`,
        user: 'current-user',
      }));
      
      toast.success(
        isEditing ? 'Order updated successfully!' : 'Order created successfully!'
      );
      
      localStorage.removeItem('order-form-draft');
      onClose();
      reset();
      
    } catch (error) {
      toast.error('Failed to save order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const stepTitles = [
    'Customer Information',
    'Order Items',
    'Additional Details',
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Customer Name *"
              {...register('customer')}
              error={errors.customer?.message}
              placeholder="Enter customer name"
            />
            
            <Textarea
              label="Delivery Address *"
              {...register('address')}
              error={errors.address?.message}
              placeholder="Enter full delivery address"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-moss-700">Order Items</h4>
              <Button
                type="button"
                size="sm"
                onClick={() => append({ name: '', qty: 1 })}
              >
                Add Item
              </Button>
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-start">
                <div className="flex-1">
                  <Input
                    label={index === 0 ? "Item Name *" : ""}
                    {...register(`items.${index}.name`)}
                    error={errors.items?.[index]?.name?.message}
                    placeholder="Item name"
                  />
                </div>
                
                <div className="w-24">
                  <Input
                    label={index === 0 ? "Qty *" : ""}
                    type="number"
                    min="1"
                    {...register(`items.${index}.qty`, { valueAsNumber: true })}
                    error={errors.items?.[index]?.qty?.message}
                  />
                </div>
                
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => remove(index)}
                    className="mt-7"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            
            {errors.items?.message && (
              <p className="text-sm text-red-600">{errors.items.message}</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Controller
                name="urgent"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id="urgent"
                    className="w-4 h-4 text-moss-600 border-slate-300 rounded focus:ring-moss-500"
                    {...field}
                  />
                )}
              />
              <label htmlFor="urgent" className="text-sm font-medium text-moss-700">
                Mark as Urgent Order
              </label>
            </div>
            
            <Textarea
              label={isUrgent ? "Notes (Required for urgent orders) *" : "Notes"}
              {...register('notes')}
              error={errors.notes?.message}
              placeholder="Additional notes or special instructions"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${isEditing ? 'Edit' : 'Create'} Order - Step ${currentStep} of 3`}
      actions={
        <div className="flex justify-between w-full">
          <div>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
              >
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Order' : 'Create Order'}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                index + 1 === currentStep
                  ? 'text-moss-600 font-medium'
                  : index + 1 < currentStep
                  ? 'text-moss-400'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm ${
                  index + 1 === currentStep
                    ? 'bg-moss-600 text-black'
                    : index + 1 < currentStep
                    ? 'bg-moss-400 text-black'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-xs">{title}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {renderStep()}
      </form>
    </Modal>
  );
}
