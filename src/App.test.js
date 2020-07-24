import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    flyTo: jest.fn(),
  })),
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
