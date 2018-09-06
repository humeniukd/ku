import { routine } from './helpers'

const posts = [];

for (let i = 0; i < 10; i++)
  posts.push({title: `${i}`, body: `${i}`})


describe('Helpers:', () => {
  let cb;
  beforeEach(()=> {
    cb = routine(posts);
  });
  it('filtering routine', () => {
    const state = cb({q: '11', limit: 100});
    expect(state.limit).toBe(101);
    expect(state.posts.length).toBe(0);
  });
  it('filtering routine', () => {
    const state = cb({q: '1', limit: 3});
    expect(state.limit).toBe(4);
    expect(state.posts.length).toBe(1);
    expect(state.posts[0].title).toBeDefined();
    expect(state.posts[0].body).toBe('1');
  });
});