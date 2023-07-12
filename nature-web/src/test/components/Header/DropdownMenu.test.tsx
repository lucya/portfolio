import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '../../../app/store';
import DropdownMenu from "../../../components/Header/DropdownMenu";


describe('DropdownMenu', () => {
  test('renders DropdownMenu component', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <DropdownMenu />
        </HashRouter>
      </Provider>
    );
    const menuElement = screen.getByText(/인기영화/i);
    expect(menuElement).toBeInTheDocument();
  });

  test('renders DropdownMenu link', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <DropdownMenu />
        </HashRouter>
      </Provider>
    );

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'menu')

  });
})