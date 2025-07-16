import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teams : [
        {
            id : 1,
            name: 'team alpha',
            members: [
                { id: 1, name: 'yuvraj yadav' },
            ]
        }
    ],
}

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
   addTeam: (state, action) => {
        state.teams.push(action.payload);
    },
    removeTeam: (state, action) => {
        state.teams = state.teams.filter(team => team.id !== action.payload.id);
    },
    addMemberToTeam: (state, action) => {
        const { teamId, member } = action.payload;
        const team = state.teams.find(team => team.id === teamId);
        if (team) {
            team.members.push(member);
        }
    }
}
});


export const { addTeam, removeTeam, addMemberToTeam } = teamSlice.actions;
export default teamSlice.reducer;