import { ApolloProvider } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from '../create-account';
import { render, waitFor, RenderResult } from '../../test-utils';
import { UserRole } from '../../__generated__/globalTypes';

// how to mock hooks
const mockPush = jest.fn();
jest.mock('react-router-dom', () => {
  // jest가 module을 전부 cover하면서 beforeEach에서 쓰고 있는 Router까지 고장남
  const realModule = jest.requireActual('react-router-dom'); // 실제 모듈을 필요로 함
  return {
    ...realModule, // 실제 모듈 기능 + mock이 필요한 부분만 mock
    useHistory: () => {
      return { push: mockPush };
    },
  };
});

describe('<CreateAccount />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>,
      );
    });
  });
  it('renders OK', async () => {
    await waitFor(() =>
      expect(document.title).toBe('CreateAccount | Nuber Eats'),
    );
  });
  it('renders validation errors', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const button = getByRole('button');
    await waitFor(() => {
      // 여기에선 state가 바뀌는 것을 기다리기 위해 사용
      userEvent.type(email, 'wont@work');
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Email is required/i);
    await waitFor(() => {
      userEvent.type(email, 'working@email.com');
      userEvent.click(button);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });
  it('submits mutation with form values', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');
    const formData = {
      email: 'working@email.com',
      password: '1234',
      role: UserRole.Client,
    };
    const mockedCreatedAccountMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: 'mutation-error',
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreatedAccountMutationResponse,
    );
    jest.spyOn(window, 'alert').mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    expect(mockedCreatedAccountMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedCreatedAccountMutationResponse).toHaveBeenCalledWith({
      createAccount: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith('Account Created! Log in now!');
    const mutationError = getByRole('alert');
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mutationError).toHaveTextContent('mutation-error');
  });
  afterAll(() => {
    jest.clearAllMocks(); // test 후 모든 것을 제자리로 돌려 놓음(hooks mock 이후)
  });
});
