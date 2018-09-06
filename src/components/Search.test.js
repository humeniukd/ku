import React from 'react';
import SearchForm from './Search';
import { shallow } from 'enzyme';

describe('Search:', () => {
  it('change search value', () => {
    const spy = jest.fn();
    const search = shallow(<SearchForm onSubmit={spy} />);
    const form = search.find('form');
    form.simulate('change', {target: {value: 'foo'}})
    Promise.resolve(() => expect(spy).toHaveBeenCalled());
  })
});
