import React from 'react';
import Modal from './Modal';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  it('clicks it', () => {
    const spy = jest.fn();
    const search = shallow(<Modal onClose={spy} />);
    const button = search.find('button');
    button.simulate('click');
    expect(spy).toHaveBeenCalled()
  })
});
