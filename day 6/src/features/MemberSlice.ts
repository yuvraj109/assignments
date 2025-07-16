import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    members : [
        {
            id: 1,
            name: 'yuvraj yadav',
            age: '21',
            position: 'frontend'
        },
    ]
}

const MenberSlice = createSlice({
    name: 'member',
    initialState,
    reducers:{
        addMember : (state, action)=> {
            state.members.push(action.payload)
        },
        removeMember: (state, action) => {
            state.members = state.members.filter(member => member.id !== action.payload.id);
        }
    }

})

export const { addMember, removeMember } = MenberSlice.actions;
export default MenberSlice.reducer;