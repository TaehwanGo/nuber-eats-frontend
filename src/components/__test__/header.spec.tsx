import { getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Header } from '../header';
import { MockedProvider } from '@apollo/client/testing'; // for gql query things
import { BrowserRouter as Router } from 'react-router-dom'; // for Link
import { ME_QUERY } from '../../hooks/useMe';

describe('<Header />', () => {
  it('renders verify banner', async () => {
    await waitFor(async () => {
      // state 바뀌는 것을 기다릴 때 waitFor를 사용
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(queryByText('Please verify your email')).toBeNull(); // getByText() 같은 것을 사용하면 없으면 바로 error가 발생하므로 queryBy를 사용할 것
    });
  });
  it('renders without verify banner', async () => {
    await waitFor(async () => {
      // state 바뀌는 것을 기다릴 때 waitFor를 사용
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>,
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      //   getByText("Please verify your email");
    });
  });
});
