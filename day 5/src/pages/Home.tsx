import { useState } from "react";

import Accordion from "../components/Accordian"
import useLocalStorage from "../hooks/useLocalStorage";
import ModalComponent from "../components/ModalComponent";
import SideModal from "../components/SideModal";

import SearchTask from "../components/SearchTask";

const Tasks = [
    {   
        id: 1,
        title: "Task 1",
        content: "This is the content of Task 1. You can add more details here."
    },
    {
        id: 2,
        title: "Task 2",
        content: "This is the content of Task 2. You can add more details here."
    }
]

const Home =()=>{
    const [storedValue, setValue] = useLocalStorage('tasks', Tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<any>(null);
    const [newTask, setNewTask] = useState({ title: '', content: '' });

    const handleAddTask = () => {
        if (newTask.title.trim() && newTask.content.trim()) {
            const task = {
                id: Date.now(),
                title: newTask.title,
                content: newTask.content
            };
            setValue([...storedValue, task]);
            setNewTask({ title: '', content: '' });
            setIsModalOpen(false);
        }
    };

    const handleDeleteTask = (task: any) => {
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            const updatedTasks = storedValue.filter((task: any) => task.id !== taskToDelete.id);
            setValue(updatedTasks);
            setIsDeleteModalOpen(false);
            setTaskToDelete(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTask({ title: '', content: '' });
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
    };
    return (
        <div className="flex flex-col items-center h-full">
            <h2 className="text-2xl my-2 ">Task Manager</h2>
            <p className="text-xl my-2 mb-6 color-grey">This is your space.</p>
            <SearchTask storedValue={storedValue}/>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Add Task
            </button>

            <section>
                
                {storedValue.map((task: any) => (
                    <Accordion 
                        key={task.id}
                        title={task.title}
                        content={task.content}
                        onDelete={() => handleDeleteTask(task)}
                    />
                ))}
            </section>            
            <ModalComponent 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                children={
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4">Add New Task</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Title:
                            </label>
                            <input
                                type="text"
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter task title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Content:
                            </label>
                            <textarea
                                value={newTask.content}
                                onChange={(e) => setNewTask({...newTask, content: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md "
                                placeholder="Enter task content"
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTask}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                } 
            />

            <SideModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                title="Delete Task"
            >
                <div className="space-y-4">
                    {taskToDelete && (
                        <>
                            
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Task to be deleted:</h4>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Title: </span>
                                        <span className="text-sm text-gray-900">{taskToDelete.title}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Content: </span>
                                        <span className="text-sm text-gray-900">{taskToDelete.content}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    onClick={handleCloseDeleteModal}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteTask}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Delete Task
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </SideModal>

            
        </div>
    )
}

export default Home;