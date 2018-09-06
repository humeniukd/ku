import { handleResponse } from './api'

describe('Api:', () => {
  let json;
  beforeEach(()=> {
    json = jest.fn();
  });
  it('handleResponse 404', () => {
    expect(() => handleResponse({ok: false})).toThrow();
  });
  it('handleResponse 200', () => {
    handleResponse({ok: true, json});
    expect(json).toHaveBeenCalled();
  });
});