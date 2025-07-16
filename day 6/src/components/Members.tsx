import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addMember } from "../features/MemberSlice";

const Members = () => {
    const [open, setOpen] = useState<Boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        position: ''
    });
    
    const members = useSelector((state: any) => state.member.members);
    const dispatch = useDispatch();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddMember = () => {
        const { name, age, position } = formData;
        
        if (name && age && position) {
            dispatch(addMember({ 
                id: Date.now(), 
                name, 
                age, 
                position 
            }));
            
            setFormData({
                name: '',
                age: '',
                position: ''
            });
            
            setOpen(false);
        }
    };

    return (
        <div>
            <div className="m-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Members</h1>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setOpen(true)}>Add Member</button>
            </div>
            
            <div className="m-4">
                <div className="bg-white rounded shadow">
                    {members.length === 0 ? (
                        <p className="p-4 text-gray-500 text-center">No members found. Add your first member!</p>
                    ) : (
                        <ul>
                            {members.map((member: any) => (
                                <li key={member.id} className="p-4 border-b flex justify-between items-center">
                                    <div className="flex w-full justify-between items-center">
                                        <span>
                                            <span className="font-semibold">{member.name}</span> ({member.position})
                                        </span>
                                        <div className="flex items-center space-x-3">
                                            <span>{member.age} years old</span>
                                            
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {open && (
                <Modal setOpen={setOpen}>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Add Member</h2>
                        
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="mb-2 p-2 border rounded" 
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Age" 
                            className="mb-2 p-2 border rounded" 
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Position" 
                            className="mb-2 p-2 border rounded" 
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                        />
                        
                        <button 
                            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
                            onClick={handleAddMember}
                        >
                            Add Member
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Members;