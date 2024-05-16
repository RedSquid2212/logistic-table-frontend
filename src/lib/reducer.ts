import {combineReducers} from 'redux';
import {applicationsSlice} from '@/lib/slices/applicationsSlice';

export const reducer = combineReducers({
    applicationsSlice: applicationsSlice.reducer,
});
