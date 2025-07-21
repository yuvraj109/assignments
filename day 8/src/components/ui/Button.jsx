
import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseClasses = 'font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-moss-600 text-black hover:bg-moss-700 focus:ring-moss-500 disabled:bg-moss-300',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-500 disabled:bg-slate-100',
    danger: 'bg-red-600 text-black hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
