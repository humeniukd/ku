import { API_URL, ERRORS } from './config';


export const handleResponse = (res) => {
  if(!res.ok) {
    switch (res.status) {
      case 400:
        throw new Error(ERRORS.badRequest);
      case 404:
        throw new Error(ERRORS.notFound);
      case 500:
        throw new Error(res.statusText || ERRORS.serverError);
      default:
        throw new Error(res.statusText || ERRORS.general);
    }
  }
  return res.json();
};

export const getPosts = () => {
  return fetch(API_URL).then(handleResponse); //?_sort=id&_order=desc&q=[query]&_limit=[size]&_start=[offset]
}
export const getPostDetails = (id) => {
  return fetch(`${API_URL}/${id}`).then(handleResponse);
}