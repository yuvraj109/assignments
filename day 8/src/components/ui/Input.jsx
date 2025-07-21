
import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-moss-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-moss-500 focus:border-moss-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
