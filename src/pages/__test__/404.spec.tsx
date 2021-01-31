import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { NotFound } from '../404';

describe('<NotFound />', () => {
  it('renders OK', async () => {
    render(
      <HelmetProvider>
        <Router>
          <NotFound />
        </Router>
      </HelmetProvider>,
    );
    await waitFor(() => {
      // Helmet이 바꾸는 것을 기다리기 위해
      expect(document.title).toBe('Not found | Nuber Eats');
    });
  });
});
