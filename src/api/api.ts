/*eslint-disable no-console*/
import {IApplication} from '@/types/applicationInterfaces';

const BACKEND_PATH = 'http://localhost:5000/applications';

export const getApplications = async () => {
    return await fetch(BACKEND_PATH)
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
};

export const getCurrentApplication = async (id: number) => {
    const endpoint = `${BACKEND_PATH}/${id}`;
    return await fetch(endpoint)
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
};

export const createApplication = async (
    data: Omit<IApplication, 'more' | 'id' | 'receivingDate' | 'status'>,
) => {
    return await fetch(BACKEND_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
};

export const updateServerApplication = async (
    id: number,
    data: Omit<IApplication, 'more' | 'id' | 'receivingDate'>,
) => {
    const endpoint = `${BACKEND_PATH}/${id}`;
    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
};

export const deleteApplication = async (id: number) => {
    const endpoint = `${BACKEND_PATH}/${id}`;
    return await fetch(endpoint, {
        method: 'DELETE',
    })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
};
