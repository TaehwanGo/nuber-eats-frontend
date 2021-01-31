import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { isLoggedInVar } from '../../apollo';
import { App } from '../app';

jest.mock('../../routers/logged-out-router', () => {
  return {
    LoggedOutRouter: () => <span>logged out</span>,
  };
});
jest.mock('../../routers/logged-in-router', () => {
  return {
    LoggedInRouter: () => <span>logged in</span>,
  };
});
describe('<App />', () => {
  it('renders LoggedOutRouter', () => {
    const { debug, getByText } = render(<App />);
    // debug();
    getByText('logged out'); // 같은 string이 있는지 찾아줌, 못찾으면 fail
  });

  it('renders LoggedInRouter', async () => {
    const { debug, getByText } = render(<App />);
    await waitFor(() => {
      // state가 바뀌는 것을 기다림
      isLoggedInVar(true);
    });
    // debug();
    getByText('logged in'); // 같은 string이 있는지 찾아줌, 못찾으면 fail
  });
});
