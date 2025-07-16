
const Modal = ({ setOpen, children }: { setOpen: any, children: any }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded shadow-lg relative">
                <button className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)}>
                    &times;
                </button>
                <div className="mt-4">
                    {children}  
                </div>
            </div>
        </div>
    )
}

export default Modal;