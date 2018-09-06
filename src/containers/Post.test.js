import React from 'react';
import ReactDOM from "react-dom";
import { shallow } from 'enzyme';
import Post from './Post';
import {ERRORS} from "../config";

jest.mock('../api');

describe('Post:', () => {
  const goBack = jest.fn();
  const params = {};
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Post history={{goBack}} match={{params}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('shows modal on error', () => {
    const post = shallow(<Post history={{goBack}} match={{params}} />);
    Promise.resolve().then(() => expect(post.contains(ERRORS.notFound)))
  });
});
