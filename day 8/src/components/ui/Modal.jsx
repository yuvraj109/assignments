
import React from 'react';
import Button from './Button';

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-moss-700">{title}</h3>
        </div>
        
        <div className="px-6 py-4">
          {children}
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3">
          {actions || (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
