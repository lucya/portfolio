import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import User from './containers/User/User';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './app/store';

describe('App', () => {
  test('renders user component', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <User />
        </HashRouter>
      </Provider>);
    const userElement = screen.getByText(/Email/i);
    expect(userElement).toBeInTheDocument();
  });
})