import React from 'react';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30">
            <div className="bg-white p-5 rounded shadow-lg ">
                <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default ModalComponent;