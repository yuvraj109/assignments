import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTeam, removeTeam, addMemberToTeam } from "../features/TeamSlice";

const Teams = () => {
    const [open, setOpen] = useState<Boolean>(false);
    const [memberModalOpen, setMemberModalOpen] = useState<Boolean>(false);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [teamName, setTeamName] = useState<string>('');
    const [selectedMemberId, setSelectedMemberId] = useState<string>('');
    
    const teams = useSelector((state: any) => state.team.teams);
    const members = useSelector((state: any) => state.member.members);

    const dispatch = useDispatch();

    const handleAddMember = (teamId: number) => {
        setSelectedTeamId(teamId);
        setMemberModalOpen(true);
    };

    const getAvailableMembers = () => {
        if (!selectedTeamId) return members;
        
        const selectedTeam = teams.find((team: any) => team.id === selectedTeamId);
        if (!selectedTeam) return members;
        
        return members.filter((member: any) => 
            !selectedTeam.members.some((teamMember: any) => teamMember.id === member.id)
        );
    };

    const handleAddTeam = () => {
        if (teamName.trim()) {
            dispatch(addTeam({ 
                id: Date.now(), 
                name: teamName,
                members: []
            }));
            setTeamName('');
            setOpen(false);
        }
    };

    const handleAddMemberToTeam = () => {
        const memberId = parseInt(selectedMemberId);
        
        if (memberId && selectedTeamId) {
            const selectedMember = members.find((member: any) => member.id === memberId);
            if (selectedMember) {
                dispatch(addMemberToTeam({ 
                    teamId: selectedTeamId,
                    member: {
                        id: selectedMember.id,
                        name: selectedMember.name
                    }
                }));
                setMemberModalOpen(false);
                setSelectedTeamId(null);
                setSelectedMemberId('');
            }
        }
    };

    return (
        <div>
            <div className="m-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Teams</h1>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setOpen(true)}>Add Team</button>
            </div>
            



            <div className="m-4">
                <div className="bg-white rounded shadow">
                    {teams.length === 0 ? (
                        <p className="p-4 text-gray-500 text-center">No teams found. Create your first team!</p>
                    ) : (
                        <div className="space-y-4 p-4">
                            {teams.map((team: any) => (
                                
                                <div key={team.id} className="border rounded p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xl font-semibold">{team.name}</h3>
                                        <div className=" flex flex-col gap-1">
                                            <button 
                                                className="bg-green-800 text-white px-3 py-1 rounded "
                                                onClick={() => handleAddMember(team.id)}
                                            >
                                                Add Member
                                            </button>
                                            <button 
                                                className="bg-red-800 text-white px-3 py-1 rounded" 
                                                onClick={() => dispatch(removeTeam({ id: team.id }))}
                                            >
                                                Remove Team
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium mb-2">Members ({team.members.length}):</h4>
                                        {team.members.length === 0 ? (
                                            <p className="text-gray-500 text-sm">No members in this team</p>
                                        ) : (
                                            <ul className="space-y-1">
                                                {team.members.map((member: any) => (
                                                    <li key={member.id} className="bg-gray-100 p-2 rounded">
                                                        {member.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {open && (
                <Modal setOpen={setOpen}>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Add Team</h2>
                        <input 
                            type="text" 
                            placeholder="Team Name" 
                            className="mb-2 p-2 border rounded" 
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <button 
                            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
                            onClick={handleAddTeam}
                        >
                            Add Team
                        </button>
                    </div>
                </Modal>
            )}

            {memberModalOpen && (
                <Modal setOpen={setMemberModalOpen}>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Add Member to Team</h2>
                        {getAvailableMembers().length === 0 ? (
                            <div>
                                <p className="text-gray-500 mb-4">No available members to add to this team.</p>
                                <p className="text-sm text-gray-400">All members are already in this team or no members exist.</p>
                            </div>
                        ) : (
                            <>
                                <select 
                                    className="mb-2 p-2 border rounded" 
                                    value={selectedMemberId}
                                    onChange={(e) => setSelectedMemberId(e.target.value)}
                                >
                                    <option value="">Select a member</option>
                                    {getAvailableMembers().map((member: any) => (
                                        <option key={member.id} value={member.id}>
                                            {member.name} - {member.position}
                                        </option>
                                    ))}
                                </select>
                                <button 
                                    className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
                                    onClick={handleAddMemberToTeam}
                                >
                                    Add Member
                                </button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Teams;