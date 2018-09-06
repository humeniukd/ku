import React from 'react';
import ReactDOM from "react-dom";
import { shallow } from 'enzyme';
import Home from './Home';
import {ERRORS} from "../config";

jest.mock('../api');

describe('Home:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home isAuthenticated={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('shows modal on error', () => {
    const home = shallow(<Home isAuthenticated={true} />);
    Promise.resolve().then(() => expect(home.contains(ERRORS.notFound)))
  });
});
