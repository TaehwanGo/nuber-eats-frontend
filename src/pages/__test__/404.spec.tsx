import { render, waitFor } from '../../test-utils';
import React from 'react';
import { NotFound } from '../404';

describe('<NotFound />', () => {
  it('renders OK', async () => {
    render(<NotFound />);
    await waitFor(() => {
      // Helmet이 바꾸는 것을 기다리기 위해
      expect(document.title).toBe('Not found | Nuber Eats');
    });
  });
});
