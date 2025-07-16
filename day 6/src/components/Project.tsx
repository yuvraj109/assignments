import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProject, removeProject, addTeamToProject } from "../features/ProjectSlice";

const Project = () => {
    const [open, setOpen] = useState<Boolean>(false);
    const [teamModalOpen, setTeamModalOpen] = useState<Boolean>(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [projectName, setProjectName] = useState<string>('');
    const [selectedTeamId, setSelectedTeamId] = useState<string>('');
    
    const projects = useSelector((state: any) => state.project.projects);
    const teams = useSelector((state: any) => state.team.teams);
    const dispatch = useDispatch();

    const handleAddTeam = (projectId: number) => {
        setSelectedProjectId(projectId);
        setTeamModalOpen(true);
    };

    const getAvailableTeams = () => {
        if (!selectedProjectId) return teams;
        
        const selectedProject = projects.find((project: any) => project.id === selectedProjectId);
        if (!selectedProject) return teams;
        
        return teams.filter((team: any) => 
            !selectedProject.teams.some((projectTeam: any) => projectTeam.id === team.id)
        );
    };

    const handleAddProject = () => {
        if (projectName.trim()) {
            dispatch(addProject({ 
                id: Date.now(), 
                name: projectName,
                teams: []
            }));
            setProjectName('');
            setOpen(false);
        }
    };

    const handleAddTeamToProject = () => {
        const teamId = parseInt(selectedTeamId);
        
        if (teamId && selectedProjectId) {
            const selectedTeam = teams.find((team: any) => team.id === teamId);
            if (selectedTeam) {
                dispatch(addTeamToProject({ 
                    projectId: selectedProjectId,
                    team: {
                        id: selectedTeam.id,
                        name: selectedTeam.name
                    }
                }));
                setTeamModalOpen(false);
                setSelectedProjectId(null);
                setSelectedTeamId('');
            }
        }
    };

    return (
        <div>
            <div className="m-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setOpen(true)}>Add Project</button>
            </div>
            
            <div className="m-4">
                <div className="bg-white rounded shadow">
                    {projects.length === 0 ? (
                        <p className="p-4 text-gray-500 text-center">No projects found. Create your first project!</p>
                    ) : (
                        <div className="space-y-4 p-4">
                            {projects.map((project: any) => (
                                <div key={project.id} className="border rounded p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xl font-semibold">{project.name}</h3>
                                        <div className=" flex flex-col gap-1">
                                            <button 
                                                className="bg-green-800 text-white px-3 py-1 rounded "
                                                onClick={() => handleAddTeam(project.id)}
                                            >
                                                Add Team
                                            </button>
                                            <button 
                                                className="bg-red-800 text-white px-3 py-1 rounded " 
                                                onClick={() => dispatch(removeProject({ id: project.id }))}
                                            >
                                                Remove Project
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium mb-2">Teams ({project.teams.length}):</h4>
                                        {project.teams.length === 0 ? (
                                            <p className="text-gray-500 text-sm">No teams assigned to this project</p>
                                        ) : (
                                            <ul className="space-y-1">
                                                {project.teams.map((team: any) => (
                                                    <li key={team.id} className="bg-gray-100 p-2 rounded">
                                                        {team.name}
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
                        <h2 className="text-xl font-bold mb-4">Add Project</h2>
                        <input 
                            type="text" 
                            placeholder="Project Name" 
                            className="mb-2 p-2 border rounded" 
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <button 
                            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
                            onClick={handleAddProject}
                        >
                            Add Project
                        </button>
                    </div>
                </Modal>
            )}

            {teamModalOpen && (
                <Modal setOpen={setTeamModalOpen}>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Add Team to Project</h2>
                        {getAvailableTeams().length === 0 ? (
                            <div>
                                <p className="text-gray-500 mb-4">No available teams to add to this project.</p>
                                <p className="text-sm text-gray-400">All teams are already assigned to this project or no teams exist.</p>
                            </div>
                        ) : (
                            <>
                                <select 
                                    className="mb-2 p-2 border rounded" 
                                    value={selectedTeamId}
                                    onChange={(e) => setSelectedTeamId(e.target.value)}
                                >
                                    <option value="">Select a team</option>
                                    {getAvailableTeams().map((team: any) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name} ({team.members.length} members)
                                        </option>
                                    ))}
                                </select>
                                <button 
                                    className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
                                    onClick={handleAddTeamToProject}
                                >
                                    Add Team
                                </button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Project;