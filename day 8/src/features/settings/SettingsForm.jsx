
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { saveSettings } from './settingsSlice';
import { addLog } from '../logs/logsSlice';
import { settingsSchema } from '../../schemas/settingsSchema';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function SettingsForm() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      companyName: settings.companyName,
      address: settings.address,
      contact: settings.contact,
      email: settings.email,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await dispatch(saveSettings(data)).unwrap();
      
      dispatch(addLog({
        action: 'Updated Settings',
        details: 'Company settings updated',
        user: 'current-user',
      }));
      
      toast.success('Settings saved successfully!');
      reset(data); // Reset form dirty state
      
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset({
      companyName: settings.companyName,
      address: settings.address,
      contact: settings.contact,
      email: settings.email,
    });
  };

  if (settings.status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-slate-600">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name *"
            {...register('companyName')}
            error={errors.companyName?.message}
            placeholder="Enter company name"
          />
          
          <Input
            label="Email Address *"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="contact@company.com"
          />
        </div>

        <Input
          label="Company Address *"
          {...register('address')}
          error={errors.address?.message}
          placeholder="Enter full company address"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Contact Number *"
            {...register('contact')}
            error={errors.contact?.message}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200">
          <div className="text-sm text-slate-500">
            {isDirty && "You have unsaved changes"}
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={!isDirty || isSubmitting}
            >
              Reset Changes
            </Button>
            
            <Button
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Saving...</span>
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
