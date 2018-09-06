import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';

describe('Login:', () => {
  let spy;
  beforeEach(()=> {
    spy = jest.fn();
    global.sessionStorage = {setItem: jest.fn()}
  });
  it('invalid credentials', () => {
      const login = shallow(<Login userHasAuthenticated={spy} />);
      const instance = login.instance();
    expect(instance.validateForm()).toBe(false)
      instance.handleChange({target:{id: 'login', value: 'foo'}})
      instance.handleChange({target:{id: 'password', value: 'bar'}})
      expect(instance.validateForm()).toBe(true)
      expect(spy).not.toHaveBeenCalled()
  });
  it('valid credentials', () => {
    const login = shallow(<Login userHasAuthenticated={spy} />);
    const instance = login.instance();
    instance.handleChange({target:{id: 'login', value: 'foobar'}})
    instance.handleChange({target:{id: 'password', value: 'Foobar01'}})
    instance.handleSubmit({preventDefault: jest.fn()})
    expect(spy).toHaveBeenCalled()
  });
});
