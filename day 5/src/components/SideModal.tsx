


interface SideModalPrps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SideModal = ({ isOpen, onClose, title, children }: SideModalPrps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-60`}>
        <div className="flex flex-col h-full">
         
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
            >
            
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideModal;