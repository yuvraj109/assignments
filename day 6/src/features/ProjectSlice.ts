import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects : [
        {
            id : 1,
            name: 'warehouse management system',
            teams: [
                { id: 1, name: 'team alpha' },
            ]
        }
    ],
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action)=>{
        state.projects.push(action.payload);
    },
    removeProject: (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload.id);
    },
    updateTeams: (state, action)=> {
        const project = state.projects.find(project => project.id === action.payload.id);
        if (project) {
            project.teams = action.payload.teams;
        }
        return state;
    },
    addTeamToProject: (state, action) => {
        const { projectId, team } = action.payload;
        const project = state.projects.find(project => project.id === projectId);
        if (project) {
            project.teams.push(team);
        }
    }

  }
});


export const {addProject, removeProject, updateTeams, addTeamToProject} = projectSlice.actions;
export default projectSlice.reducer;