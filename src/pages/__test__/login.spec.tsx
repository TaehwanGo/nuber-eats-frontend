import { ApolloProvider } from '@apollo/client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login, LOGIN_MUTATION } from '../login';

describe('<Login />', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
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
    // debug();
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);

    await waitFor(() => {
      userEvent.clear(email); // delete everything like input form
    });
    // debug();
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Email is required/i);
  });
  it('display password required errors', async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i); // "Email" 과 같은 것
    const submitBtn = getByRole('button');
    await waitFor(() => {
      userEvent.type(email, 'this@won.com'); // get으로 가져온 곳에 email을 typing 하는 것
      userEvent.click(submitBtn);
    });
    // console.log(submitBtn); // button element는 implicit(암시적으로) role이 button으로 되어 있음
    // debug();
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });
  it('submits form and calls mutation', async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');
    const formData = {
      email: 'work@test.com',
      password: '1234',
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'xxx',
          error: 'mutation-error', // just for cover test 122line
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, 'setItem');
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    // debug();
    // console.log(submitBtn);
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith('nuber-token', 'xxx');
  });
});
