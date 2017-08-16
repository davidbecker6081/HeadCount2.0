import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import { mount, shallow } from 'enzyme'

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

})
