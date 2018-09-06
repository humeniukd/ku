import { ALPHABET } from "./config";

export const routine = data => ({q, limit}) => ({
  posts: data.slice(0, limit).filter(({title = '', body = ''}) => {
      return title.toLowerCase().indexOf(q) > -1 || body.toLowerCase().indexOf(q) > -1
    }),
  limit: limit + 1
});

export const randomName = (size = Math.ceil(Math.random()*8)) => {
  let out = '';

  for (let i = 0; i < size; i++)
    out += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));

  return out.charAt(0).toUpperCase() + out.slice(1);
};

export const querystring = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) return null;

  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};