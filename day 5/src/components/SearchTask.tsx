import React, { useState, useEffect } from 'react';

const SearchTask = ({ storedValue }: { storedValue: any[] }) => {


    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredTasks(storedValue);
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = storedValue.filter(task =>
                task.title.toLowerCase().includes(lowerCaseSearchTerm)
            );
            setFilteredTasks(filtered);
        }
    }, [searchTerm, storedValue]);

    return (
        <div className="w-full max-w-md mx-auto mb-4 relative">
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            { searchTerm && (
            <ul className="p-2 border absolute bg-white shadow-lg rounded mt-2 w-full max-h-60 overflow-y-auto">
                {filteredTasks.length>0 ? filteredTasks.map(task => (
                    <li key={task.id} className="p-2 border-b border-gray-200">
                        <h3 className="font-semibold">{task.title}</h3>
                    </li>
                )): <li className="p-2 text-gray-500">No tasks found</li>}
            </ul>
            )}
        </div>
    );
}


export default SearchTask;