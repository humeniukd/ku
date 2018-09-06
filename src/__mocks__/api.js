import {ERRORS} from "../config";

export const getPostDetails = id => Promise.reject(new Error(ERRORS.notFound));
export const getPosts = () => Promise.reject(new Error(ERRORS.notFound));