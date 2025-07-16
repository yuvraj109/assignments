import { configureStore } from "@reduxjs/toolkit";
import projectReducer from '../features/ProjectSlice';
import teamReducer from '../features/TeamSlice';
import memberReducer from '../features/MemberSlice';

const store = configureStore({
    reducer: {
        project: projectReducer,
        team: teamReducer,
        member: memberReducer
    }
})

export default store;