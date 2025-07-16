import { useState } from 'react';

interface AccordionProps {
    title: string;
    content: string;
    onDelete?: () => void;
}

const Accordion = ({ title, content, onDelete }: AccordionProps) => {
    const [show, setshow] = useState(false);

    return (
        <div className=" min-w-sm max-w-md mx-auto mb-4">
            <div className="border border-gray-200 rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                    <div className="flex items-center justify-between py-4 px-6">
                        <button
                            className="flex-1 text-left focus:outline-none"
                            onClick={() => setshow(!show)}
                        >
                            <h2 className="text-lg font-semibold">{title}</h2>
                        </button>
                        
                        <div className="flex items-center space-x-2">
                            <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setshow(!show)}
                            >
                                <svg 
                                    className={`w-5 h-5 transform transition-transform duration-200 ${show ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            {onDelete && (
                                <button
                                    className="text-red-500 hover:text-red-700 focus:outline-none p-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete();
                                    }}
                                    title="Delete task"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                
                {show && (
                    <div className="p-6 bg-gray-50">
                        <p className="text-gray-700">{content}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Accordion;