import { ApolloProvider } from '@apollo/client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../login';

describe('<Login />', () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <ApolloProvider client={mockedClient}>
            <Router>
              <Login />
            </Router>
          </ApolloProvider>
        </HelmetProvider>,
      );
    });
  });
  it('should render OK', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | Nuber Eats');
    });
  });
  it('displays email validataion errors', async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i); // "Email" 과 같은 것
    await waitFor(() => {
      userEvent.type(email, 'this@wont'); // get으로 가져온 곳에 email을 typing 하는 것
    });
    debug();
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);

    await waitFor(() => {
      userEvent.clear(email); // delete everything like input form
    });
    debug();
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Email is required/i);
  });
});
