import { request } from "./generic.service.js";

export const getNotes = () => request({ url: `notes`, method: 'get' });
export const getNote = (id) => request({ url: `notes/${id}`, method: 'get' });
export const createNote = (data) => request({ url: `notes`, method: 'post', data });    
export const editNote = (id, data) => request({ url: `notes/${id}`, method: 'put', data });
export const deleteNote = (id) => request({ url: `notes/${id}`, method: 'delete' });