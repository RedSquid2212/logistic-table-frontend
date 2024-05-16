/* eslint-disable no-param-reassign*/
import {IApplication} from '@/types/applicationInterfaces';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/lib/store';

interface ApplicationsState {
    applications: IApplication[];
    allApplications: IApplication[];
    currentApplication?: IApplication;
}

const initialState: ApplicationsState = {
    applications: [],
    allApplications: [],
};

const sliceName = 'applicationsSlice';

export const applicationsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        getActiveApplications: (state) => {
            state.applications = state.applications.filter((item) => item.status !== 'завершено');
        },
        getAllApplications: (state) => {
            state.applications = state.allApplications;
        },
        setCurrentApplication: (state, action) => {
            state.currentApplication = action.payload;
        },
        setApplications: (state, action) => {
            state.applications = action.payload;
            state.allApplications = action.payload;
        },
    },
});

export const {getActiveApplications, getAllApplications, setCurrentApplication, setApplications} =
    applicationsSlice.actions;

export const selectApplications = (state: RootState) => state[sliceName].applications;
export const selectCurrentApplication = (state: RootState) => state[sliceName].currentApplication;
